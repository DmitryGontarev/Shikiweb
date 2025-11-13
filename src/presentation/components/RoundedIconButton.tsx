import React, {useState} from "react";
import {BASE_SCALE_FOR_CARD, HOVER_SCALE_FOR_CARD} from "./ElementCard";
import {pxSizes} from "../theme/Sizes";
import {transitionThemeChange, useShikiTheme} from "../theme/ThemeProvider";
import {BackgroundUnselectedColor} from "../theme/Colors";

/**
 * Круглая кнопка
 *
 * @param size размер кнопки
 * @param image ссылка на изображение внутри кнопки
 * @param color цвет иконки
 * @param backgroundColor цвет заднего фона кнопки
 * @param borderColor цвет линии вокруг кнопки
 * @param padding
 * @param paddingLeft
 * @param paddingTop
 * @param paddingRight
 * @param paddingBottom
 * @param onFocus
 * @param onClick действие при нажатии на кнопку
 */
export const RoundedIconButton = React.memo(
    ({
         size = 42,
         image,
         color = null,
         backgroundColor = null,
         borderColor = BackgroundUnselectedColor,
         hoverColor,
         padding,
         paddingLeft,
         paddingTop,
         paddingRight,
         paddingBottom,
         onFocus = () => {},
         onClick
     }: {
        size?: number,
        image: string,
        color?: string | null,
        backgroundColor?: string | null,
        borderColor?: string | null,
        hoverColor?: string | null,
        padding?: number | null,
        paddingLeft?: number | null,
        paddingTop?: number | null,
        paddingRight?: number | null,
        paddingBottom?: number | null,
        onFocus?: (focus: boolean) => void,
        onClick: (() => void) | undefined
    }) => {

        const {theme} = useShikiTheme()

        const [hover, setHover] = useState(false)

        const [scale, setScale] = useState(BASE_SCALE_FOR_CARD)

        const  outSize = size + 8

        return (
            <div style={{
                padding: padding ?? 0,
                paddingLeft: paddingLeft ?? 0,
                paddingTop: paddingTop ?? 0,
                paddingRight: paddingRight ?? 0,
                paddingBottom: paddingBottom ?? 0
            }}
                 onMouseOver={() => {
                     onFocus(true)
                 }}
                 onMouseLeave={() => {
                     onFocus(false)
                 }}>
                <div style={{
                    position: "relative",
                    height: outSize,
                    width: outSize,
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                    <div style={{
                        display: "flex",
                        backgroundColor: hover ? (hoverColor ?? theme.brightHover) : (backgroundColor ?? "transparent"),
                        width: "100%",
                        maxWidth: size,
                        height: "100%",
                        maxHeight: size,
                        border: `1px solid ${borderColor}`,
                        borderRadius: pxSizes.value50px,
                        alignItems: "center",
                        justifyContent: "center",
                        scale: scale
                    }}
                         onMouseOver={() => {
                             setScale(HOVER_SCALE_FOR_CARD)
                             setHover(true)
                         }}
                         onMouseLeave={() => {
                             setScale(BASE_SCALE_FOR_CARD)
                             setHover(false)
                         }}
                         onClick={onClick}>

                        <img src={image} alt={''} style={{
                            height: "50%",
                            width: "50%",
                            objectFit: "cover",
                            alignSelf: "center",
                            filter: color == null ? theme.secondaryPng : color,
                            transition: transitionThemeChange
                        }}/>
                    </div>
                </div>
            </div>
        )
    }
)