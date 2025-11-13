
/**
 * Сущность с информацией типа трансляции эипозда аниме (оригинал, субтитры, озвучка)
 *
 * @param id идентификационный номер эпизода
 * @param kind тип трансляции
 * @param targetId идентификационный номер
 * @param episode порядковый номер эпизода
 * @param url ссылка на эпизод
 * @param hosting навзание хостинга
 * @param language язык трансляции
 * @param author автор загрузки
 * @param quality качество видео
 * @param episodesTotal количество эпизодов
 */
export interface ShimoriTranslationModel {
    id: number | null,
    kind: string | null,
    targetId: number | null,
    episode: number | null,
    url: string | null,
    hosting: string | null,
    language: string | null,
    author: string | null,
    quality: string | null,
    episodesTotal: string | null
}