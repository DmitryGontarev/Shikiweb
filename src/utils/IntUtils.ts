
/**
 * Возвращает [true], если число больше переданного
 */
export function isMoreThan(value: number | null | undefined, number: number) {
    let flag: boolean = false
    if (value != null) {
        flag = value > number
    }
    return flag
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/** ВНИМАНИЕ (!) чтобы работало, в используемом файле добавить require("../../utils/IntUtils"); */
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Функция расширение для сравнения чисел
 * возвращает [true], если число больше переданного
 */
declare global {


    interface Number {

        /**
         * Возвращает [true], если число больше переданного
         */
        isMoreThan(this: Number | null | undefined, value: number): boolean

        /**
         * Возвращает строку со временем в виде "1 ч 22 мин"
         */
        toEpisodeTime(this: Number | null | undefined): string

        /**
         * Возвращает строку вида 07:57 или 01:07:57
         * передавать время в секундах
         */
        toVideoTime(this: Number | null | undefined): string
    }
}

Number.prototype.isMoreThan = function (this, value): boolean {
    let flag: boolean = false
    if (this != null && this != undefined) {
        flag = this > value
    }
    return flag
}

Number.prototype.toEpisodeTime = function (this): string {
    if (this != null) {
        const hours = Math.floor(Number(this) / 60)
        const minutes = Math.floor(Number(this) / 60)
        if (this < 0) {
            return ''
        } else {
            if (hours >= 1) {
                return `${hours} ч ${minutes} мин`
            } else {
                return `${this} мин`
            }
        }
    }
    return ''
}

Number.prototype.toVideoTime = function (this): string {
    let videoTime = ''

    // узнаём, есть ли часы (делим общее время в секундах на 60 секунд * 60 минут)
    const hours = Math.floor(Number(this) / 3600);

    if (hours >= 1) {
        // находим остаток минут и секунд, отнимая количество часов
        const timeWithoutHours = Number(this) - hours * 3600

        // находим минуты
        // делим оставшиеся секунды на 60
        const minutes = Math.floor(timeWithoutHours / 60)

        // находим секунды
        const seconds = Math.floor((timeWithoutHours - minutes * 60) % 60)

        const hourStr = hours < 10 ? `0${hours}` : `${hours}`;

        const minuteStr = minutes < 10 ? `0${minutes}` : `${minutes}`;

        const secondStr = seconds < 10 ? `0${seconds}` : `${seconds}`;

        videoTime = `${hourStr}:${minuteStr}:${secondStr}`;
    } else {
        // находим минуты
        // делим оставшиеся секунды на 60
        const minutes = Math.floor(Number(this) / 60)

        // находим секунды
        const seconds = Math.floor(Number(this) % 60)

        const minuteStr = minutes < 10 ? `0${minutes}` : `${minutes}`;

        const secondStr = seconds < 10 ? `0${seconds}` : `${seconds}`;

        videoTime = `${minuteStr}:${secondStr}`;
    }

    return videoTime
}