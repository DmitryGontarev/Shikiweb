import {AnimeModel} from "../anime/AnimeModel";
import {MangaModel} from "../manga/MangaModel";

/**
 * Сущность с информацией о аниме/манге связанных с текущим
 *
 * @property relation названия типа связи (например Адаптация)
 * @property relationRu названия связи на русском
 * @property anime связанное аниме, если есть
 * @property manga связанная манга, если есть
 */
export interface RelatedModel {
    relation: string | null,
    relation_russian: string | null,
    anime: AnimeModel | null,
    manga: MangaModel | null
}