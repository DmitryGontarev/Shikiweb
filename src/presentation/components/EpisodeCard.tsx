import {PaddingAll, PaddingBySide} from "./PaddingAll";
import React, {useState} from "react";
import {useShikiTheme} from "../theme/ThemeProvider";
import {pxSizes} from "../theme/Sizes";
import {MyText, MyTextSemiBold} from "./Texts";
import {GenreCard} from "./GenreCard";
import {hexToRgbWithAlpha} from "../../utils/CommonUtils";
import {SpacerSized} from "./SpacerSized";
import {BASE_SCALE_FOR_CARD, HOVER_SCALE_FOR_CARD} from "./ElementCard";

/**
 * Карточка для экрана Эпизоды
 *
 * @param padding
 * @param height
 * @param width
 * @param author
 * @param hosting
 * @param quality
 */
export const EpisodeCard = React.memo(({
    padding,
    height = 170,
    width = 400,
    author,
    hosting,
    quality,
    onClick
}: {
    padding?: number
    height?: number | string,
    width?: number | string,
    author: string | null,
    hosting: string | null,
    quality: string | null,
    onClick?: () => void
    }) => {

    const {theme} = useShikiTheme()

    const [scale, setScale] = useState(BASE_SCALE_FOR_CARD)

        return (
            <PaddingAll all={padding}>
                <div style={{
                    display: "flow",
                    height: height,
                    width: width,
                    border: `1px solid ${theme.onBackground}`,
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderRadius: pxSizes.value7px,
                    backgroundColor: hexToRgbWithAlpha({hex: theme.surface, alpha: 0.8}),
                    scale: scale
                }} onClick={onClick}
                     onMouseOver={() => {
                         setScale(HOVER_SCALE_FOR_CARD)
                     }}
                     onMouseLeave={() => {
                         setScale(BASE_SCALE_FOR_CARD)
                     }}>
                    <div style={{
                        display: "flex",
                        height: "50%",
                        width: "auto",
                        justifyContent: "space-between",
                        alignItems: "start",
                    }}>

                        <PaddingAll all={pxSizes.value14px}>
                            <MyTextSemiBold text={author}/>
                        </PaddingAll>

                        <PaddingAll all={pxSizes.value14px}>
                            <SpacerSized/>
                        </PaddingAll>

                    </div>

                    <div style={{
                        display: "flex",
                        height: "50%",
                        width: "100%",
                        justifyContent: "space-between",
                        alignItems: "end"
                    }}>
                        <PaddingBySide left={pxSizes.value7px} bottom={pxSizes.value7px}>
                            <GenreCard text={hosting}/>
                        </PaddingBySide>

                        <PaddingAll all={pxSizes.value14px}>
                            <MyText text={quality}/>
                        </PaddingAll>

                    </div>

                </div>
            </PaddingAll>
        )
    }
)