/**
 * Модель данных с жанрами
 *
 * @property id жанра
 * @property name название жанра
 * @property russian название жанра на рускком
 * @property type тип жанра
 */
export interface GenreModel {
    id: number | null,
    name: string | null,
    russian: string | null,
    kind:  string | null
}