import {useEffect, useState} from "react";
import {CalendarModel} from "../../data/models/calendar/CalendarModel";
import {getCalendar} from "../../data/network/api/CalendarApi";
import {AxiosError} from "axios";
import {getCurrentTime} from "../../utils/DateUtils";
import {containsIgnoreCase} from "../../utils/StringUtils";

require("../../utils/DateUtils");
require("../../utils/CommonUtils");

/**
 * Функция для работы с данными экрана Календарь
 */
export function useCalendarHook() {

    /** флаг состояния загрузки  */
    const [loading, setLoading] = useState<boolean>(true)

    /** флаг ошибки загрузки */
    const [error, setError] = useState<boolean>(false)

    /** список вышедших эпизодов аниме */
    const [released, setRelease] = useState<CalendarModel[]>([])

    /** словарь дата-список аниме графика выхода серий */
    const [dateMap, setMap] = useState<Map<number, CalendarModel[]>>(new Map())

    /** сохранённый список вышедшего */
    const [saveReleased, setSaveReleased] = useState<CalendarModel[]>([])

    /** сохранённый словарь с графиком */
    const [saveMap, setSaveMap] = useState<Map<number, CalendarModel[]>>(new Map())

    /** флаг поиска по списку найдено/ не найдено */
    const [isSearchEmpty, setIsSearchEmpty] = useState<boolean>(false)

    useEffect(() => {
        getCalendarList()
    }, [])

    /** Функция получения списка Календаря из сети */
    function getCalendarList() {
        setError(false)
        try {
            setLoading(true)
            getCalendar()
                .then(
                    async calendarModels => {
                        await calendarToMap({calendarList: calendarModels})
                    }
                )
                .catch((e) => {
                    setError(true)
                })
                .finally(() => {
                    setLoading(false)
                })
        } catch (e: unknown) {
            const error = e as AxiosError
            setError(true)
        }
    }

    /**
     * Функция для распределения полученных данных по спискам
     *
     * @param calendarList список с датами выхода серий
     */
    async function calendarToMap({calendarList}: { calendarList: CalendarModel[] }) {
        // текущее время для расчёта сортировки списка по дате
        const currentTime: number = getCurrentTime();

        let releasedToday: CalendarModel[] = [];
        let animeMap: Map<number, CalendarModel[]> = new Map();

        for (let calendarModel of calendarList) {
            calendarModel.next_episode_at?.dateFromString()?.let((nextEpisodeDate: number) => {
                if (currentTime >= nextEpisodeDate) {
                    releasedToday.push(calendarModel)
                } else {
                    const key = nextEpisodeDate.dateToStartDay()

                    if (animeMap.get(key) === undefined) {
                        animeMap.set(key, [calendarModel])
                    } else {
                        animeMap.get(key)?.push(calendarModel)
                    }
                }
            })
        }

        setSaveReleased(releasedToday)
        setSaveMap(animeMap)

        setRelease(releasedToday)
        setMap(animeMap)
    }

    /**
     * Функция поиска по Календарю
     *
     * @param input строка из поля поиска по Календарю
     */
    function searchInCalendar({input}: { input: string | null }) {
        let searchToday: CalendarModel[] = [];
        let searchMap: Map<number, CalendarModel[]> = new Map();

        if (input?.length ?? 0 > 0) {

            for (let element of saveReleased) {
                const containsRusName = containsIgnoreCase({string1: element?.anime?.russian, string2: input})
                const containsEngName = containsIgnoreCase({string1: element?.anime?.name, string2: input})

                if (containsRusName || containsEngName) {
                    searchToday.push(element)
                }
            }

            saveMap.forEach((value: CalendarModel[], key: number) => {
                for (let element of value) {
                    const containsRusName = containsIgnoreCase({string1: element?.anime?.russian, string2: input})
                    const containsEngName = containsIgnoreCase({string1: element?.anime?.name, string2: input})

                    if (containsRusName || containsEngName) {
                        if (searchMap.get(key) === undefined) {
                            searchMap.set(key, [element])
                        } else {
                            searchMap.get(key)?.push(element)
                        }
                    }
                }
            })

            if (searchToday.length == 0 && searchMap.size == 0) {
                setIsSearchEmpty(true)
            } else {
                setIsSearchEmpty(false)
                setRelease(searchToday)
                setMap(searchMap)
            }
        } else {
            setIsSearchEmpty(false)
            setRelease(saveReleased)
            setMap(saveMap)
        }
    }

    function reset() {
        getCalendarList()
    }

    return {released, dateMap, loading, error, searchInCalendar, isSearchEmpty, reset}
}