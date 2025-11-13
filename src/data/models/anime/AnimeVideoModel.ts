/**
 * Сущность с информацией о видеоматериалах к аниме
 *
 * @property id номер в списке
 * @property url ссылка на видео
 * @property image_url ссылка на картинку превью
 * @property player_url ссылка на плеер
 * @property name название видео
 * @property type тип видео
 * @property hosting название видеохостинга
 */
export interface AnimeVideoModel {
    id: number | null,
    url: string | null,
    image_url: string | null,
    player_url: string | null,
    name: string | null,
    kind: string | null,
    hosting: string | null
}