import {AnimeModel} from "../anime/AnimeModel";

/**
 * Сущность с данными о дате выхода аниме
 *
 * @property next_episode номер следующего эпизода
 * @property next_episode_at дата выхода следующего эпизода
 * @property duration длительность эпизода
 * @property anime сущность с данными об аниме
 */
export interface CalendarModel {
    next_episode: number | null,
    next_episode_at: string | null,
    duration: string | null,
    anime: AnimeModel | null
}