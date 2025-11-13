import React from "react";
import {transitionThemeChange} from "../theme/ThemeProvider";

/**
 * Контейнер с левым горизонтальным выдвижным меню
 *
 * @param showDrawer флаг бокового меню
 * @param drawerWidth ширина бокового меню
 * @param drawer боковое выдвижное меню
 * @param content основная часть экрана
 */
export const HorizontalDrawer = ({showDrawer, drawerWidth, drawer, content}: {showDrawer: boolean, drawerWidth: number | string, drawer: React.ReactNode, content: React.ReactNode}) => {

    return(
        <div style={{
            display: "flow",
            height: "100%",
            width: "100%",
            justifyContent: "start",
            alignItems: "start"
        }}>
            <div style={{
                display: "flow",
                height: "100%",
                width: drawerWidth
            }}>
                {drawer}
            </div>

            <div style={{
                display: "flow",
                position: "absolute",
                height: "100%",
                width: "100%",
                top: 0,
                // transform: `translateX(${showDrawer ? drawerWidth : 0}px)`,
                marginLeft: showDrawer ? drawerWidth : 0,
                transition: transitionThemeChange
            }}>
                {content}
            </div>

        </div>
    )
}