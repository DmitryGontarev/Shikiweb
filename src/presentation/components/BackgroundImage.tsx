import React from "react";
import {appendHost} from "../../utils/StringUtils";
import {useShikiTheme} from "../theme/ThemeProvider";
import {hexToRgbWithAlpha} from "../../utils/CommonUtils";
import {useWindowHeight} from "./hooks/useWindowWidthHeight";

/**
 * Контейнер с картинкой в качестве фона
 *
 * @param imageUrl ссылка на картинку
 * @param children дочерние элементы на переднем плане
 */
export const BackgroundImage = ({imageUrl, children}: {
    imageUrl: string | null | undefined,
    children: React.ReactNode
}) => {

    const {theme} = useShikiTheme()

    const windowHeight = useWindowHeight()

    return (
        <div style={{
            width: "100%",
            height: "100%"
        }}>
            <div style={{
                width: "100%",
                height: windowHeight
            }}>
                <img src={appendHost(imageUrl)} style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                }} alt={''}/>

                <div style={{
                    width: "100%",
                    height: windowHeight,
                    position: "absolute",
                    top: 0,
                    background: hexToRgbWithAlpha({hex: theme.background, alpha: 0.87})
                }}/>
            </div>

            <div style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0
            }}>
                {children}
            </div>

        </div>
    )
}