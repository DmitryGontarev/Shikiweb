import {useEffect, useLayoutEffect, useRef} from "react";

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * Кастомный хук для прокручивания списка курсором
 *
 * @param ref ссылка на компонент
 * @param _temp
 * @param scrollX флаг включения скролла по оси X
 * @param scrollY флаг включения скролла по оси Y
 */
export const useDragScroll = ({ref, _temp, scrollX = true, scrollY = true}: {ref: any, _temp?: any, scrollX?: boolean, scrollY?: boolean}) => {
    let _ref = _temp === void 0 ? {} : _temp,
        _ref$decayRate = _ref.decayRate,
        decayRate = _ref$decayRate === void 0 ? 0.95 : _ref$decayRate,
        _ref$safeDisplacement = _ref.safeDisplacement,
        safeDisplacement = _ref$safeDisplacement === void 0 ? 10 : _ref$safeDisplacement,
        _ref$applyRubberBandE = _ref.applyRubberBandEffect,
        applyRubberBandEffect = _ref$applyRubberBandE === void 0 ? false : _ref$applyRubberBandE,
        _ref$activeMouseButton = _ref.activeMouseButton,
        activeMouseButton = _ref$activeMouseButton === void 0 ? "Left" : _ref$activeMouseButton,
        _ref$isMounted = _ref.isMounted,
        isMounted = _ref$isMounted === void 0 ? true : _ref$isMounted

    let internalState = useRef({
        isMouseDown: false,
        isDraggingX: false,
        isDraggingY: false,
        initialMouseX: 0,
        initialMouseY: 0,
        lastMouseX: 0,
        lastMouseY: 0,
        scrollSpeedX: 0,
        scrollSpeedY: 0,
        lastScrollX: 0,
        lastScrollY: 0
    })

    let isScrollableAlongX = false
    let isScrollableAlongY = false
    let maxHorizontalScroll = 0
    let maxVerticalScroll = 0
    let cursorStyleOfWrapperElement: string
    let cursorStyleOfChildElements: string[]
    let transformStyleOfChildElements: string[]
    let transitionStyleOfChildElements: string[]
    let timing = 1 / 60 * 1000 // 60 кадров в секунду (60FPS/60Гц - период обновления матрицы большинства мониторов)

    useIsomorphicLayoutEffect(function () {
        if (isMounted) {
            isScrollableAlongX = window.getComputedStyle(ref.current).overflowX === "scroll"
            isScrollableAlongY = window.getComputedStyle(ref.current).overflowY === "scroll"
            maxHorizontalScroll = ref.current.scrollWidth - ref.current.clientWidth
            maxVerticalScroll = ref.current.scrollHeight - ref.current.clientHeight
            cursorStyleOfWrapperElement = window.getComputedStyle(ref.current).cursor
            cursorStyleOfChildElements = []
            transformStyleOfChildElements = []
            transitionStyleOfChildElements = []
            ref.current.childNodes.forEach((child: ChildNode) => {
                cursorStyleOfChildElements.push(window.getComputedStyle(<Element>child).cursor)
                transformStyleOfChildElements.push(window.getComputedStyle(<Element>child).transform === "none" ? "" : window.getComputedStyle(<Element>child).transform)
                transitionStyleOfChildElements.push(window.getComputedStyle(<Element>child).transition === "none" ? "" : window.getComputedStyle(<Element>child).transition)
            })
        }
    }, [isMounted])

    const runScroll = function runScroll() {
        let dx = internalState.current.scrollSpeedX * timing
        let dy = internalState.current.scrollSpeedY * timing
        let offsetX = ref.current.scrollLeft + dx
        let offsetY = ref.current.scrollTop + dy
        ref.current.scrollLeft = offsetX // eslint-disable-line no-param-reassign

        ref.current.scrollTop = offsetY // eslint-disable-line no-param-reassign

        internalState.current.lastScrollX = offsetX
        internalState.current.lastScrollY = offsetY
    }

    const rubberBandCallback = function rubberBandCallback(e: { preventDefault?: () => void, clientX: any, clientY: any }) {
        let dx = e.clientX - internalState.current.initialMouseX
        let dy = e.clientY - internalState.current.initialMouseY
        let _ref$current = ref.current,
            clientWidth = _ref$current.clientWidth,
            clientHeight = _ref$current.clientHeight
        let displacementX = 0
        let displacementY = 0

        if (isScrollableAlongX && isScrollableAlongY) {
            displacementX = 0.3 * clientWidth * Math.sign(dx) * Math.log10(1.0 + 0.5 * Math.abs(dx) / clientWidth)
            displacementY = 0.3 * clientHeight * Math.sign(dy) * Math.log10(1.0 + 0.5 * Math.abs(dy) / clientHeight)
        } else if (isScrollableAlongX) {
            displacementX = 0.3 * clientWidth * Math.sign(dx) * Math.log10(1.0 + 0.5 * Math.abs(dx) / clientWidth)
        } else if (isScrollableAlongY) {
            displacementY = 0.3 * clientHeight * Math.sign(dy) * Math.log10(1.0 + 0.5 * Math.abs(dy) / clientHeight)
        }

        ref.current.childNodes.forEach((child: ChildNode) =>  {
            (child as HTMLElement).style.transform = "translate3d(" + displacementX + "px, " + displacementY + "px, 0px)"; // eslint-disable-line no-param-reassign

            (child as HTMLElement).style.transition = "transform 0ms" // eslint-disable-line no-param-reassign
        })
    }

    const recoverChildStyle = function recoverChildStyle() {
        ref.current.childNodes.forEach((child: ChildNode, i: number) => {
            (child as HTMLElement).style.transform = transformStyleOfChildElements[i]; // eslint-disable-line no-param-reassign

            (child as HTMLElement).style.transition = transitionStyleOfChildElements[i] // eslint-disable-line no-param-reassign
        })
    }

    let rubberBandAnimationTimer: string | number | NodeJS.Timeout | undefined
    let keepMovingX: string | number | NodeJS.Timeout | undefined
    let keepMovingY: string | number | NodeJS.Timeout | undefined

    const callbackMomentum = function callbackMomentum() {
        const minimumSpeedToTriggerMomentum = 0.05
        keepMovingX = setInterval(function () {
            const lastScrollSpeedX = internalState.current.scrollSpeedX
            const newScrollSpeedX = lastScrollSpeedX * decayRate
            internalState.current.scrollSpeedX = newScrollSpeedX
            const isAtLeft = ref.current.scrollLeft <= 0
            const isAtRight = ref.current.scrollLeft >= maxHorizontalScroll
            const hasReachedHorizontalEdges = isAtLeft || isAtRight
            runScroll()

            if (Math.abs(newScrollSpeedX) < minimumSpeedToTriggerMomentum || internalState.current.isMouseDown || hasReachedHorizontalEdges) {
                internalState.current.scrollSpeedX = 0
                clearInterval(keepMovingX)
            }
        }, timing)
        keepMovingY = setInterval(function () {
            const lastScrollSpeedY = internalState.current.scrollSpeedY
            const newScrollSpeedY = lastScrollSpeedY * decayRate
            internalState.current.scrollSpeedY = newScrollSpeedY
            const isAtTop = ref.current.scrollTop <= 0
            const isAtBottom = ref.current.scrollTop >= maxVerticalScroll
            const hasReachedVerticalEdges = isAtTop || isAtBottom
            runScroll()

            if (Math.abs(newScrollSpeedY) < minimumSpeedToTriggerMomentum || internalState.current.isMouseDown || hasReachedVerticalEdges) {
                internalState.current.scrollSpeedY = 0
                clearInterval(keepMovingY)
            }
        }, timing)
        internalState.current.isDraggingX = false
        internalState.current.isDraggingY = false

        if (applyRubberBandEffect) {
            const transitionDurationInMilliseconds = 250
            ref.current.childNodes.forEach((child: ChildNode) => {
                (child as HTMLElement).style.transform = "translate3d(0px, 0px, 0px)"; // eslint-disable-line no-param-reassign

                (child as HTMLElement).style.transition = "transform " + transitionDurationInMilliseconds + "ms" // eslint-disable-line no-param-reassign
            })
            rubberBandAnimationTimer = setTimeout(recoverChildStyle, transitionDurationInMilliseconds)
        }
    }

    const preventClick = function preventClick(e: { preventDefault: () => void, stopImmediatePropagation: () => void }) {
        e.preventDefault()
        e.stopImmediatePropagation() // e.stopPropagation()
    }

    const getIsMousePressActive = function getIsMousePressActive(buttonsCode: number) {
        return activeMouseButton === "Left" && buttonsCode === 1 || activeMouseButton === "Middle" && buttonsCode === 4 || activeMouseButton === "Right" && buttonsCode === 2
    }

    const onMouseDown = function onMouseDown(e: { buttons: number, clientX: number, clientY: number }) {
        const isMouseActive = getIsMousePressActive(e.buttons)

        if (!isMouseActive) {
            return
        }

        internalState.current.isMouseDown = true
        internalState.current.lastMouseX = e.clientX
        internalState.current.lastMouseY = e.clientY
        internalState.current.initialMouseX = e.clientX
        internalState.current.initialMouseY = e.clientY
    }

    const onMouseUp = function onMouseUp(e: { clientX: number, clientY: number }) {
        const isDragging = internalState.current.isDraggingX || internalState.current.isDraggingY
        const dx = internalState.current.initialMouseX - e.clientX
        const dy = internalState.current.initialMouseY - e.clientY
        const isMotionIntentional = Math.abs(dx) > safeDisplacement || Math.abs(dy) > safeDisplacement
        const isDraggingConfirmed = isDragging && isMotionIntentional

        if (isDraggingConfirmed) {
            ref.current.childNodes.forEach((child: ChildNode) => {
                child.addEventListener("click", preventClick)
            })
        } else {
            ref.current.childNodes.forEach((child: ChildNode) => {
                child.removeEventListener("click", preventClick)
            })
        }

        internalState.current.isMouseDown = false
        internalState.current.lastMouseX = 0
        internalState.current.lastMouseY = 0
        ref.current.style.cursor = cursorStyleOfWrapperElement // eslint-disable-line no-param-reassign

        ref.current.childNodes.forEach((child: ChildNode, i: number) => {
            (child as HTMLElement).style.cursor = cursorStyleOfChildElements[i] // eslint-disable-line no-param-reassign
        })

        if (isDraggingConfirmed) {
            callbackMomentum()
        }
    }

    const onMouseMove = function onMouseMove(e: { preventDefault: () => void, clientX: number, clientY: number }) {
        if (!internalState.current.isMouseDown) {
            return
        }

        e.preventDefault()
        if (scrollX) {
            const dx = internalState.current.lastMouseX - e.clientX
            internalState.current.lastMouseX = e.clientX
            internalState.current.scrollSpeedX = dx / timing
            internalState.current.isDraggingX = true
        }
        if (scrollY) {
            const dy = internalState.current.lastMouseY - e.clientY
            internalState.current.lastMouseY = e.clientY
            internalState.current.scrollSpeedY = dy / timing
            internalState.current.isDraggingY = true
        }
        ref.current.style.cursor = "grabbing" // eslint-disable-line no-param-reassign

        ref.current.childNodes.forEach((child: ChildNode) => {
            (child as HTMLElement).style.cursor = "grabbing" // eslint-disable-line no-param-reassign
        })
        const isAtLeft = ref.current.scrollLeft <= 0 && isScrollableAlongX
        const isAtRight = ref.current.scrollLeft >= maxHorizontalScroll && isScrollableAlongX
        const isAtTop = ref.current.scrollTop <= 0 && isScrollableAlongY
        const isAtBottom = ref.current.scrollTop >= maxVerticalScroll && isScrollableAlongY
        const isAtAnEdge = isAtLeft || isAtRight || isAtTop || isAtBottom

        if (isAtAnEdge && applyRubberBandEffect) {
            rubberBandCallback(e)
        }

        runScroll()
    }

    const handleResize = function handleResize() {
        maxHorizontalScroll = ref.current.scrollWidth - ref.current.clientWidth
        maxVerticalScroll = ref.current.scrollHeight - ref.current.clientHeight
    }

    useEffect(function () {
        if (isMounted) {
            window.addEventListener("mouseup", onMouseUp)
            window.addEventListener("mousemove", onMouseMove)
            window.addEventListener("resize", handleResize)
        }

        return function () {
            window.removeEventListener("mouseup", onMouseUp)
            window.removeEventListener("mousemove", onMouseMove)
            window.removeEventListener("resize", handleResize)
            clearInterval(keepMovingX)
            clearInterval(keepMovingY)
            clearTimeout(rubberBandAnimationTimer)
        }
    }, [isMounted])

    return {
        events: {
            onMouseDown: onMouseDown
        }
    }
}