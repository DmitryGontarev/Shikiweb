
/**
 * Тип связи между произведениями
 */
export enum RelationType {

    /**
     * Адаптация
     */
    ADAPTATION = "adaptation",

    /**
     * Сиквел (вторая часть)
     */
    SEQUEL = "sequel",

    /**
     * Приквел (предистория)
     */
    PREQUEL = "prequel",

    /**
     * Короткий пересказ
     */
    SUMMARY = "summary",

    /**
     * Полная история
     */
    FULL_STORY = "full_story",

    /**
     * Стороння история
     */
    SIDE_STORY = "side_story",

    /**
     * Основная история
     */
    PARENT_STORY = "parent_story",

    /**
     * Альтернативный сеттинг
     */
    ALTERNATIVE_SETTING = "alternative_setting",

    /**
     * Альтернативная версия
     */
    ALTERNATIVE_VERSION = "alternative_version",

    /**
     * Другое
     */
    OTHER = "other",

    /**
     * Нет информации
     */
    NONE = "none",

    /**
     * неизвестный тип (если придёт что-то не из списка)
     */
    UNKNOWN = ''
}