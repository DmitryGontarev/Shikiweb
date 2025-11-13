import {useShikiTheme} from "../theme/ThemeProvider";
import React from "react";
import {hexToRgbWithAlpha} from "../../utils/CommonUtils";

/**
 * Стандартный разделитель для блоков экрана
 */
export const MyDivider = () => {
    const {theme} = useShikiTheme()
    return (
        <hr style={{color: hexToRgbWithAlpha({hex: theme.onPrimary, alpha: 0.87})}}/>
    )
}