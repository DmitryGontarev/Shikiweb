
/** Статус авторизации пользователя */
export enum UserAuthStatus {

    /** пользователь авторизован (уже заходил в систему) */
    AUTHORIZED = "AUTHORIZED",

    /** пользователь неавторизован */
    UNAUTHORIZED = "UNAUTHORIZED",

    /** пользователь зашёл как гость */
    GUEST = "GUEST"
}