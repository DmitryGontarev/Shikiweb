import {getAxiosVideoRequest} from "../axios/AxiosForApp";
import {ShimoriVideoModel} from "../../models/video/ShimoriVideoModel";
import {ShimoriTranslationModel} from "../../models/video/ShimoriTranslationModel";
import {VideoModel} from "../../models/video/VideoModel";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/** Интерфейс API для получения видео */
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Получить количество вышедших эпизодов
 *
 * @param malId идентификационный номер аниме с сайта MyAnimeList
 * @param name название на английском
 */
export async function getEpisodes({
    malId,
    name
}: {
    malId: number | string | null,
    name: string | null
}) : Promise<number> {

    const params = new URLSearchParams()

    if (malId != null) {
        params.append('id', malId.toString())
    }

    if (name != null) {
        params.append('name', name)
    }

    const response = await getAxiosVideoRequest<string>({url: '/api/anime/episodes', params: params})
    return Number(response.data)
}

/**
 * Получить количество вышедших эпизодов
 *
 * @param malId идентификационный номер аниме с сайта MyAnimeList
 * @param name название на английском
 */
export async function getSeries({
    malId,
    name
}: {
    malId: number | string | null,
    name: string | null
}) : Promise<ShimoriVideoModel> {

    const params = new URLSearchParams()

    if (malId != null) {
        params.append('id', malId.toString())
    }

    if (name != null) {
        params.append('name', name)
    }

    const response = await getAxiosVideoRequest<ShimoriVideoModel>({url: '/api/anime/series', params: params})
    return response.data
}

/**
 * Получить информацию по трансляции конкретноого эпизода
 *
 * @param malId идентификационный номер аниме с сайта MyAnimeList
 * @param name название на английском
 * @param episode номер эпизода
 * @param hostingId идентификационный номер хостинга
 * @param translationType тип трансляции (оригинал, субтитры, озвучка)
 */
export async function getTranslations({
    malId,
    name,
    episode = 1,
    hostingId = 1,
    kind
}: {
    malId: number | string | null,
    name: string | null,
    episode?: number | null,
    hostingId?: number | null,
    kind: string | null | undefined
}) : Promise<ShimoriTranslationModel[]> {

    const params = new URLSearchParams()

    if (malId != null) {
        params.append('id', malId.toString())
    }

    if (name != null) {
        params.append('name', name)
    }

    if (episode != null) {
        params.append('episode', episode.toString())
    }

    if (hostingId != null) {
        params.append('hostingId', hostingId.toString())
    }

    if (kind != null) {
        params.append('kind', kind)
    }

    const response = await getAxiosVideoRequest<ShimoriTranslationModel[]>({url: '/api/anime/query', params: params})
    return response.data
}

/**
 * Получить информацию для потоковой загрузки эпизода
 *
 * @param malId идентификационный номер аниме с сайта MyAnimeList
 * @param episode номер эпизода
 * @param translationType тип трансляции (оригинал, субтитры, озвучка)
 * @param author автор загруженного эпизода
 * @param hosting название хостинга
 * @param hostingId идентификационный номер хостинга
 * @param videoId идентификационный номер видео на хостинге
 * @param url ссылка на видео
 * @param accessToken токен для загрузки, если нужен
 */
export async function getVideo({
    malId,
    episode,
    kind,
    author,
    hosting,
    hostingId,
    videoId,
    url,
    accessToken
}: {
    malId: number | string | null,
    episode: number | null,
    kind: string | null,
    author: string | null,
    hosting: string | null,
    hostingId: number | null,
    videoId: number | null,
    url: string | null,
    accessToken: string | null
}) : Promise<VideoModel> {

    const params = new URLSearchParams()

    if (malId != null) {
        params.append('id', malId.toString())
    }

    if (episode != null) {
        params.append('episode', episode.toString())
    }

    if (kind != null) {
        params.append('kind', kind)
    }

    if (author != null) {
        params.append('author', author)
    }

    if (hosting != null) {
        params.append('hosting', hosting)
    }

    if (hostingId != null) {
        params.append('hostingId', hostingId.toString())
    }

    if (videoId != null) {
        params.append('videoId', videoId.toString())
    }

    if (url != null) {
        params.append('url', url)
    }

    if (accessToken != null) {
        params.append('accessToken', accessToken)
    }

    const response = await getAxiosVideoRequest<VideoModel>({url: '/api/anime/video', params: params})
    return response.data
}