/**
 * Цвета светлой темы
 */
export const DefaultColorPrimary = `#FFFFFFFF`
const DefaultColorPrimaryVariant = `#C7C7C7`
const DefaultColorPrimaryBorderVariant = `rgba(199, 199, 199, 0.5)`
const DefaultColorSecondary = `#FF7043`
const DefaultColorSecondaryVariant = `rgba(253, 133, 95, 0.1)`
const DefaultColorSecondaryLightVariant = `#FD855F`
const DefaultColorBackground = `#FFFFFFFF`
const DefaultColorSurface = `#FFFFFFFF`
const DefaultColorOnPrimary = `#000000`
const DefaultColorOnSecondary = `#FFFFFF`
export const DefaultColorOnBackground = `#7B8084`
const DefaultColorOnSurface = `#000000`
const DefaultColorBrightHover = `rgba(255, 255, 255, 0.1)`
const DefaultColorDarkHover = `rgba(122,119,119,0.1)`

const DefaultColorOnPrimaryPng = "invert(0%) sepia(100%) saturate(7459%) hue-rotate(133deg) brightness(87%) contrast(101%)"
export const DefaultColorSecondaryPng = "invert(49%) sepia(80%) saturate(1857%) hue-rotate(335deg) brightness(109%) contrast(101%)"
const DefaultColorOnBackgroundPng = "brightness(0) saturate(100%) invert(50%) sepia(10%) saturate(178%) hue-rotate(164deg) brightness(98%) contrast(88%)"

/**
 * Цвета тёмной темы для AMOLED экранов
 */
const AmoledColorPrimary = `#000000`
const AmoledColorPrimaryVariant = `#FFFFFF`
const AmoledColorPrimaryBorderVariant = 'rgba(255,255,255,0.12)'
const AmoledColorSecondary = `#FF7043`
const AmoledColorSecondaryVariant = `rgba(253, 133, 95, 0.1)`
const AmoledColorSecondaryLightVariant = `#FD855F`
const AmoledColorBackground = `#000000`
const AmoledColorSurface = `#000000`
const AmoledColorOnPrimary = `#FFFFFF`
const AmoledColorOnSecondary = `#000000`
const AmoledColorOnBackground = `rgba(199, 199, 199, 0.5)`
const AmoledColorOnSurface = `#FFFFFF`
const AmoledColorBrightHover = `rgba(255, 255, 255, 0.1)`
const AmoledColorDarkHover = `rgba(122,119,119,0.1)`

const AmoledColorOnPrimaryPng = "invert(100%) sepia(0%) saturate(7444%) hue-rotate(58deg) brightness(114%) contrast(114%)"
const AmoledColorSecondaryPng = "invert(49%) sepia(80%) saturate(1857%) hue-rotate(335deg) brightness(109%) contrast(101%)"
const AmoledColorOnBackgroundPng = "brightness(0) saturate(100%) invert(50%) sepia(10%) saturate(178%) hue-rotate(164deg) brightness(98%) contrast(88%)"

/**
 * Цвет статуса выхода аниме/манги
 */
export const AnonsColor = `#FD855F`
export const OngoingColor = `#0088FF`
export const ReleasedColor = `#00A700`

/**
 * Цвета списков пользовательского рейтинга
 */
export const PlannedColor = `#9357FF`
export const ReWatchingColor = `#FD855F`
export const WatchingColor = `#4FA4FF`
export const CompletedColor = `#00A700`
export const DroppedColor = `#FF4444`
export const OnHoldColor = `#FFE500`
export const BackgroundPlannedColor = `rgba(147, 87, 255, 0.1)`
export const BackgroundReWatchingColor = `rgba(253, 133, 95, 0.1)`
export const BackgroundWatchingColor = `rgba(79, 164, 255, 0.1)`
export const BackgroundCompletedColor = `rgba(0, 167, 0, 0.1)`
export const BackgroundDroppedColor = `rgba(255, 68, 68, 0.1)`
export const BackgroundOnHoldColor = `rgba(255, 229, 0, 0.1)`
export const BackgroundUnselectedColor = `rgba(139, 139, 139, 0.1)`

export const WhiteColorPng = "invert(100%) sepia(0%) saturate(0%) hue-rotate(357deg) brightness(100%) contrast(103%)"

/** Общий тип двух тем для передачи в параметры */
export type ThemeType = {
    primary: string,
    primaryVariant: string,
    primaryBorderVariant: string,
    secondary: string,
    secondaryVariant: string,
    secondaryLightVariant: string,
    background: string,
    surface: string,
    onPrimary: string,
    onSecondary: string,
    onBackground: string,
    onSurface: string,
    brightHover: string,
    darkHover: string,

    onPrimaryPng: string,
    secondaryPng: string,
    onBackgroundPng: string,
}

/**
 * Светлая тема
 */
export const lightTheme: ThemeType = {
    primary: DefaultColorPrimary,
    primaryVariant: DefaultColorPrimaryVariant,
    primaryBorderVariant: DefaultColorPrimaryBorderVariant,
    secondary: DefaultColorSecondary,
    secondaryVariant: DefaultColorSecondaryVariant,
    secondaryLightVariant: DefaultColorSecondaryLightVariant,
    background: DefaultColorBackground,
    surface: DefaultColorSurface,
    onPrimary: DefaultColorOnPrimary,
    onSecondary: DefaultColorOnSecondary,
    onBackground: DefaultColorOnBackground,
    onSurface: DefaultColorOnSurface,
    brightHover: DefaultColorBrightHover,
    darkHover: DefaultColorDarkHover,

    onPrimaryPng: DefaultColorOnPrimaryPng,
    secondaryPng: DefaultColorSecondaryPng,
    onBackgroundPng: DefaultColorOnBackgroundPng
}

/**
 * Тёмная тема
 */
export const darkTheme: ThemeType = {
    primary: AmoledColorPrimary,
    primaryVariant: AmoledColorPrimaryVariant,
    primaryBorderVariant: AmoledColorPrimaryBorderVariant,
    secondary: AmoledColorSecondary,
    secondaryVariant: AmoledColorSecondaryVariant,
    secondaryLightVariant: AmoledColorSecondaryLightVariant,
    background: AmoledColorBackground,
    surface: AmoledColorSurface,
    onPrimary: AmoledColorOnPrimary,
    onSecondary: AmoledColorOnSecondary,
    onBackground: AmoledColorOnBackground,
    onSurface: AmoledColorOnSurface,
    brightHover: AmoledColorBrightHover,
    darkHover: AmoledColorDarkHover,

    onPrimaryPng: AmoledColorOnPrimaryPng,
    secondaryPng: AmoledColorSecondaryPng,
    onBackgroundPng: AmoledColorOnBackgroundPng
}