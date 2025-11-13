
/**
 * Параметры, по которым нужно получить список аниме
 */
export enum AnimeSearchType {

    /**
     * по id
     */
    ID = "id",

    /**
     * по убыванию id
     */
    ID_DESC = "id_desc",

    /**
     * ранжировать
     */
    RANKED = "ranked",

    /**
     * по типу (tv, movie, ova, ona, special, music, tv_13, tv_24, tv_48)
     */
    KIND = "kind",

    /**
     * по популярности
     */
    POPULARITY = "popularity",

    /**
     * по порядку алфавита
     */
    NAME = "name",

    /**
     * по дате релиза
     */
    AIRED_ON = "aired_on",

    /**
     * по количеству эпизодов
     */
    EPISODES = "episodes",

    /**
     * по статусу выхода (anons, ongoing, released)
     */
    STATUS = "status",

    /**
     * рандомно
     */
    RANDOM = "random"
}