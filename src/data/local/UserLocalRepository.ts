import {USER_ID, USER_STATUS} from "../../appconstants/SettingsExtras";
import {UserAuthStatus} from "../models/user/UserAuthStatus";


/**
 * Функция для сохранения ID пользователя
 *
 * @param userId идентификационный номер пользователя
 */
export function setUserId({userId}: {userId: string}): boolean {
    localStorage.setItem(USER_ID, userId)
    return true
}

/**
 * Функция для получения ID пользователя
 */
export function getUserId(): string | null {
    return localStorage.getItem(USER_ID)
}

/**
 * Функция для сохранения статуса авторизации пользователя
 *
 * @param userAuthStatus статус авторизации
 */
export function setUserAuthStatus({userAuthStatus}: {userAuthStatus: UserAuthStatus}) {
    localStorage.setItem(USER_STATUS, userAuthStatus)
}

/**
 * Функция для получения статуса авторизации пользователя
 */
export function getUserAuthStatus(): UserAuthStatus | null {
    const status = localStorage.getItem(USER_STATUS)

    if (status == UserAuthStatus.AUTHORIZED) {
        return UserAuthStatus.AUTHORIZED
    }

    if (status == UserAuthStatus.UNAUTHORIZED) {
        return UserAuthStatus.UNAUTHORIZED
    }

    if (status == UserAuthStatus.GUEST) {
        return UserAuthStatus.GUEST
    }

    return null
}

/**
 * Функция для удаления пользовательских данных из хранилища
 */
export function clearUser(): boolean {
    localStorage.removeItem(USER_STATUS)
    localStorage.removeItem(USER_ID)
    return true
}