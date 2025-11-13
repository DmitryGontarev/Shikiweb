import {ImageModel} from "../common/ImageModel";
import {StatisticModel} from "../user/StatisticModel";
import {GenreModel} from "../common/GenreModel";
import {StudioModel} from "../studio/StudioModel";
import {AnimeVideoModel} from "./AnimeVideoModel";
import {ScreenshotModel} from "./ScreenshotModel";
import {UserRateModel} from "../rates/UserRateModel";

/**
 * Модель данных с детальной информацией по выбранному аниме
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
 * @property episodesAired количество вышедших эпизодов
 * @property dateAired дата начала трансляции
 * @property dateReleased дата выхода
 * @property rating возрастной рейтинг
 * @property english название на английском
 * @property japanese название на японском
 * @property synonyms синонимы
 * @property duration длительность аниме
 * @property description описание
 * @property description_html описание в HTML
 * @property description_source название источника описания
 * @property franchise название франшизы
 * @property favoured в избранном (true or false)
 * @property anons в статусе анонса (true or false)
 * @property ongoing в статусе онгоинга (true or false)
 * @property threadId номер треда
 * @property topic_id номер топика
 * @property myanimelist_id номер в списке пользователя, если есть
 * @property rates_scores_stats статистика по оценкам
 * @property rates_statuses_stats статистика по статусам
 * @property updated_at дата обновления
 * @property next_episode_at дата трансляции следующего эпизода
 * @property genres список жанров
 * @property studios список студий, работавших над аниме
 * @property videos список видео
 * @property screenshots список скриншотов из аниме
 * @property user_rate пользовательский рейтинг аниме
 */
export interface AnimeDetailsModel {
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
    studios: StudioModel[] | null,
    videos: AnimeVideoModel[] | null,
    screenshots: ScreenshotModel[] | null,
    user_rate: UserRateModel
}