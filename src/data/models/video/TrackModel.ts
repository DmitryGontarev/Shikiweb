
/**
 * Сущность с информацией о качестве видео
 *
 * @param quality разрешение видеофайла
 * @param url ссылка на видеофайл
 */
export interface TrackModel {
    quality: string | null,
    url: string | null
}