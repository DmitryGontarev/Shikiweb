import axios, {Axios} from "axios";
import {SHIKIMORI_BASE_URL, SHIMORI_VIDEO_URL} from "../../../appconstants/BaseUrl";
import {getToken, isTokenExist} from "../../local/TokenLocalRepository";
import {HTTP_401_UNAUTHORIZED} from "../../../appconstants/HttpStatusCode";
import {NetworkConstants} from "../../../appconstants/NetworkConstants";

// Базовый хэдер для передачи названия приложения
const USER_AGENT_HEADER: string = "User-agent"

// Название приложения, зарегистрированное на сервере
const USER_AGENT_CLIENT: string = "Shikidroid"

// Хэдер для передачи токена
const ACCESS_TOKEN_HEADER: string = "Authorization"

///////////////////////////////////////////////////////////////////////////
/** Axios для всего приложения и авторизации */
///////////////////////////////////////////////////////////////////////////
const axiosBase: Axios = axios.create(
    {
        baseURL: SHIKIMORI_BASE_URL,
        headers: {
            USER_AGENT_HEADER: USER_AGENT_CLIENT
        },
        timeout: NetworkConstants.LONG_TIMEOUT
    }
)

/** Функция для получения базового Axios со всеми настройками для выполнения запросов */
function getBaseAxios(): Axios {

    if (isTokenExist()) {
        axiosBase.interceptors.request.use(
            config => {
                config.headers[ACCESS_TOKEN_HEADER] = `Bearer ${getToken().accessToken}`
                return config
            }
        )

        axiosBase.interceptors.response.use(
            response => {
                return response
            },
            async error => {
                if (error.response.status == HTTP_401_UNAUTHORIZED) {

                }
            }
        )
    }

    return axiosBase
}

/** Базовый тип ответа */
export interface BaseResponse<T> {
    data: T,
    status: number,
    statusText: string,
    request?: any
}

/**
 * Функция обобщение для получения данных с сервера
 *
 * @param url ссылка до данных на сервере
 * @param params параметры для передачи в запрос
 */
export async function getAxiosRequest<T>({url, params}: { url: string, params?: URLSearchParams }): Promise<BaseResponse<T>> {

    const response = await getBaseAxios()
        .get<T>(url, {params: params})

    return {
        data: response.data,
        status: response.status,
        statusText: response.statusText,
        request: response.request
    }
}

///////////////////////////////////////////////////////////////////////////
/** Axios для видео */
///////////////////////////////////////////////////////////////////////////
const axiosVideo: Axios = axios.create(
    {
        baseURL: SHIMORI_VIDEO_URL,
        headers: {
            USER_AGENT_HEADER: USER_AGENT_CLIENT
        },
        timeout: NetworkConstants.DEFAULT_TIMEOUT
    }
)

/** Функция для получения Axios для видео */
export async function getAxiosVideoRequest<T>({url, params}: { url: string, params?: URLSearchParams }): Promise<BaseResponse<T>> {

    const response = await axiosVideo
        .get<T>(url, {params: params})

    return {
        data: response.data,
        status: response.status,
        statusText: response.statusText,
        request: response.request
    }
}