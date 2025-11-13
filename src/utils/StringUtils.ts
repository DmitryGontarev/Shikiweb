import {SHIKIMORI_BASE_URL} from "../appconstants/BaseUrl";

/**
 * Добавляет адрес хоста к ссылке, если его нет
 *
 * @param str строка со ссылкой на картинку
 * @param baseUrl базовый адрес сервера
 */
export function appendHost(str: string | null | undefined, baseUrl: string = SHIKIMORI_BASE_URL): string {
    if (str != null) {
        if (str.includes("http")) {
            return str
        } else {
            return baseUrl + str
        }
    } else {
        return ''
    }
}

export function deleteM3u8({url}: {url: string | null | undefined}): string {
    if (url?.includes('m3u8')) {
        return url?.replace(':hls:manifest.m3u8', '')
    }
    if (url?.isNotEmpty())
    {
        return url
    }
    return ''
}

/**
 * Возвращает одну из строк или пустую строку, если обе [null]
 *
 * @param str1 первая строка
 * @param str2 вторая строка
 */
export function getEmptyIfBothNull(
    {str1, str2}:
    { str1: string | null | undefined, str2: string | null | undefined }
): string {
    if (str1 != null && str1 != '') {
        return str1
    }
    if (str2 != null && str2 != '') {
        return str2
    }
    return ''
}

/**
 * Возвращает [true], если часть первой строки совпадает со второй
 *
 * @param string1 первая строка
 * @param string2 вторая строка
 */
export function containsIgnoreCase({string1, string2}: {string1 : string | null | undefined, string2 : string | null | undefined}): boolean {
    return string1?.toLowerCase().includes(string2?.toLowerCase() ?? '') == true
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/** ВНИМАНИЕ (!) чтобы работало, в используемом файле добавить require("../../utils/StringUtils"); */
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Объявление функций расширений для типа [String] аналога функций из Kotlin
 */
declare global {
    interface String {

        /**
         * Аналог orEmpty() из Kotlin
         *
         * возвращает пустую строку, если строка пустая
         */
        orEmpty(this: String | null | undefined): string

        /**
         * Аналог isNullOrEmpty() из Kotlin
         *
         * возвращает true, если строка null или пустая, в противном случае false
         */
        isNullOrEmpty(this: String | null | undefined): boolean

        /**
         * Аналог isEmpty() из Котлин
         *
         * возвращает true, если список пустой
         */
        isEmpty(this: String | null | undefined): boolean;

        /**
         * Аналог isNotEmpty() из Котлин
         *
         * возвращает true, если список пустой
         */
        isNotEmpty(this: String | null | undefined): boolean;
    }
}

String.prototype.orEmpty = function (this): string {
    if (this === null || this === undefined) {
        return ''
    }
    return this.toString()
}

String.prototype.isNullOrEmpty = function (this): boolean {
    return this === null || this === ''
}

String.prototype.isEmpty = function (this) {
    return this == ''
}

String.prototype.isNotEmpty = function (this) {
    return this != null && this != ''
}