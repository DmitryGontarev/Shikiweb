
import {TokenModel} from "../models/auth/TokenModel";
import {ACCESS_TOKEN, REFRESH_TOKEN} from "../../appconstants/AppKeys";

////////////////////////////////////////////////////////////////////////////////
/// Репозиторий для получения токена из локального хранилища
////////////////////////////////////////////////////////////////////////////////
/**
 * Функция для сохранения токена
 *
 * @param token данные токена
 */
export function saveToken(token: TokenModel): boolean {
    localStorage.setItem(ACCESS_TOKEN, token.accessToken)
    localStorage.setItem(REFRESH_TOKEN, token.refreshToken)
    return true
}

/**
 * Функция для получения токена
 */
export function getToken(): TokenModel {
    const access: string = localStorage.getItem(ACCESS_TOKEN) ?? '';
    const refresh: string = localStorage.getItem(REFRESH_TOKEN) ?? '';
    return {accessToken: access, refreshToken: refresh}
}

/**
 * Функция для удаления токена
 */
export function removeToken(): boolean {
    localStorage.removeItem(ACCESS_TOKEN)
    localStorage.removeItem(REFRESH_TOKEN)
    return true
}

/**
 * Функция для проверки, сохранён ли токен в память
 */
export function isTokenExist(): boolean {
    const access: string = localStorage.getItem(ACCESS_TOKEN) ?? '';
    const refresh: string = localStorage.getItem(REFRESH_TOKEN) ?? '';
    return (access != null && access != '') && (refresh != null && refresh != '')
}