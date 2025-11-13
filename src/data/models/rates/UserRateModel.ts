/**
 * Сущность элемента списка пользовательского рейтинга
 *
 * @property id id номер элемента
 * @property userId id номер пользователя
 * @property target_id id номер элемента списка
 * @property target_type тип произведения (Anime, Manga, Ranobe)
 * @property score оценка
 * @property status в каком статусе (watched, planned)
 * @property rewatches количество повторных просмотров
 * @property episodes количество эпизодов
 * @property volumes количестов томов
 * @property chapters количество глав
 * @property text описание
 * @property text_html описание в виде HTML
 * @property created_at дата добавления в пользовательский список
 * @property updated_at дата обновления
 */
export interface UserRateModel {
    id: number | null,
    user_id: number | null,
    target_id: number | null,
    target_type: string | null,
    score: string | null,
    status: string | null,
    rewatches: number | null,
    episodes: number | null,
    volumes: number | null,
    chapters: number | null,
    text: string | null,
    text_html: string | null,
    created_at: string | null,
    updated_at: string | null
}