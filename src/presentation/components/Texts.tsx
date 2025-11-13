import {Typography} from "@mui/material";
import {transitionThemeChange, useShikiTheme} from "../theme/ThemeProvider";
import {pxSizes, textSizes} from "../theme/Sizes";

/**
 * Разделитель текста Точка
 */
export const DotTextDivider = () => {

    const {theme} = useShikiTheme()

    return (
        <div style={{
            paddingLeft: pxSizes.value5px,
            paddingRight: pxSizes.value5px
        }}>
            <Typography sx={{
                display: '-webkit-box',
                textOverflow: "ellipsis",
                overflow: 'hidden',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 1,
                color: theme.onBackground,
                textAlign: 'center',
                fontWeight: "700",
                fontSize: textSizes.defaultForApp
            }}>
                ·
            </Typography>
        </div>
    )
}

/**
 * Стандартный Текст для всего приложения
 *
 * @param text текст для показа
 * @param fontSize размер текста
 * @param maxLines максимальное количество строк текста
 * @param color цвет текста
 * @param textAlign выравнивание текста
 */
export const MyText = (
    {
        text,
        fontSize = textSizes.defaultForApp,
        maxLines = 1,
        color = null,
        textAlign = null
    }:
        {
            text: string | null | undefined,
            fontSize?: string | number | null,
            maxLines?: string | number | null,
            color?: string | null,
            textAlign?: string | null
        }
) => {

    const {theme} = useShikiTheme()

    return (
        <Typography sx={{
            display: '-webkit-box',
            textOverflow: "ellipsis",
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: maxLines ?? 1,
            color: color ?? theme.onPrimary,
            textAlign: textAlign ?? 'center',
            fontSize: fontSize ?? textSizes.defaultForApp,
            transition: transitionThemeChange
        }}>
            {text ?? ''}
        </Typography>
    )
}

/**
 * Текст с цветом onBackground для контраста на фоне основного текста
 *
 * @param text текст для показа
 * @param fontSize размер текста
 * @param maxLines максимальное количество строк текста
 * @param textAlign выравнивание текста
 */
export const MyTextOnBackground = (
    {
        text,
        fontSize = textSizes.defaultForApp,
        maxLines = 1,
        textAlign = null
    }:
        {
            text: string | null | undefined,
            fontSize?: string | number | null,
            maxLines?: string | number | null,
            textAlign?: string | null
        }
) => {

    const {theme} = useShikiTheme()

    return (
        <Typography sx={{
            display: '-webkit-box',
            textOverflow: "ellipsis",
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: maxLines ?? 1,
            color: theme.onBackground,
            textAlign: textAlign ?? 'center',
            fontSize: fontSize ?? textSizes.defaultForApp
        }}>
            {text ?? ''}
        </Typography>
    )
}

/**
 * Полужирный Текст
 *
 * @param text текст для показа
 * @param fontSize размер текста
 * @param maxLines максимальное количество строк текста
 * @param color цвет текста
 * @param textAlign выравнивание текста
 */
export const MyTextSemiBold = (
    {
        text,
        fontSize = textSizes.defaultForApp,
        maxLines = 1,
        color = null,
        textAlign = null
    }:
        {
            text: string | null | undefined,
            fontSize?: string | number | null,
            maxLines?: string | number | null,
            color?: string | null,
            textAlign?: string | null
        }
) => {

    const {theme} = useShikiTheme()

    return (
        <Typography sx={{
            display: '-webkit-box',
            textOverflow: "ellipsis",
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: maxLines ?? 1,
            color: color ?? theme.onPrimary,
            textAlign: textAlign ?? 'center',
            fontSize: fontSize ?? textSizes.defaultForApp,
            fontWeight: "500",
            transition: transitionThemeChange
        }}>
            {text ?? ''}
        </Typography>
    )
}

/**
 * Полужирный Текст
 *
 * @param text текст для показа
 * @param fontSize размер текста
 * @param maxLines максимальное количество строк текста
 * @param color цвет текста
 * @param textAlign выравнивание текста
 */
export const MyTextBold = (
    {
        text,
        fontSize = textSizes.defaultForApp,
        maxLines = 1,
        color = null,
        textAlign = null
    }:
        {
            text: string | null | undefined,
            fontSize?: string | number | null,
            maxLines?: string | number | null,
            color?: string | null,
            textAlign?: string | null
        }
) => {

    const {theme} = useShikiTheme()

    return (
        <Typography sx={{
            display: '-webkit-box',
            textOverflow: "ellipsis",
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: maxLines ?? 1,
            color: color ?? theme.onPrimary,
            textAlign: textAlign ?? 'center',
            fontSize: fontSize ?? textSizes.defaultForApp,
            fontWeight: 'bold',
            transition: transitionThemeChange
        }}>
            {text ?? ''}
        </Typography>
    )
}