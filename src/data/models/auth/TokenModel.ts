/**
 * Модель токена domain слоя
 *
 * @param accessToken ключ доступа для взаимодействия с сервером
 * @param refreshToken ключ для обновления доступа
 */
export interface TokenModel {
    accessToken: string,
    refreshToken: string
}