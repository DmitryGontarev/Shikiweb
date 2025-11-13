/**
 * Функция для печати логов
 *
 * @param value объект для вывода в лог
 */
export function consolePrint(value: any) {
    console.log(value)
}

/**
 * Функция для установки задержки выполнения
 *
 * @param delay время задержки в миллисекундах
 */
export async function delay({delay} : {delay: number}) {
    return new Promise( res => setTimeout(res, delay) );
}

/**
 * Функция для преобразования цвет из HEX в RGBA
 */
export function hexToRgbWithAlpha({hex, alpha = null}: {hex: string, alpha?: number | null}): string {

    const isValidHex = ({hexValue}: {hexValue: string}) => /^#([A-Fa-f0-9]{3,4}){1,2}$/.test(hexValue)

    if (!isValidHex({hexValue: hex})) {
        return "transparent"
    }

    hex = hex.replace('#', '');

    let r;
    let g;
    let b;

    if (hex.length == 8) {
        r = parseInt(hex.slice(0, 2), 16);
        g = parseInt(hex.slice(2, 4), 16);
        b = parseInt(hex.slice(4, 6), 16);
    } else {
        r = parseInt(hex.length == 3 ? hex.slice(0, 1).repeat(2) : hex.slice(0, 2), 16);
        g = parseInt(hex.length == 3 ? hex.slice(1, 2).repeat(2) : hex.slice(2, 4), 16);
        b = parseInt(hex.length == 3 ? hex.slice(2, 3).repeat(2) : hex.slice(4, 6), 16);
    }

    if (alpha != null && (alpha >= 0 && alpha <= 1)) {
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    return `rgb(${r}, ${g}, ${b})`;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/** ВНИМАНИЕ (!) чтобы работало, в используемом файле добавить require("../../utils/CommonUtils"); */
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/** Функции области видимости аналоги таких же из Kotlin */
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Объявление функций расширений для типа [Object] аналога функций из Kotlin
 */
declare global {

    /**
     * Интерфейс для типа [Object], который описывает любой непримитивный тип
     */
    interface Object {

        /**
         * Аналог let{} из Kotlin
         * контекстный объект доступен в качестве аргумента. Возвращаемое значение - результат выполнения лямбды
         *
         * @param callback обратный вызов с объектом типа
         */
        let<T, R>(this: T | null | undefined, callback: (it: T) => R): R;

        /**
         * Аналог also{} из Kotlin
         * выбрасывает коллбэк с текущим объектом для применения к нему изменений, и возвращает этот объект
         *
         * @param callback обратный вызов с объектом типа
         */
        also<T>(this: T | null | undefined, callback: (it: T) => void): T;

        /**
         * Аналог run{} из Kotlin
         * контекстный объект доступен в качестве получателя (this). Возвращаемое значение - результат выполнения лямбды
         * run удобен, когда лямбда содержит и инициализацию объекта, и вычисление возвращаемого значения
         *
         * @param callback обратный вызов с объектом типа
         */
        run<T, R>(this: T | null | undefined, callback: (this: T) => R): R;

        /**
         * Аналог apply{} из Kotlin
         * выбрасывает контекстный объект для применения изменений, и возвращает изменённый объект
         *
         * @param callback обратный вызов с объектом типа
         */
        apply<T>(this: T | null | undefined, callback: (this: T) => void): T;

        /**
         * Аналог takeIf{} из Kotlin
         *
         * выбрасывает контекстный объект для применения условия, и возвращает его в случае соответствия условию
         * @param predicate коллбэк с возвратом объекта для проверки соответствия условию
         */
        takeIf<T>(this: T | null | undefined, predicate: (it: T) => boolean): T | undefined;

        /**
         * Аналог isEmpty() из Котлин
         *
         * возвращает true, если список пустой
         */
        isEmpty<T>(this: T[] | null | undefined): boolean;

        /**
         * Аналог isNotEmpty() из Котлин
         *
         * возвращает true, если список не пустой
         */
        isNotEmpty<T>(this: T[] | null | undefined): boolean;
    }
}

Object.prototype.let = function(this, block) {
    return block(this!);
}

Object.prototype.also = function(this, block) {
    block(this!);
    return this!;
}

Object.prototype.run = function(this, block) {
    return block.call(this!);
}

Object.prototype.apply = function(this, block) {
    block.call(this!);
    return this!;
}

Object.prototype.takeIf = function(this, predicate) {
    return predicate(this!) ? this! : undefined;
}

Object.prototype.isEmpty = function(this) {
    return this?.length == 0
}

Object.prototype.isNotEmpty = function(this) {
    return (this?.length ?? 0) > 0
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Так как в TypeScript примитивы не принадлежат типу Object, для них добавлены отдельные интерфейсы
 */
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Объявление функций расширений для типа [Number] аналога функций из Kotlin
 */
declare global {
    interface Number {

        /**
         * Аналог let{} из Kotlin
         * контекстный объект доступен в качестве аргумента. Возвращаемое значение - результат выполнения лямбды
         *
         * @param callback обратный вызов с объектом типа
         */
        let<R>(this: Number | null | undefined, callback: (it: number) => R): R;


        /**
         * Аналог also{} из Kotlin
         * выбрасывает коллбэк с текущим объектом для применения к нему изменений, и возвращает этот объект
         *
         * @param callback обратный вызов с объектом типа
         */
        also(this: Number | null | undefined, callback: (it: number) => void): number;

        /**
         * Аналог run{} из Kotlin
         * контекстный объект доступен в качестве получателя (this). Возвращаемое значение - результат выполнения лямбды
         * run удобен, когда лямбда содержит и инициализацию объекта, и вычисление возвращаемого значения
         *
         * @param callback обратный вызов с объектом типа
         */
        run<R>(this: Number | null | undefined, callback: (this: number) => R): R;

        /**
         * Аналог apply{} из Kotlin
         * выбрасывает контекстный объект для применения изменений, и возвращает изменённый объект
         *
         * @param callback обратный вызов с объектом типа
         */
        apply(this: Number | null | undefined, callback: (this: number) => void): number;

        /**
         * Аналог takeIf{} из Kotlin
         *
         * выбрасывает контекстный объект для применения условия, и возвращает его в случае соответствия условию
         * @param predicate коллбэк с возвратом объекта для проверки соответствия условию
         */
        takeIf(this: Number | null | undefined, predicate: (it: number) => boolean): number | undefined;
    }
}

Number.prototype.let = function(this, block) {
    return block(this!.valueOf());
}

Number.prototype.also = function(this, block) {
    block(this!.valueOf());
    return this!.valueOf();
}

Number.prototype.run = function(this, block) {
    return block.call(this!.valueOf());
}

Number.prototype.apply = function(this, block) {
    block.call(this!.valueOf());
    return this!.valueOf();
}

Number.prototype.takeIf = function(this, predicate) {
    return predicate(this!.valueOf()) ? this!.valueOf() : undefined;
}

/**
 * Объявление функций расширений для типа [String] аналога функций из Kotlin
 */
declare global {
    interface String {

        /**
         * Аналог let{} из Kotlin
         * контекстный объект доступен в качестве аргумента. Возвращаемое значение - результат выполнения лямбды
         *
         * @param callback обратный вызов с объектом типа
         */
        let<R>(this: String | null | undefined, callback: (it: string) => R): R;

        /**
         * Аналог also{} из Kotlin
         * выбрасывает коллбэк с текущим объектом для применения к нему изменений, и возвращает этот объект
         *
         * @param callback обратный вызов с объектом типа
         */
        also(this: String | null | undefined, callback: (it: string) => void): string;

        /**
         * Аналог run{} из Kotlin
         * контекстный объект доступен в качестве получателя (this). Возвращаемое значение - результат выполнения лямбды
         * run удобен, когда лямбда содержит и инициализацию объекта, и вычисление возвращаемого значения
         *
         * @param callback обратный вызов с объектом типа
         */
        run<R>(this: String | null | undefined, callback: (this: string) => R): R;

        /**
         * Аналог apply{} из Kotlin
         * выбрасывает контекстный объект для применения изменений, и возвращает изменённый объект
         *
         * @param callback обратный вызов с объектом типа
         */
        apply(this: String | null | undefined, callback: (this: string) => void): string;

        /**
         * Аналог takeIf{} из Kotlin
         *
         * выбрасывает контекстный объект для применения условия, и возвращает его в случае соответствия условию
         * @param predicate коллбэк с возвратом объекта для проверки соответствия условию
         */
        takeIf(this: String | null | undefined, predicate: (it: string) => boolean): string | undefined;
    }
}

String.prototype.let = function(this, block) {
    return block(this!.valueOf());
}

String.prototype.also = function(this, block) {
    block(this!.valueOf());
    return this!.valueOf();
}

String.prototype.run = function(this, block) {
    return block.call(this!.valueOf());
}

String.prototype.apply = function(this, block) {
    block.call(this!.valueOf());
    return this!.valueOf();
}

String.prototype.takeIf = function(this, predicate) {
    return predicate(this!.valueOf()) ? this!.valueOf() : undefined;
}

/**
 * Объявление функций расширений для типа [Boolean] аналога функций из Kotlin
 */
declare global {
    interface Boolean {

        /**
         * Аналог let{} из Kotlin
         * контекстный объект доступен в качестве аргумента. Возвращаемое значение - результат выполнения лямбды
         *
         * @param callback обратный вызов с объектом типа
         */
        let<R>(this: Boolean | null | undefined, callback: (it: boolean) => R): R;

        /**
         * Аналог also{} из Kotlin
         * выбрасывает коллбэк с текущим объектом для применения к нему изменений, и возвращает этот объект
         *
         * @param callback обратный вызов с объектом типа
         */
        also(this: Boolean | null | undefined, callback: (it: boolean) => void): boolean;

        /**
         * Аналог run{} из Kotlin
         * контекстный объект доступен в качестве получателя (this). Возвращаемое значение - результат выполнения лямбды
         * run удобен, когда лямбда содержит и инициализацию объекта, и вычисление возвращаемого значения
         *
         * @param callback обратный вызов с объектом типа
         */
        run<R>(this: Boolean | null | undefined, callback: (this: boolean) => R): R;

        /**
         * Аналог apply{} из Kotlin
         * выбрасывает контекстный объект для применения изменений, и возвращает изменённый объект
         *
         * @param callback обратный вызов с объектом типа
         */
        apply(this: Boolean | null | undefined, callback: (this: boolean) => void): boolean;

        /**
         * Аналог takeIf{} из Kotlin
         *
         * выбрасывает контекстный объект для применения условия, и возвращает его в случае соответствия условию
         * @param predicate коллбэк с возвратом объекта для проверки соответствия условию
         */
        takeIf(this: Boolean | null | undefined, predicate?: (it: boolean) => boolean): boolean | undefined;
    }
}

Boolean.prototype.let = function(this, block) {
    return block(this!.valueOf());
}

Boolean.prototype.also = function(this, block) {
    block(this!.valueOf());
    return this!.valueOf();
}

Boolean.prototype.run = function(this, block) {
    return block.call(this!.valueOf());
}

Boolean.prototype.apply = function(this, block) {
    block.call(this!.valueOf());
    return this!.valueOf();
}

Boolean.prototype.takeIf = function(this, predicate) {
    return predicate && predicate(this!.valueOf()) || this!.valueOf() ? this!.valueOf() : undefined;
}