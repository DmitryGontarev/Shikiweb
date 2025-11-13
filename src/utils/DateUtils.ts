////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/** ВНИМАНИЕ (!) чтобы работало, в используемом файле добавить require("../../utils/DateUtils"); */
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const yyyy_MM_dd = 'yyyy/MM/dd';
export const yyyy_MM_dd_HH_mm_ss = 'yyyy/MM/dd HH:mm:ss';
export const HH_mm = 'HH:mm';
export const DD_MM_YYYY = "dd.MM.yyyy";
export const EEEE_D_MMMM = 'EEEE, d MMMM';

/** Возвращает текущее время устройства */
export function getCurrentTime(): number {
    return Date.now()
}

/**
 * Возвращает строку из даты по шаблону
 *
 * @param date дата
 * @param pattern шаблон вида строки
 */
function getDateStringByPattern({date, pattern}: { date: Date, pattern: string }): string | null {
    switch (pattern) {
        case (yyyy_MM_dd):
            return `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`
        case(HH_mm):
            return `${getHoursString(date.getHours())}:${getMinutesString(date.getMinutes())}`
        case(DD_MM_YYYY):
            return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`
        case(yyyy_MM_dd_HH_mm_ss):
            return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        default:
            return null
    }
}

/**
 * Возвращает строку для показа часов
 *
 * @param hours количество часов
 */
function getHoursString(hours: number | null | undefined): string {
    if (hours != null) {
        if (hours < 10) {
            return `0${hours}`
        } else {
            return `${hours}`
        }
    }
    return ""
}

/**
 * Возвращает строку для показа минут
 *
 * @param minutes количество минут
 */
function getMinutesString(minutes: number | null | undefined): string {
    if (minutes != null) {
        if (minutes < 10) {
            return `0${minutes}`
        } else {
            return `${minutes}`
        }
    }
    return ""
}

/**
 * Метод возвращает строку вида "22 мин" / "7 ч 15 мин" / "7 дней"
 * количество времени от текущей до будущей даты
 *
 * @param date дата
 */
function getDateBeforeCurrent(date: number): string {

    let dateString: string = ''

    // текущая дата
    const currentDate = Date.now()

    // разница в миллисекундах между датами
    const difference = date - currentDate

    // переводим в секунды поделив на 1000 (в одной секунде 1000 миллисекунд)
    const allSeconds = Math.floor(difference / 1000)

    // переводим секунды в минуты
    const minutes = Math.floor(allSeconds / 60)

    // переводим минуты в часы
    const hours = Math.floor(minutes / 60)

    // переводим часы в дни
    const days = Math.floor(hours / 24)

    if (days >= 1) {
        dateString = `${days} ${getDayEndingString(days)}`
    }

    if (days < 1 && hours >= 1) {
        dateString = `${hours} ч ${minutes - hours * 60} мин`;
    }

    if (days < 1 && hours < 1) {
        dateString = `${minutes} мин`;
    }

    return dateString
}

/** Метод возвращает строку с годом выхода */
export function getYearString({dateString}: {dateString: string | null | undefined}) {
    let yearString = ''
    const date = dateString?.dateFromString()
    if (date != null) {
        const year = new Date(date).getFullYear()
        yearString = `${year}`
    }
    return yearString
}

/**
 * Метод возвращает строку для подстановки к количеству дней
 *
 * @param days количество дней
 */
function getDayEndingString(days: number): string {

    if (Math.floor(days % 10) == 1 && Math.floor(days % 100) != 11) {
        return "день";
    }

    if ((Math.floor(days % 10) >= 2 && Math.floor(days % 10) <= 4) && (days < 11 || days > 14)) {
        return "дня";
    }

    return "дней";
}

/**
 * Метод возвращает строку вида "17 сен 2022" / "17 сен - 20 окт 2022" / "17 сен 2022 - 20 окт 2023",
 * если переданы две даты
 *
 * @param dateStart дата начала периода
 * @param dateEnd дата конца периода
 * @param isNextLine переносить ли на следующую строку
 */
export function getDatePeriodString({
    dateStart,
    dateEnd,
    isNextLine = false
}: { dateStart: string | null, dateEnd?: string | null, isNextLine?: boolean }): string {

    let periodList: String[] = []

    const calendarDateStart = dateStart?.dateFromString()

    const calendarDateEnd = dateEnd?.dateFromString()

    calendarDateStart?.let((dStart: number) => {
        const date = new Date(dStart)
        const monthOfYear = date.getMonth()

        const day = date.getDate()
        const month = toMonthName({value: dStart, infinitive: monthOfYear != 3}).slice(0, 3)
        const year = date.getFullYear()

        periodList.push(`${day}`)
        periodList.push(` ${month}`)
        periodList.push(` ${year}`)
    })

    calendarDateEnd?.let((dEnd: number) => {
        const date = new Date(dEnd)
        const monthOfYear = date.getMonth()

        const day = date.getDate()
        const month = toMonthName({value: dEnd, infinitive: monthOfYear != 3}).slice(0, 3)
        const year = date.getFullYear()

        periodList.map((value: String, index: number) => {
            if (value == ` ${year}`) {
                periodList.splice(index, 1)
            }
        })

        if (isNextLine) {
            periodList.push(` -\n`)
            periodList.push(`${day}`)
        } else {
            periodList.push(` -`)
            periodList.push(` ${day}`)
        }
        periodList.push(` ${month}`)
        periodList.push(` ${year}`)
    })

    return periodList.join('')
}

/**
 * Функция форматирования даты по шаблону из строки
 *
 * @param value дата в виде числа
 * @param pattern шаблон строки
 */
export function formatDateString({
    value,
    pattern = DD_MM_YYYY
}: {
    value: string | null | undefined,
    pattern?: string }
): string | null {
    if (value != null) {
        const dateNumber = Date.parse(value)
        const date = new Date(dateNumber)
        return getDateStringByPattern({date: date, pattern: pattern})
    }
    return null;
}

/**
 * Функция форматирования даты по шаблону из строки
 *
 * @param value дата в виде числа
 * @param pattern шаблон строки
 */
export function formatDateNumber({
    value,
    pattern = DD_MM_YYYY
}: {
    value: number | null | undefined,
    pattern?: string }
): string | null {
    if (value != null) {
        const date = new Date(value)
        return getDateStringByPattern({date: date, pattern: pattern})
    }
    return null;
}

/**
 * Возвращает строку с названием месяца
 *
 * @param value дата
 * @param infinitive флаг подстановки названия месяца в инфинитиве
 */
export function toMonthName({
                                value,
                                infinitive = true
                            }: { value: number | null | undefined, infinitive: boolean }): string {
    if (value != null) {
        const month = new Date(value).getMonth()
        switch (month) {
            case 0 :
                return infinitive ? "январь" : "января";
            case 1 :
                return infinitive ? "февраль" : "февраля";
            case 2 :
                return infinitive ? "марта" : "марта";
            case 3 :
                return infinitive ? "апрель" : "апреля";
            case 4 :
                return infinitive ? "май" : "мая";
            case 5 :
                return infinitive ? "июнь" : "июня";
            case 6 :
                return infinitive ? "июль" : "июля";
            case 7 :
                return infinitive ? "август" : "августа";
            case 8 :
                return infinitive ? "сентябрь" : "сентября";
            case 9 :
                return infinitive ? "октябрь" : "октября";
            case 10 :
                return infinitive ? "ноябрь" : "ноября";
            case 11 :
                return infinitive ? "декабрь" : "декабря";
            default:
                return " ";
        }
    }
    return ''
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/** Функции расширения для работы с датой в виде строки */
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
declare global {
    interface String {

        /** функция перевода строки в дату в виде миллисекунд */
        dateFromString(this: string | null | undefined): number | null;

        /** функция форматирования даты по шаблону из строки */
        formatDate(this: string | null | undefined, pattern: string): string | null;

        /** функция получения строки с количеством дней до указанной даты */
        getDateBeforeCurrent(this: string | null | undefined): string | null
    }
}

String.prototype.dateFromString = function (this) {
    if (this != null && this != '') {
        return Date.parse(this)
    }
    return null;
}

String.prototype.formatDate = function (this, pattern: string = DD_MM_YYYY) {
    if (this != null) {
        const dateNumber = Date.parse(this)
        const date = new Date(dateNumber)
        return getDateStringByPattern({date: date, pattern: pattern})
    }
    return null;
}

String.prototype.getDateBeforeCurrent = function () {
    if (this != null) {
        const dateNumber = Date.parse(this)
        return getDateBeforeCurrent(dateNumber)
    }
    return null
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/** Функции расширения для работы с датой в виде числа миллисекунд */
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
declare global {

    interface Number {

        /** функция перевода даты на начало дня */
        dateToStartDay(this: number): number;

        /** функция форматирования даты по шаблону из строки */
        formatDate(this: number | null | undefined, pattern: string): string | null;

        /** функция возвращающая строку с названием дня недели */
        toDayName(this: number | null | undefined): string;

        /** функция возвращающая строку с номером дня месяцы */
        toDayNumber(this: number | null | undefined): number;
    }
}

Number.prototype.dateToStartDay = function (this) {
    return new Date(new Date(this)).setHours(0, 0, 0, 0)
}

Number.prototype.formatDate = function (this, pattern: string = DD_MM_YYYY) {
    if (this != null) {
        const date = new Date(this)
        return getDateStringByPattern({date: date, pattern: pattern})
    }
    return null;
}

Number.prototype.toDayName = function (this) {
    if (this != null) {
        const day = new Date(this).getDay()
        switch (day) {
            case 1 :
                return "Понедельник";
            case 2 :
                return "Вторник";
            case 3 :
                return "Среда";
            case 4 :
                return "Четверг";
            case 5 :
                return "Пятница";
            case 6 :
                return "Суббота";
            case 0 :
                return "Воскресенье";
            default:
                return " ";
        }
    }
    return '';
}

Number.prototype.toDayNumber = function (this) {
    if (this != null) {
        return new Date(this).getDate()
    }
    return 0;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/** Функции расширения для работы с датой в виде класса Date */
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
declare global {

    interface Date {

        /** функция перевода даты на начало дня */
        dateToStartDay(this: Date): Date;

        /** функция форматирования даты по шаблону из строки */
        formatDate(this: Date | null | undefined, pattern: string): string | null;
    }
}

Date.prototype.dateToStartDay = function (this) {
    const date = new Date(new Date(this)).setHours(0, 0, 0, 0);
    return new Date(date)
}

Date.prototype.formatDate = function (this, pattern: string = DD_MM_YYYY) {
    if (this != null) {
        const date = new Date(this)
        return getDateStringByPattern({date: date, pattern: pattern})
    }
    return null;
}