/**
 * Модель данных со ссылками на ресурс произведения
 *
 * @param id id ссылки
 * @param name название ресурса (например myanimelist, wikipedia)
 * @param url ссылка на ресурс
 */
export interface LinkModel {
    id: number | null,
    name: string | null,
    url: string | null
}