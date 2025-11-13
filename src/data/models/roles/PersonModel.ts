import {ImageModel} from "../common/ImageModel";

/**
 * Сущность с информацией о человеке, принимавшем участиве в создании аниме
 *
 * @property id номер
 * @property name имя
 * @property russian имя на русском
 * @property image ссылки на фото
 * @property url ссылка
 */
export interface PersonModel {
    id: number | null,
    name: string | null,
    russian: string | null,
    image: ImageModel | null,
    url: string | null
}