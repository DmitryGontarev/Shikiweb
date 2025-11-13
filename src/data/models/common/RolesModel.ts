import {CharacterModel} from "../roles/CharacterModel";
import {PersonModel} from "../roles/PersonModel";

/**
 * Сущность с информацией о роли принимавшего участие в создании аниме
 *
 * @property roles список с названием ролей
 * @property roles_russian список с названием ролей на руссколм
 * @property character информация о персонаже
 * @property person информация о персоне
 */
export interface RolesModel {
    roles: string[] | null,
    roles_russian: string[] | null,
    character: CharacterModel | null,
    person: PersonModel | null
}