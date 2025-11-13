/**
 * Сущность с информацией о студии аниме
 *
 * @property id номер студии
 * @property name название
 * @property filtered_name
 * @property real
 * @property image ссылка на логотип студии
 */
export interface StudioModel {
    id: number | null,
    name: string | null,
    filtered_name: string | null,
    real: boolean | null,
    image: string | null
}