import React from "react";
import {useShikiNavigator} from "../pages/navigation/useShikiNavigator";
import {RoundedIconButton} from "./RoundedIconButton";
import {hexToRgbWithAlpha} from "../../utils/CommonUtils";
import {useShikiTheme} from "../theme/ThemeProvider";
import {DefaultColorOnBackground} from "../theme/Colors";
import {PaddingAll, PaddingBySide} from "./PaddingAll";
import {pxSizes} from "../theme/Sizes";
import {useWindowWidth} from "./hooks/useWindowWidthHeight";

const iconBack = '/ic_back.png'

/**
 * Верхний бар с кнопкой Назад для всего сайта
 *
 * @param backBtnAlpha
 * @param centerElement
 * @param endElement
 */
export const ToolbarForApp = ({
     backBtnAlpha = 0.2,
     centerElement,
     endElement
}: { backBtnAlpha?: number,
    centerElement?: React.ReactNode | null,
    endElement?: React.ReactNode | null }
) => {

    const {theme} = useShikiTheme()

    const windowWidth = useWindowWidth()

    const {navigatePreviousPage} = useShikiNavigator()

    return (
        <div style={{
            height: 100,
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
        }}>

            <div style={{
                display: "flex",
                alignItems: "center"
            }}>
                <PaddingBySide left={pxSizes.value20px} top={pxSizes.value20px} right={pxSizes.value7px} bottom={pxSizes.value20px}>
                    <RoundedIconButton
                        image={iconBack}
                        backgroundColor={hexToRgbWithAlpha({hex: theme.surface, alpha: backBtnAlpha})}
                        color={theme.onBackgroundPng}
                        borderColor={hexToRgbWithAlpha({hex: DefaultColorOnBackground, alpha: 0.5})}
                        onClick={() => {
                            navigatePreviousPage()
                        }}/>
                </PaddingBySide>

                {centerElement}
            </div>

            <PaddingAll>
                {endElement}
            </PaddingAll>

        </div>
    )
}