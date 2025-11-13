import React from 'react';
import {CalendarModel} from "../../data/models/calendar/CalendarModel";
import {useShikiTheme} from "../theme/ThemeProvider";
import {ElementCard, InfoColumn, OverPictureOne} from "../components/ElementCard";
import {getEmptyIfBothNull} from "../../utils/StringUtils";
import {useCalendarHook} from "../hooks/useCalendarHook";
import {StackTopContainer} from "../components/StackTopContainer";
import {MyText, MyTextBold} from "../components/Texts";
import {HH_mm, toMonthName} from "../../utils/DateUtils";
import {jsx} from "@emotion/react";
import JSX = jsx.JSX;
import {pxSizes, textSizes} from "../theme/Sizes";
import {Loader} from "../components/Lodaer";
import {INPUT_TITLE_TEXT, RELEASED_TITLE} from "../../appconstants/Strings";
import {RowSearchField} from "../components/RowSearchField";
import {RoundedIconButton} from "../components/RoundedIconButton";
import {hexToRgbWithAlpha} from "../../utils/CommonUtils";
import {DefaultColorOnBackground} from "../theme/Colors";
import {useShikiNavigateLinks} from "./navigation/useShikiNavigateLinks";
import {MyDivider} from "../components/MyDivider";
import {PaddingBySide} from "../components/PaddingAll";
import {HorizontalScrollList} from "../components/HorizontalScrollList";

const iconReload = "/ic_reload.png"

/**
 * Экран 'Календарь'
 */
export const CalendarPage = () => {

    const {theme} = useShikiTheme()

    const {released, dateMap, loading, error, searchInCalendar, isSearchEmpty, reset} = useCalendarHook()

    /** список элементов экрана */
    let animeList: JSX.Element[] = []

    if (released.length > 0) {
        animeList.push(
            <RowDayAnime title={RELEASED_TITLE} animeList={released}/>
        )
    }

    for (let key of Array.from(dateMap.keys())) {
        animeList.push(
            <RowDayAnime
                title={`${key.toDayName()}, ${key.toDayNumber()} ${toMonthName({value: key, infinitive: false})}`}
                animeList={dateMap.get(key) ?? []}/>
        )
    }

    let mainContent;

    if (loading) {
        mainContent = <Loader/>
    } else {
        if (isSearchEmpty) {
            mainContent = <div>
                <MyText text={"ПУСТО"}/>
            </div>
        } else {
            mainContent = <div style={{
                position: "relative",
                display: "flow",
                height: "100%",
                justifyContent: "center"
            }}>
                {animeList}
            </div>
        }
    }

    return (
        <StackTopContainer top={
            <RowSearchField
                placeholder={INPUT_TITLE_TEXT}
                clearText={loading}
                clearString={(func) => {
                }}
                onChange={(value: string) => {
                    searchInCalendar({input: value})
                }}
                onSubmit={(value: string) => {

                }}
                onClearClick={() => {

                }}
                endElement={
                    <RoundedIconButton
                        image={iconReload}
                        backgroundColor={hexToRgbWithAlpha({hex: theme.surface, alpha: 0.7})}
                        onClick={() => {
                            reset()
                        }}
                        color={theme.onBackgroundPng}
                        borderColor={hexToRgbWithAlpha({hex: DefaultColorOnBackground, alpha: 0.5})}/>
                }/>
        } underTop={
            mainContent
        }/>
    )
};

/**
 * Список день - выходящие аниме
 *
 * @param title название дня недели и дата
 * @param animeList горизонтальный список аниме
 */
const RowDayAnime = ({title, animeList}: { title: string, animeList: CalendarModel[] }) => {

    let cList: React.ReactNode[] = []
    for (let anime of animeList) {
        cList.push(
            <PaddingBySide left={pxSizes.value10px} right={pxSizes.value10px}>
                <CalendarCard calendar={anime}/>
            </PaddingBySide>
        )
    }

    return (
        <div style={{
            display: "flow",
            flexDirection: "column",
            width: "100%",
            height: "auto"
        }}>

            <PaddingBySide top={pxSizes.value14px} bottom={pxSizes.value30px}>
                {MyTextBold({text: title, fontSize: textSizes.big})}
            </PaddingBySide>

            <HorizontalScrollList elements={cList}/>

            <MyDivider/>

        </div>
    )
}

/**
 * Карточка элемента календаря
 *
 * @param calendar модель данных элемента списка календаря
 */
const CalendarCard = ({calendar}: { calendar: CalendarModel }) => {

    const {navigateAnimeDetails} = useShikiNavigateLinks()

    // текущее время
    const currentTime = Date.now()

    const nextEpisodeDate = calendar.next_episode_at?.dateFromString() ?? currentTime

    // флаг, что время выходы эпизода больше текущего времени
    const isAfter = currentTime >= nextEpisodeDate

    return (
        ElementCard({
            imageUrl: calendar.anime?.image?.original ?? '',
            overPicture: OverPictureOne({
                leftTopText: isAfter ? null : `${calendar.next_episode_at?.formatDate(HH_mm)}`
            }),
            titleText: getEmptyIfBothNull({
                str1: calendar.anime?.russian, str2: calendar.anime?.name
            }),
            secondTextOne: `${calendar.next_episode} эп.`,
            secondTextTwo: isAfter ? null : calendar.next_episode_at?.getDateBeforeCurrent(),
            onImageClick: () => {
                navigateAnimeDetails({id: calendar.anime?.id})
            },
            onTextClick: () => {
                navigateAnimeDetails({id: calendar.anime?.id})
            },
            info: InfoColumn({
                status: calendar.anime?.status,
                score: calendar.anime?.score,
                episodes: calendar.anime?.episodes,
                episodesAired: calendar.anime?.episodes_aired,
                dateAired: calendar.anime?.aired_on,
                dateReleased: calendar.anime?.released_on
            })
        })
    )
}