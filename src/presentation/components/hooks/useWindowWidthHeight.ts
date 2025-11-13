import {useEffect, useState} from "react";

/**
 * Кастомный хук для получения ширины, высоты окна браузера
 */
export const useWindowWidthHeight = () => {

    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    })

    useEffect(() => {
        function windowSizeHandler() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }

        window.addEventListener("resize", windowSizeHandler)

        return () => {
            window.removeEventListener("resize", windowSizeHandler)
        }
    }, [])

    return windowSize
}

/**
 * Кастомный хук для получения ширины окна браузера
 */
export const useWindowWidth = () => {

    const [windowWidth, setWindowSize] = useState(window.innerWidth)

    useEffect(() => {
        function windowSizeHandler() {
            setWindowSize(window.innerWidth)
        }

        window.addEventListener("resize", windowSizeHandler)

        return () => {
            window.removeEventListener("resize", windowSizeHandler)
        }
    }, [])

    return windowWidth
}

/**
 * Кастомный хук для получения высоты окна браузера
 */
export const useWindowHeight = () => {

    const [windowHeight, setWindowSize] = useState(window.innerHeight)

    useEffect(() => {
        function windowSizeHandler() {
            setWindowSize(window.innerHeight)
        }

        window.addEventListener("resize", windowSizeHandler)

        return () => {
            window.removeEventListener("resize", windowSizeHandler)
        }
    }, [])

    return windowHeight
}