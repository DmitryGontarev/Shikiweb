
/**
 * Сущность данных со ссылками на картинки
 *
 * @property original ссылка на оригинальный размер картинки
 * @property preview ссылка на картинку для превью
 * @property x96 ссылка на картинку размером 96 пикселей
 * @property x48 ссылка на картинку размером 48 пикселей
 */
export interface ImageModel {
    original: string | null,
    preview: string | null,
    x96: string | null,
    x48: string | null
}