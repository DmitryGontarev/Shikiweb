import {Sidebar} from "../../components/Sidebar";
import {useShikiTheme} from "../../theme/ThemeProvider";
import {NavLink, Route, Routes, useMatch} from "react-router-dom";
import {RoundedIconButton} from "../../components/RoundedIconButton";
import React, {useState} from "react";
import {CalendarPage} from "../CalendarPage";
import {SearchPage} from "../SearchPage";
import {pxSizes} from "../../theme/Sizes";
import {MyText, MyTextSemiBold} from "../../components/Texts";
import {CALENDAR_TITLE, CHANGE_THEME_TEXT, SEARCH_TITLE} from "../../../appconstants/Strings";
import {
    ANIME_DETAILS_LINK,
    CALENDAR_LINK,
    DEFAULT_LINK, EPISODE_LINK,
    MANGA_DETAILS_LINK,
    RANOBE_DETAILS_LINK,
    SEARCH_LINK
} from "../navigation/useShikiNavigateLinks";
import {DetailsPage} from "../DetailsPage";
import {EpisodePage} from "../EpisodePage";

const calendarIcon = "/ic_calendar.png"
const searchIcon = "/ic_search.png"
const lightThemeIcon = "/ic_light_theme.png"
const darkThemeIcon = "/ic_dark_theme.png"

/**
 * Страницы с навигацей в режиме "Гость"
 */
export const GuestSidebar = () => {

    const {theme, isDark, toggle} = useShikiTheme()

    const [sideFocus, setSideFocus] = useState<boolean>(false)

    const isCalendarRoute = useMatch({path: CALENDAR_LINK})
    const isSearchRoute = useMatch({path: SEARCH_LINK})

    const menuItem = [
        {
            path: CALENDAR_LINK,
            name: CALENDAR_TITLE,
            icon: calendarIcon
        },
        {
            path: SEARCH_LINK,
            name: SEARCH_TITLE,
            icon: searchIcon
        }
    ]

    return (
        <Sidebar sideFocus={sideFocus} sidebar={
            <div style={{
                display: "flow",

            }}>
                <NavLink to={menuItem[0].path} key={0} style={{
                    color: "transparent"
                }}>
                    {SideBarButton({
                        btnName: menuItem[0].name,
                        image: menuItem[0].icon,
                        color: isCalendarRoute ? theme.secondaryPng : theme.onPrimaryPng,
                        textColor: isCalendarRoute ? theme.secondary : theme.onPrimary,
                        backgroundColor: isCalendarRoute ? theme.secondaryVariant : null,
                        paddingTop: pxSizes.value20px,
                        onFocus: (focus: boolean) => {
                            setSideFocus(focus)
                        },
                        onClick: () => {

                        }
                    })}
                </NavLink>

                <NavLink to={menuItem[1].path} key={1} style={{
                    color: "transparent"
                }}>
                    {SideBarButton({
                        btnName: menuItem[1].name,
                        image: menuItem[1].icon,
                        color: isSearchRoute ? theme.secondaryPng : theme.onPrimaryPng,
                        textColor: isSearchRoute ? theme.secondary : theme.onPrimary,
                        paddingTop: pxSizes.value14px,
                        onFocus: (focus: boolean) => {
                            setSideFocus(focus)
                        },
                        onClick: () => {

                        }
                    })}
                </NavLink>

                <div style={{
                    position: "absolute",
                    bottom: 0
                }}>
                    {
                        SideBarButton({
                            btnName: CHANGE_THEME_TEXT,
                            image: isDark ? lightThemeIcon : darkThemeIcon,
                            color: theme.onBackgroundPng,
                            textColor: theme.onBackground,
                            paddingBottom: pxSizes.value20px,
                            onFocus: (focus: boolean) => {
                                setSideFocus(focus)
                            },
                            onClick: toggle,
                        })
                    }
                </div>
            </div>
        } mainContent={
            <main style={{
                width: "100%",
                height: "100%",
                background: theme.background
            }}>
                <Routes>
                    <Route path={CALENDAR_LINK} element={<CalendarPage/>}/>
                    <Route path={SEARCH_LINK} element={<SearchPage/>}/>
                    <Route path={ANIME_DETAILS_LINK} element={<DetailsPage/>}/>
                    <Route path={MANGA_DETAILS_LINK} element={<DetailsPage/>}/>
                    <Route path={RANOBE_DETAILS_LINK} element={<DetailsPage/>}/>
                    <Route path={EPISODE_LINK} element={<EpisodePage/>}/>
                    <Route path={DEFAULT_LINK} element={<div>
                        <MyTextSemiBold text={'НЕ НАЙДЕНО'}/>
                    </div>} />
                </Routes>
            </main>
        }/>
    )
}

/**
 * Кнопка для показа в боковой панели навигации
 *
 * @param image ссылка на иконку
 * @param btnName название кнопки
 * @param color цвет иконки
 * @param textColor цвет названия кнопки
 * @param backgroundColor цвет фона кнопки
 * @param paddingTop отстуа сверху
 * @param paddingBottom отступ снизу
 * @param onFocus коллбэк состояния фокуса кнопки
 * @param onClick коллбэк нажатия на кнопку
 */
const SideBarButton = ({
    image,
    btnName,
    color,
    textColor,
    backgroundColor,
    paddingTop = 0,
    paddingBottom = 0,
    onFocus,
    onClick
}: {
    image: string,
    btnName: string,
    color?: string,
    textColor?: string,
    backgroundColor?: string | null,
    paddingTop?: number,
    paddingBottom?: number,
    onFocus: (focus: boolean) => void,
    onClick: () => void
}) => {

    const [btnFocus, setBtnFocus] = useState<boolean>(false)

    let name

    if (btnFocus) {
        name = <MyText text={btnName} color={textColor} maxLines={2} fontSize={14}/>
    } else {
        name = null
    }

    return (
        <div style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            paddingLeft: pxSizes.value20px,
            paddingTop: paddingTop,
            paddingBottom: paddingBottom
        }}>
            <RoundedIconButton
                image={image}
                color={color}
                backgroundColor={backgroundColor}
                onFocus={(focus: boolean) => {
                    setBtnFocus(focus)
                    onFocus(focus)
                }}
                onClick={onClick}
            />
            {name}
        </div>
    )
}