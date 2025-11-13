import React, {useEffect, useState} from "react";

/**
 * Кастомный хук для получения размеров элемента страницы
 */
export const useContainerSize = ({ref}: {ref: React.RefObject<HTMLDivElement>}) => {

    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })

    useEffect(() => {

        function getContainerSize() {
            return {
                width: ref.current?.offsetWidth ?? 0,
                height: ref.current?.offsetHeight ?? 0
            }
        }

        function handleResize() {
            setContainerSize(getContainerSize())
        }

        if (ref.current) {
            setContainerSize(getContainerSize())
        }

        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [ref.current])

    return containerSize
}