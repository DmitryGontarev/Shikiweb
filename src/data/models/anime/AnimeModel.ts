import {ImageModel} from "../common/ImageModel";

/**
 * Сущность с информацией об аниме
 *
 * @property id id номер аниме
 * @property name название аниме
 * @property russian название аниме на русском
 * @property image ссылка на постер аниме
 * @property url ссылка на страницу сайта с аниме
 * @property type тип релиза аниме (tv, movie, ova, ona, special, music, tv_13, tv_24, tv_48)
 * @property score оценка аниме по 10-тибалльной шкале
 * @property status статус релиза (anons, ongoing, released)
 * @property episodes общее количество эпизодов
 * @property episodes_aired количество вышедших эпизодов
 * @property aired_on дата начала трансляции
 * @property released_on дата выхода
 */
export interface AnimeModel {
    id: number | null,
    name: string | null,
    russian: string | null,
    image: ImageModel | null,
    url: string | null,
    kind: string | null,
    score: number | null,
    status: string | null,
    episodes: number | null,
    episodes_aired: number | null,
    aired_on: string | null,
    released_on: string | null
}