
/**
 * Сущность с данными пользователя
 *
 * @property id id пользователя
 * @property nickname ник пользователя
 * @property avatar ссылка на аватар пользователя
 * @property image ссылки на разные размеры аватара
 * @property last_online_at дата, когда пользователь был последний раз онлайн
 * @property name имя пользователя
 * @property sex пол пользователя
 * @property website ссылка на сайт, который указал пользователь
 * @property birth_on день рождения пользователя
 * @property locale регион пользователя (ru)
 */
export interface UserBriefModel {
    id: number | null,
    nickname: string | null,
    avatar: string | null,
    image: UserImageModel | null,
    last_online_at: string | null,
    name: string | null,
    sex: string | null,
    website: string | null,
    birth_on: string | null,
    locale: string | null
}

/**
 * Сущность картинки страницы пользователя
 *
 * @property x160 картинка 160 пикселей
 * @property x148 картинка 160 пикселей
 * @property x80 картинка 80 пикселей
 * @property x64 картинка 64 пикселей
 * @property x48 картинка 48 пикселей
 * @property x32 картинка 32 пикселей
 * @property x16 картинка 16 пикселей
 */
export interface UserImageModel {
    x160: string | null,
    x148: string | null,
    x80: string | null,
    x64: string | null,
    x48: string | null,
    x32: string | null,
    x16: string | null
}