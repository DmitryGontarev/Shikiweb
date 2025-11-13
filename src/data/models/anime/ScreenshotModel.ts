/**
 * Сущность с сылками на скриншоты из аниме
 *
 * @property [original] оригинальный размер
 * @property [preview] размер для превью
 */
export interface ScreenshotModel {
    original: string | null,
    preview: string | null
}