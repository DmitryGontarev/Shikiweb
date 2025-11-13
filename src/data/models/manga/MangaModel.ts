import {ImageModel} from "../common/ImageModel";

/**
 * Сущность с информацией о манге
 *
 * @property id id номер манги
 * @property name название манги
 * @property russian название аниме на русском
 * @property image ссылка на обложку манги
 * @property url ссылка на страницу сайта манги
 * @property type тип манги (manga, manwha, manhua, novel, oneshot, doujin)
 * @property score оценка манги по 10-тибалльной шкале
 * @property status статус релиза (anons, ongoing, released)
 * @property volumes количество томов
 * @property chapters количество глав
 * @property dateAired дата начала выпуска
 * @property dateReleased дата окончания выпуска
 */
export interface MangaModel {
    id: number | null,
    name: string | null,
    russian: string | null,
    image: ImageModel | null,
    url: string | null,
    kind: string | null,
    score: number | null,
    status: string | null,
    volumes: number | null,
    chapters: number | null,
    aired_on: string | null,
    released_on: string | null
}