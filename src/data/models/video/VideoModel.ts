import {TrackModel} from "./TrackModel";

/**
 * Сущность с информацией о видео
 *
 * @param animeId идентификационный номер аниме
 * @param episodeId идентификационный номер эпизода
 * @param player название плеера
 * @param hosting название хостинга
 * @param tracks список доступных разрешений видео
 * @param subAss
 * @param subVtt
 */
export interface VideoModel {
    animeId: number | null,
    episodeId: number | null,
    player: string | null,
    hosting: string | null,
    tracks: TrackModel[] | null,
    subtitlesUrl: string | null,
    subtitlesVttUrl: string | null
}