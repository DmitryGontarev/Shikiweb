/**
 * Сущность с информацией о персонаже
 *
 * @property id номер персонажа
 * @property name имя персонажа
 * @property russian имя персонажа на русском
 * @property image ссылки на картинки с персонажем
 * @property url ссылка на персонажа
 */
import {ImageModel} from "../common/ImageModel";

export interface CharacterModel {
    id: number | null,
    name: string | null,
    russian: string | null,
    image: ImageModel | null,
    url: string | null
}