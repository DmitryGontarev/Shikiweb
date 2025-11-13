
/**
 * Модель данных с информацией об эпизоде аниме
 *
 * @param id идентификационный номер
 * @param index порядковый номер
 * @param animeId идентификационный номер аниме с сайта MyAnimeList
 */
export interface ShimoriVideoModel {
    id: number | null,
    index: number | null,
    animeId: number | null
}