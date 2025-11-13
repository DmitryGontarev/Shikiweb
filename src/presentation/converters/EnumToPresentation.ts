import {AiredStatus} from "../../data/models/common/AiredStatus";
import {AnonsColor, DroppedColor, OngoingColor, OnHoldColor, ReleasedColor} from "../theme/Colors";
import {AnimeType} from "../../data/models/anime/AnimeType";
import {AgeRatingType} from "../../data/models/common/AgeRatingType";
import {MangaType} from "../../data/models/manga/MangaType";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/** ВНИМАНИЕ (!) чтобы работало, в используемом файле добавить require("../converters/EnumToPresentation"); */
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

declare global {
    export interface String {

        /** Конвертация статуса выхода [AiredStatus] в строку для показа на экране */
        toAiredStatusScreenString(this: String | null | undefined): string;

        /** Конвертация статуса выхода [AiredStatus] в строку для показа на экране */
        toAiredStatusColor(this: String | null | undefined): string;

        /** Конвертация типа аниме [AnimeType] в строку для показа на экране */
        toAnimeTypeScreenString(this: String | null | undefined): string;

        /** Конвертация типа аниме [AgeRatingType] в строку для показа на экране */
        toAgeRatingTypeScreenString(this: String | null | undefined): string;

        /** Конвертация типа аниме [MangaType] в строку для показа на экране */
        toMangaTypeScreenString(this: String | null | undefined): string;
    }
}

String.prototype.toAiredStatusScreenString = function (this): string {
    switch (this?.toString()) {
        case (AiredStatus.ANONS): return "Анонс";
        case (AiredStatus.ANONS_TWO): return "Анонс";
        case (AiredStatus.ONGOING): return "Онгоинг";
        case (AiredStatus.ONGOING_TWO): return "Онгоинг";
        case (AiredStatus.RELEASED): return "Релиз";
        case (AiredStatus.RELEASED_TWO): return "Релиз";
        case (AiredStatus.LATEST): return "Недавно вышедшее";
        case (AiredStatus.PAUSED): return "Приостановлен";
        case (AiredStatus.DISCONTINUED): return "Прекращен";
        default: return '';
    }
}



String.prototype.toAiredStatusColor = function (this): string {
    switch (this?.toString()) {
        case (AiredStatus.ANONS): return AnonsColor;
        case (AiredStatus.ANONS_TWO): return AnonsColor;
        case (AiredStatus.ONGOING): return OngoingColor;
        case (AiredStatus.ONGOING_TWO): return OngoingColor;
        case (AiredStatus.RELEASED): return ReleasedColor;
        case (AiredStatus.RELEASED_TWO): return ReleasedColor;
        case (AiredStatus.PAUSED): return OnHoldColor;
        case (AiredStatus.DISCONTINUED): return DroppedColor;
        default: return "transparent";
    }
}

String.prototype.toAnimeTypeScreenString = function (this): string {
    switch (this?.toString()) {
        case (AnimeType.TV): return "TV";
        case (AnimeType.MOVIE): return "Фильм";
        case (AnimeType.SPECIAL): return "Спешл";
        case (AnimeType.MUSIC): return "Клип";
        case (AnimeType.OVA): return "OVA";
        case (AnimeType.ONA): return "ONA";
        case (AnimeType.TV_13): return "TV";
        case (AnimeType.TV_24): return "TV";
        case (AnimeType.TV_48): return "TV";
        case (AnimeType.NONE): return "";
        default: return "";
    }
}

String.prototype.toAgeRatingTypeScreenString = function (this): string {
    switch (this?.toString()) {
        case (AgeRatingType.G): return "0+";
        case (AgeRatingType.PG): return "7+";
        case (AgeRatingType.PG_13): return "13+";
        case (AgeRatingType.R): return "17+";
        case (AgeRatingType.R_PLUS): return "18+";
        case (AgeRatingType.R_PLUS_TWO): return "18+";
        case (AgeRatingType.RX): return "18++";
        default: return "";
    }
}

String.prototype.toMangaTypeScreenString = function (this): string {
    switch (this) {
        case (MangaType.MANGA): return "Манга";
        case (MangaType.MANHWA): return "Манхва";
        case (MangaType.MANHUA): return "Маньхуа";
        case (MangaType.LIGHT_NOVEL): return "Ранобэ";
        case (MangaType.NOVEL): return "Ранобэ";
        case (MangaType.ONE_SHOT): return "Ваншот";
        case (MangaType.DOUJIN): return "Додзинси";
        default: return "";
    }
}