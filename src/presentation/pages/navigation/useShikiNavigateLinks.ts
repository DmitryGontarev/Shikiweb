import {useShikiNavigator} from "./useShikiNavigator";
import {DetailsScreenType} from "../../PagesEnums";
import {AnimeDetailsModel} from "../../../data/models/anime/AnimeDetailsModel";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/** Ссылки на страницы сайта */
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const STANDARD_START_LINK = '/'
export const DEFAULT_LINK = '*'

export const ENTER_LINK = '/enter'

export const SIDEBAR_LINK = '/*'
export const CALENDAR_LINK = '/'
export const SEARCH_LINK = '/search'
export const ANIME_DETAILS_LINK = "/anime/:id"
export const MANGA_DETAILS_LINK = '/manga/:id'
export const RANOBE_DETAILS_LINK = '/ranobe/:id'
export const EPISODE_LINK = '/episode/:id/:name'

/**
 * Хук для навигации по ссылкам
 */
export function useShikiNavigateLinks() {

    const idParam = ':id'
    const animePath = 'anime'
    const mangaPath = 'manga'
    const ranobePath = 'ranobe'
    const nameParam = ':name'

    const {navigator, location, navigateNext} = useShikiNavigator()

    /**
     * Функция для перехода на страницу детальной информации об аниме
     *
     * @param id идентификационный номер аниме
     */
    function navigateAnimeDetails({id}: { id: number | null | undefined }) {
        navigateNext({link: ANIME_DETAILS_LINK.replace(idParam, `${id}`)})
    }

    /**
     * Функция для перехода на страницу детальной информации о манге
     *
     * @param id идентификационный номер манги
     */
    function navigateMangaDetails({id}: { id: number | null | undefined }) {
        navigateNext({link: MANGA_DETAILS_LINK.replace(idParam, `${id}`)})
    }

    /**
     * Функция для перехода на страницу детальной информации о ранобэ
     *
     * @param id идентификационный номер ранобэ
     */
    function navigateRanobeDetails({id}: { id: number | null | undefined }) {
        navigateNext({link: RANOBE_DETAILS_LINK.replace(idParam, `${id}`)})
    }

    /** Функция для возврата типа страницы детальной информации в зависимости от ссылки */
    function getDetailsPageType(): DetailsScreenType | null {
        const path = location.pathname

        if (path.includes(animePath)) {
            return DetailsScreenType.ANIME
        }

        if (path.includes(mangaPath)) {
            return DetailsScreenType.MANGA
        }

        if (path.includes(ranobePath)) {
            return DetailsScreenType.RANOBE
        }

        return null
    }

    function navigateEpisode({
        animeId,
        animeNameRu,
        animeNameEng,
        animeImageUrl
    }: {
        animeId: number | null | undefined,
        animeNameRu: string | null | undefined,
        animeNameEng: string | null | undefined,
        animeImageUrl: string | null | undefined }
    ) {

        navigator(EPISODE_LINK
            .replace(idParam, `${animeId}`)
            .replace(nameParam, `${animeNameEng}`),
            {state: {animeNameRu, animeImageUrl}}
        )
    }

    return {navigateAnimeDetails, navigateMangaDetails, navigateRanobeDetails, getDetailsPageType, navigateEpisode}
}