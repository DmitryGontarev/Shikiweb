import React, {useEffect, useState} from "react";
import {transitionThemeChange, useShikiTheme} from "../theme/ThemeProvider";

/** стандартная ширина боковой панели навигации */
export const SIDE_BAR_WIDTH = 80

/**
 * Контейнер с боковым баром навигации
 *
 * @param sidebar элементы боковой навигации
 * @param mainContent основная часть экрана
 * @param sideFocus флаг есть ли фокус на боковой панели навигации
 */
export const Sidebar = ({sidebar, mainContent, sideFocus = false}: { sidebar: React.ReactNode, mainContent: React.ReactNode, sideFocus?: boolean }) => {

    const {theme, isDark, toggle} = useShikiTheme()

    const [sideBarWidth, setSideBarWidth] = useState<number>(SIDE_BAR_WIDTH)

    useEffect(() => {
        if (sideFocus) {
            setSideBarWidth(SIDE_BAR_WIDTH * 2)
        } else {
            setSideBarWidth(SIDE_BAR_WIDTH)
        }
    }, [sideFocus])

    return (
        <div style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start"
        }}>

            <main style={{
                width: "100%",
                height: "100%",
                marginLeft: sideBarWidth,
                background: theme.background,
                // transform: `translateX(${sideBarWidth}px)`,
                transition: transitionThemeChange
            }}>
                {mainContent}
            </main>

            <div style={{
                width: sideBarWidth,
                height: "100%",
                position: "fixed",
                flexDirection: 'column',
                justifyContent: "center",
                alignItems: "center",
                background: theme.background,
                transition: transitionThemeChange,
            }}>
                {sidebar}
            </div>

        </div>
    )
}