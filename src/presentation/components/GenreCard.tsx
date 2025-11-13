import React, {useState} from "react";
import {PaddingAll, PaddingBySide} from "./PaddingAll";
import {pxSizes} from "../theme/Sizes";
import {useShikiTheme} from "../theme/ThemeProvider";
import {MyTextSemiBold} from "./Texts";
import {BASE_SCALE_FOR_CARD, HOVER_SCALE_FOR_CARD} from "./ElementCard";

/**
 * Карточка с названием жанра
 */
export const GenreCard = React.memo(({
    padding,
    isHover = false,
    cardHeight = 35,
    text,
    color,
    backgroundColor,
    borderColor,
    onClick
}: {
    padding?: number | string,
    isHover?: boolean,
    cardHeight?: number | string,
    cardWidth?: number | string,
    text: string | null,
    color?: string | null,
    backgroundColor?: string | null,
    borderColor?: string | null,
    onClick?: () => void
    }) => {
        const {theme} = useShikiTheme()

        const [hover, setHover] = useState(false)

        const borderHoverColor = isHover ? (hover ? theme.onPrimary : (borderColor ?? theme.secondary)) : borderColor ?? theme.secondary

        return (
            <PaddingAll all={padding}>
                <div style={{
                    display: "flex",
                    height: cardHeight,
                    width: "auto",
                    border: `1px solid ${borderHoverColor}`,
                    borderRadius: pxSizes.value30px,
                    // justifyContent: "center",
                    // alignItems: "center",
                    backgroundColor: backgroundColor ?? 'transparent',
                    scale: isHover ? (hover ? HOVER_SCALE_FOR_CARD : BASE_SCALE_FOR_CARD) : BASE_SCALE_FOR_CARD
                }} onClick={onClick}
                onMouseOver={() => {setHover(true)}}
                onMouseLeave={() => {setHover(false)}}>
                    <PaddingBySide
                        left={pxSizes.value10px}
                        top={pxSizes.value5px}
                        right={pxSizes.value10px}
                        bottom={pxSizes.value5px}>
                        <MyTextSemiBold text={text} color={color ?? theme.secondary}/>
                    </PaddingBySide>
                </div>
            </PaddingAll>
        )
    }
)