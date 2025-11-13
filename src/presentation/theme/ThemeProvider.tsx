
import React, {useContext, useLayoutEffect, useState} from "react";
import {darkTheme, lightTheme, ThemeType} from "./Colors";

/** Тип темы для createContext() */
type ShikiThemeContextType = {
    theme: ThemeType,
    isDark: boolean,
    toggle: () => void
}

/** Контекст темы */
export const ShikiThemeContext = React.createContext<ShikiThemeContextType>(
    {
        theme: lightTheme,
        isDark: true,
        toggle: () => void {}
    }
)

/** Хук для получения контекста темы */
export const useShikiTheme = () => {
    return useContext(ShikiThemeContext)
}

// Ключ светлой темы
export const LIGHT_THEME_KEY = "light"

// Ключ тёмной темы
export const DARK_THEME_KEY = "dark"

// Ключ для сохранения состояния темы в локальное хранилище
export const THEME_STORAGE_KEY = "themeStorageKey"

// Константа анимации смены темы
export const transitionThemeChange = 'background-color 500ms linear, margin-left 500ms, width 500ms, transform 500ms'

/**
 * Поставщик ресурсов темы
 */
export const ShikiThemeProvider = ({children}: {children: React.ReactNode}) => {

    // флаг какая тема включена в системе пользователя
    const isSystemDarkTheme: boolean = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches

    // значение темы по умолчанию в соответствии с системной темой
    const defaultTheme: string = isSystemDarkTheme ? DARK_THEME_KEY : LIGHT_THEME_KEY

    // текущая тема
    const [theme, setTheme] = useState(lightTheme)

    // текущая тема
    const [isDark, setIsDark] = useState(false)

    // текущий ключ темы
    const [themeKey, setThemeKey] = useState(localStorage.getItem(THEME_STORAGE_KEY) ?? defaultTheme)

    useLayoutEffect(() => {
        localStorage.setItem(THEME_STORAGE_KEY, themeKey)
        if (themeKey === LIGHT_THEME_KEY) {
            setThemeKey(LIGHT_THEME_KEY)
            setTheme(lightTheme)
            setIsDark(false)
            document.body.style.background = lightTheme.background
            document.body.style.transition = transitionThemeChange
        } else {
            setThemeKey(DARK_THEME_KEY)
            setTheme(darkTheme)
            setIsDark(true)
            document.body.style.background = darkTheme.background
            document.body.style.transition = transitionThemeChange
        }
    }, [themeKey])

    // функция для изменения темы
    function themeToggle() {
        if (themeKey === LIGHT_THEME_KEY) {
            setThemeKey(DARK_THEME_KEY)
            setTheme(darkTheme)
            setIsDark(true)
            document.body.style.background = darkTheme.background
        } else {
            setThemeKey(LIGHT_THEME_KEY)
            setTheme(lightTheme)
            setIsDark(false)
            document.body.style.background = lightTheme.background
        }
    }

    return(
        <ShikiThemeContext.Provider value={{
            theme: theme,
            isDark: isDark,
            toggle: themeToggle
        }}>
            { children }
        </ShikiThemeContext.Provider>
    )
}