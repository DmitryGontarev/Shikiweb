import {ImageModel} from "../common/ImageModel";
import {StatisticModel} from "../user/StatisticModel";
import {GenreModel} from "../common/GenreModel";
import {UserRateModel} from "../rates/UserRateModel";

/**
 * Сущность с детальной информацией по выбранной манге
 *
 * @property id id номер манги
 * @property name название манги
 * @property russian название манги на русском
 * @property image ссылка на постер манги
 * @property url ссылка на страницу сайта с аниме
 * @property type тип релиза манги (manga, manhwa, manhua, light_novel, novel, one_shot, doujin)
 * @property score оценка манги по 10-тибалльной шкале
 * @property status статус релиза (anons, ongoing, released)
 * @property volumes количество томов
 * @property chapters количество глав
 * @property dateAired дата начала трансляции
 * @property dateReleased дата выхода
 * @property english название на английском
 * @property japanese название на японском
 * @property synonyms синонимы
 * @property description описание
 * @property description_html описание в HTML
 * @property description_source название источника описания
 * @property franchise название франшизы
 * @property favoured в избранном (true or false)
 * @property anons в статусе анонса (true or false)
 * @property ongoing в статусе онгоинга (true or false)
 * @property thread_id номер треда
 * @property topic_id номер топика
 * @property myanimelist_id номер в списке пользователя, если есть
 * @property rates_scores_stats статистика по оценкам
 * @property rates_statuses_stats статистика по статусам
 * @property genres список жанров
 * @property user_rate пользовательский рейтинг манги
 */
export interface MangaDetailsModel {
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
    released_on: string | null,
    rating: string | null,
    english: string[] | null,
    japanese: string[] | null,
    synonyms: string[] | null,
    duration: number | null,
    description: string | null,
    description_html: string | null,
    description_source: string | null,
    franchise: string | null,
    favoured: boolean | null,
    anons: boolean | null,
    ongoing: boolean | null,
    thread_id: number | null,
    topic_id: number | null,
    myanimelist_id: number | null,
    rates_scores_stats: StatisticModel[] | null,
    rates_statuses_stats: StatisticModel[] | null,
    updated_at: string | null,
    next_episode_at: string | null,
    genres: GenreModel[] | null,
    user_rate: UserRateModel
}