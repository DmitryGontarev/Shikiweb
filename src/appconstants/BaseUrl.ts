
///////////////////////////////////////////////////////////////////////////
/** URL-адресы сайта */
///////////////////////////////////////////////////////////////////////////

/** Базовый URL-адрес сайта Shikimori */
export const SHIKIMORI_BASE_URL: string = "https://shikimori.one/"

/** Базовый URL-адрес сайта Shikimori для загрузки картинок */
export const SHIKIMORI_IMAGE_URL: string = "https://kawai.shikimori.one/"

/** Базовый URL-адрес для просмотра видео */
export const VIDEO_BASE_URL: string = "https://us-central1-shikimori-fbf37.cloudfunctions.net/"

/** Второй базовый URL-адрес для просмотра видео */
export const SHIMORI_VIDEO_URL: string = "https://shimori-us.herokuapp.com/"

/** Третий базовый URL-адрес для просмотра видео */
export const SHIKIMORI_VIDEO_URL: string = "https://play.shikimori.org"

///////////////////////////////////////////////////////////////////////////
// Адресы и токены приложения
///////////////////////////////////////////////////////////////////////////

/** Стандартное URI сайта Shikimori для перенаправления */
export const REDIRECT_URI: string = "urn:ietf:wg:oauth:2.0:oob"

/** Секретный ID приложения (клиента) */
export const CLIENT_ID: string = "t_wuix2_x_4PypSGg5aH2qM1qqWRJWQnWWOag3EyGtY"

/** Секретный ключ приложения (клиента) */
export const CLIENT_SECRET: string = "4NtXSjFbNQyx9oYE5orO24IzM_rx_9iWNLvn5CtLjMQ"

/** URL-адрес для запроса авторизации на сайте */
export const AUTH_URL: string =
    `${SHIKIMORI_BASE_URL}oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=user_rates+comments+topics`