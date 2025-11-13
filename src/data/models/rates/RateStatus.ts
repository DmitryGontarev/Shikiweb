
/**
 * Тип статуса в котором находится аниме или манга/ранобэ
 */
export enum RateStatus {

    /**
     * Смотрю
     */
    WATCHING = "watching",

    /**
     * Запланировано
     */
    PLANNED = "planned",

    /**
     * Пересматриваю
     */
    REWATCHING = "rewatching",

    /**
     * Просмотрено
     */
    COMPLETED = "completed",

    /**
     * Отложено
     */
    ON_HOLD = "on_hold",

    /**
     * Брошено
     */
    DROPPED = "dropped",

    /**
     * Неизвестный статус (если придёт что-то не из списка)
     */
    UNKNOWN = ''
}