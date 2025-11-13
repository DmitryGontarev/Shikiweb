import {useEffect, useState} from "react";
import {AnimeModel} from "../../data/models/anime/AnimeModel";
import {getAnimeListByParameters} from "../../data/network/api/AnimeApi";
import {AnimeSearchType} from "../../data/models/anime/AnimeSearchType";
import {AxiosError} from "axios";

/**
 * Функция для работы с данными экрана Поиск
 */
export function useSearchHook() {

    const [page, setPage] = useState<number>(1)
    const [limit, setLimit] = useState<number>(50)
    const [order, setOrder] = useState(AnimeSearchType.RANKED)
    const [kind, setKind] = useState<string | null>(null)
    const [status, setStatus] = useState<string | null>(null)
    const [season, setSeason] = useState<string | null>(null)
    const [score, setScore] = useState<string | null>(null)
    const [duration, setDuration] = useState<string | null>(null)
    const [rating, setRating] = useState<string | null>(null)
    const [genre, setGenre] = useState<string | null>(null)
    const [studio, setStudio] = useState<string | null>(null)
    const [franchise, setFranchise] = useState<string[] | null>(null)
    const [censored, setCensored] = useState<boolean | null>(true)
    const [myList, setMyList] = useState<string | null>(null)
    const [ids, setIds] = useState<string[] | null>(null)
    const [excludeIds, setExcludeIds] = useState<string[] | null>(null)
    const [search, setSearch] = useState<string | null>(null)

    const [loading, setLoading] = useState<boolean>(true)

    const [error, setError] = useState<boolean>(false)

    const [animeList, setAnimeList] = useState<AnimeModel[]>([])

    /** флаг изменения настроек поиска */
    const [isSearchSettingsChanged, setIsSearchSettingsChanged] = useState<boolean>(false)

    /** флаг достижения конца списка поиска */
    const [endReached, setEndReached] = useState<boolean>(false)

    /** флаг поиска по списку найдено/ не найдено */
    const [isSearchEmpty, setIsSearchEmpty] = useState<boolean>(false)

    useEffect(() => {
        if (page > 0) {
            getSearchList({page: page, search: search}).then()
        }
    }, [page])

    async function getSearchList({page, search}: {page: number, search: string | null}) {
        setError(false)
        try {
            setLoading(true)
            await getAnimeListByParameters({
                page: page,
                limit: limit,
                order: order,
                kind: kind,
                status: status,
                season: season,
                score: score,
                duration: duration,
                rating: rating,
                genre: genre,
                studio: studio,
                franchise: franchise,
                censored: censored,
                myList: myList,
                ids: ids,
                excludeIds: excludeIds,
                search: search
            })
                .then(
                    async newlist => {

                        if (newlist.length == 0 && page == 1) {
                            await setAnimeList([])
                            await setEndReached(true)
                        }

                        if (newlist.length == 0 && page > 1) {
                            await setEndReached(true)
                        }

                        if (isSearchSettingsChanged) {
                            await setAnimeList([])
                            await setIsSearchSettingsChanged(false)
                        }

                        await addAnimeSearch({list: newlist})
                    }
                )
                .catch(async (e) => {
                    await setPage(prevState => prevState)
                    setError(true)
                })
                .finally(() => {
                    setLoading(false)
                })
        } catch (e) {
            const error = e as AxiosError
            await setPage(prevState => prevState)
            setError(true)
        }
    }

    /**
     * функция для добавления элементов в список при пагинации
     *
     * @param list список аниме
     */
    async function addAnimeSearch({list}: {list: AnimeModel[] | null}) {

        let newList = animeList;

        if (list != null && list.length > 0) {
            for (let item of list) {
                const flag = newList.find((e: AnimeModel) =>
                    e.id === item.id
                )
                if (flag === undefined) {
                    newList.push(item)
                }
            }
        }

        await setAnimeList(newList)
    }

    async function reset() {
        await setPage(0)
        await setAnimeList([])
        await setIsSearchSettingsChanged(true)
        await setEndReached(false)
        await setPage(1)
    }

    async function fullReset() {
        await setSearch('')
        await reset()
    }

    async function searchByTitle({title}: {title: string}) {
        await setSearch(prevState => title)
        await reset()
    }

    return {animeList, loading, error, setPage, endReached, search, searchByTitle, fullReset}
}