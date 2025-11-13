import {AnimeModel} from "../../models/anime/AnimeModel";
import {AnimeSearchType} from "../../models/anime/AnimeSearchType";
import {getAxiosRequest} from "../axios/AxiosForApp";
import {AnimeDetailsModel} from "../../models/anime/AnimeDetailsModel";
import {RolesModel} from "../../models/common/RolesModel";
import {RelatedModel} from "../../models/common/RelatedModel";
import {ScreenshotModel} from "../../models/anime/ScreenshotModel";
import {AnimeVideoModel} from "../../models/anime/AnimeVideoModel";
import {LinkModel} from "../../models/common/LinkModel";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/** Интерфейс API для получения данных об аниме */
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Получение списка аниме по указанным параметрам
 *
 * @param page номер страницы, должно быть числом между 1 и 100000 (необязательно)
 * @param limit лимит списка, число максимум 50 (необязательно)
 * @param order порядок сортировки (id, id_desc, ranked, kind, popularity, name, aired_on, episodes, status, random) (необязательно)
 * @param kind тип аниме (tv, movie, ova, ona, special, music, tv_13, tv_24, tv_48) (необязательно)
 * @param status тип релиза (anons, ongoing, released) (необязательно)
 * @param season сезон выхода аниме (summer_2017, 2016, 2014_2016) (необязательно)
 * @param score оценка аниме (необязательно)
 * @param duration длительность аниме (S, D, F) (необязательно)
 * @param rating возрастной рейтинг (none, g, pg, pg_13, r, r_plus, rx) (необязательно)
 * @param genre список с id жанров аниме  (необязательно)
 * @param studio список студий, работавших над аниме
 * @param franchise список с названиями франшиз аниме (необязательно)
 * @param censored включить цензуру (Set to false to allow hentai, yaoi and yuri) (необязательно)
 * @param myList статус аниме в списке пользователя (planned, watching, rewatching, completed, on_hold, dropped) (необязательно)
 * @param ids список id номеров аниме (необязательно)
 * @param excludeIds список id номеров аниме (необязательно)
 * @param search поисковая фраза для фильтрации аниме по имени (name) (необязательно)
 */
export async function getAnimeListByParameters(
    {
        page = 1,
        limit = 50,
        order = AnimeSearchType.RANKED,
        kind = null,
        status = null,
        season = null,
        score = null,
        duration = null,
        rating = null,
        genre = null,
        studio = null,
        franchise = null,
        censored = true,
        myList = null,
        ids = null,
        excludeIds = null,
        search = null
    }: {
        page?: number | null,
        limit?: number | null,
        order?: string | null,
        kind?: string | null,
        status?: string | null,
        season?: string | null,
        score?: string | null,
        duration?: string | null,
        rating?: string | null,
        genre?: string | null,
        studio?: string | null,
        franchise?: string[] | null,
        censored?: boolean | null,
        myList?: string | null,
        ids?: string[] | null,
        excludeIds?: string[] | null,
        search?: string | null
    }
): Promise<AnimeModel[]> {

    const params = new URLSearchParams()

    if (page != null) {
        params.append('page', `${page}`)
    }

    if (limit != null) {
        params.append('limit', `${limit}`)
    }

    if (order != null) {
        params.append('order', `${order}`)
    }

    if (kind != null) {
        params.append('kind', `${kind}`)
    }

    if (status != null) {
        params.append('status', `${status}`)
    }

    if (season != null) {
        params.append('season', `${season}`)
    }

    if (score != null) {
        params.append('score', `${score}`)
    }

    if (duration != null) {
        params.append('duration', `${duration}`)
    }

    if (rating != null) {
        params.append('rating', `${rating}`)
    }

    if (genre != null) {
        params.append('genre', `${genre}`)
    }

    if (studio != null) {
        params.append('studio', `${studio}`)
    }

    if (franchise != null) {
        params.append('franchise', `${franchise}`)
    }

    if (censored != null) {
        params.append('censored', `${censored}`)
    }

    if (myList != null) {
        params.append('mylist', `${myList}`)
    }

    if (ids != null) {
        params.append('ids', `${ids}`)
    }

    if (excludeIds != null) {
        params.append('exclude_ids', `${excludeIds}`)
    }

    if (search != null) {
        params.append('search', `${search}`)
    }

    const response = await getAxiosRequest<AnimeModel[]>({url: '/api/animes', params: params})
    return response.data.map(item => item)
}

/**
 * Получить информацию об аниме по ID
 *
 * @param id id номер аниме
 */
export async function getAnimeDetailsById({id}: {id: number | string | null}): Promise<AnimeDetailsModel> {
    const response = await getAxiosRequest<AnimeDetailsModel>({url: `/api/animes/${id}`})
    return response.data
}

/**
 * Получить информацию о людях, принимавших участие в создании аниме по id
 *
 * @param id id аниме
 */
export async function getAnimeRolesById({id}: {id: number | string | null}): Promise<RolesModel[]> {
    const response = await getAxiosRequest<RolesModel[]>({url: `/api/animes/${id}/roles`})
    return response.data.map(item => item)
}

/**
 * Получить список похожих аниме по ID
 *
 * @param id id аниме
 */
export async function getSimilarAnime({id}: {id: number | string | null}): Promise<AnimeModel[]> {
    const response = await getAxiosRequest<AnimeModel[]>({url: `/api/animes/${id}/similar`})
    return response.data.map(item => item)
}

/**
 * Получить список аниме, связанных с текущим
 *
 * @param id id аниме
 */
export async function getRelatedAnime({id}: {id: number | string | null}): Promise<RelatedModel[]> {
    const response = await getAxiosRequest<RelatedModel[]>({url: `/api/animes/${id}/related`})
    return response.data.map(item => item)
}

/**
 * Получить список аниме, связанных с текущим
 *
 * @param id id аниме
 */
export async function getAnimeScreenshotsById({id}: {id: number | string | null}): Promise<ScreenshotModel[]> {
    const response = await getAxiosRequest<ScreenshotModel[]>({url: `/api/animes/${id}/screenshots`})
    return response.data.map(item => item)
}

/**
 * Получить внешние ссылки на произведение
 *
 * @param id id аниме
 */
export async function getAnimeExternalLinksById({id}: {id: number | string | null}): Promise<LinkModel[]> {
    const response = await getAxiosRequest<LinkModel[]>({url: `/api/animes/${id}/external_links`})
    return response.data.map(item => item)
}

////////////////////////////////////////////////////////////////////////////////////////////////
// Videos API
////////////////////////////////////////////////////////////////////////////////////////////////
export async function getAnimeVideos({id}: {id: number | string | null}): Promise<AnimeVideoModel[]> {
    const response = await getAxiosRequest<AnimeVideoModel[]>({url: `/api/animes/${id}/videos`})
    return response.data.map(item => item)
}