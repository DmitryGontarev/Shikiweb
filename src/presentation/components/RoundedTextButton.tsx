import React, {useState} from "react";
import {BackgroundUnselectedColor} from "../theme/Colors";
import {useShikiTheme} from "../theme/ThemeProvider";
import {BASE_SCALE_FOR_CARD, HOVER_SCALE_FOR_CARD} from "./ElementCard";
import {pxSizes} from "../theme/Sizes";
import {MyText, MyTextSemiBold} from "./Texts";

/**
 * Круглая кнопка с текстом
 *
 * @param size размер кнопки
 * @param text текст кнопки
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
export const RoundedTextButton = React.memo(
    ({
         size = 42,
         text,
         color = null,
         backgroundColor = null,
         borderColor = BackgroundUnselectedColor,
         padding,
         paddingLeft,
         paddingTop,
         paddingRight,
         paddingBottom,
         onFocus = () => {},
         onClick
     }: {
        size?: number,
        text: string | null,
        color?: string | null,
        backgroundColor?: string | null,
        borderColor?: string | null,
        padding?: number | null,
        paddingLeft?: number | null,
        paddingTop?: number | null,
        paddingRight?: number | null,
        paddingBottom?: number | null,
        onFocus?: (focus: boolean) => void,
        onClick: () => void }
    ) => {

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
                        backgroundColor: hover ? (theme.brightHover) : (backgroundColor ?? "transparent"),
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

                        <MyTextSemiBold text={text} color={color}/>
                    </div>
                </div>
            </div>
        )
    }
)