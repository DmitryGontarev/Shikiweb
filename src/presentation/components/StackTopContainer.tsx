
import React, {useEffect, useRef, useState} from "react";
import {useIsScrollDown} from "./hooks/useIsScrollDown";
import {transitionThemeChange} from "../theme/ThemeProvider";

/**
 * Контейнер для показа двух элементов - первый поверх второго
 *
 * @param isPadding флаг добавления отступа для основной части
 * @param top верхний элемент
 * @param underTop нижний элемент
 */
export const StackTopContainer = React.memo(
    ({isPadding = true, top, underTop}: { isPadding?: boolean, top: React.ReactNode, underTop: React.ReactNode }) => {

        /** высота верхнего элемента для задания отступа нижнему */
        const [topHeight, setTopHeight] = useState(0)

        /** ссылка на верхний элемент */
        const topRef = useRef<HTMLDivElement>(null)

        const [hideTop, setHideTop] = useState(0)

        const isScrollDown = useIsScrollDown()

        useEffect(() => {
            if (topRef?.current != null) {
                setTopHeight(topRef.current.clientHeight)
            }
        }, [])

        useEffect(() => {
            if (isScrollDown) {
                setHideTop(-topHeight)
            } else {
                setHideTop(0)
            }
        }, [isScrollDown])

        return (
            <div>
                <main style={{
                    position: "absolute",
                    top: isPadding ? topHeight : 0
                }}>
                    {underTop}
                </main>

                <div ref={topRef} style={{
                    display: "flex",
                    width: "100%",
                    position: "fixed",
                    justifyContent: "center",
                    alignItems: "center",
                    transform: `translateY(${hideTop}px)`,
                    transition: transitionThemeChange
                }}>
                    {top}
                </div>
            </div>
        )
    }
)