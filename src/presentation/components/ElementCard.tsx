import {appendHost} from "../../utils/StringUtils";
import React, {CSSProperties, useEffect, useRef, useState} from "react";
import {imageSizes, pxSizes, textSizes} from "../theme/Sizes";
import {DotTextDivider, MyText, MyTextOnBackground} from "./Texts";
import {useShikiTheme} from "../theme/ThemeProvider";
import {AiredStatus} from "../../data/models/common/AiredStatus";
import {isMoreThan} from "../../utils/IntUtils";
import {TextLabel} from "./LabelText";
import {CHAPTERS_TEXT, EPISODES_TEXT, RELEASE_DATE_TEXT, VOLUMES_TEXT} from "../../appconstants/Strings";
import {getDatePeriodString} from "../../utils/DateUtils";
import {LinearProgress} from "@mui/material";

require("../converters/EnumToPresentation")

/** базовое увеличение карточки */
export const BASE_SCALE_FOR_CARD = "1"

/** увеличение карточки при наведении курсора мыши */
export const HOVER_SCALE_FOR_CARD = "1.02"

const starIcon = "/ic_star.png"

/**
 * Базовая карточка для всего приложения
 *
 * @param isExpanded флаг скрытия картинки и показа информации под ней
 * @param imageUrl ссылка на картинку
 * @param imageHeight высотка картинки
 * @param imageWidth ширина картинки
 * @param overPicture элемент для наложения поверх картинки
 * @param titleText строка с названием
 * @param secondTextOne первая строка под названием
 * @param secondTextTwo вторая строка под названием
 * @param info элемент с информацией под картинкой
 * @param onImageClick коллбэк при нажатии на картинку
 * @param onTextClick коллбэк при нажатии на текст
 */
export const ElementCard = (
    {
        imageUrl,
        imageHeight = imageSizes.coverHeight,
        imageWidth = imageSizes.coverWidth,
        overPicture = null,
        titleText = null,
        secondTextOne = null,
        secondTextTwo = null,
        info = null,
        onImageClick = null,
        onTextClick = null
    }:
        {
            isExpanded?: boolean,
            imageUrl: string | null | undefined,
            imageHeight?: number,
            imageWidth?: number,
            overPicture?: React.ReactNode | null,
            titleText?: string | null,
            secondTextOne?: string | null,
            secondTextTwo?: string | null,
            info?: React.ReactNode | null,
            onImageClick?: (() => void) | null,
            onTextClick?: (() => void) | null,
        }
) => {

    const {theme} = useShikiTheme()

    const [scale, setScale] = useState(BASE_SCALE_FOR_CARD)

    const [hover, setHover] = useState(false)

    let image;
    if (info === null) {
        image = ImageCard({
            imageUrl: imageUrl, height: imageHeight,
            width: imageWidth, overPicture: overPicture
        })
    } else {
        image = ImageCardWithInfo({
            isShowInfo: !hover,
            infoUnder: info,
            imageUrl: imageUrl,
            height: imageHeight,
            width: imageWidth,
            overPicture: overPicture
        })
    }

    let upperText: React.ReactNode | null = null;
    if (titleText != null) {
        upperText = MyText({text: titleText})
    }

    let underText: React.ReactNode | null = null;
    if (!secondTextOne?.isNullOrEmpty() || !secondTextTwo?.isNullOrEmpty()) {
        underText = <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}>
            {!secondTextOne?.isNullOrEmpty() ? MyText({text: secondTextOne, fontSize: textSizes.min}) : null}
            {(secondTextOne?.isNotEmpty() && secondTextTwo?.isNotEmpty()) ? DotTextDivider() : null}
            {!secondTextTwo?.isNullOrEmpty() ? MyTextOnBackground({text: secondTextTwo, fontSize: textSizes.min}) : null}
        </div>
    }

    if (titleText != null || secondTextOne != null || secondTextTwo != null) {
        underText =
            <div style={{
                position: "relative",
                height: "auto",
                width: "100%",
                backgroundColor: onTextClick ? (hover ? theme.brightHover : "transparent") : "transparent",
                maxWidth: imageWidth,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: pxSizes.value7px,
                paddingTop: pxSizes.value5px
            }} onClick={onTextClick ?? (() => {
            })}
                 onMouseOver={() => {
                     setHover(true)
                 }} onMouseLeave={() => {
                setHover(false)
            }}>
                {upperText}
                {underText}
            </div>
    }

    return (
        <div style={{
            position: "relative",
            width: imageWidth,
            height: "auto",
            alignItems: "center",
            justifyContent: "center",
            scale: scale
        }}
             onMouseOver={() => {
                 setScale(HOVER_SCALE_FOR_CARD)
             }}
             onMouseLeave={() => {
                 setScale(BASE_SCALE_FOR_CARD)
             }}>
            <div
                style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    // maxWidth: imageWidth,
                    // maxHeight: imageHeight,
                    // border: `1px solid ${theme.onBackground}`,
                    // borderRadius: pxSizes.value7px,
                    alignItems: "center",
                    justifyContent: "center"
                }}
                onClick={onImageClick ?? (() => {
                })}>
                {image}
            </div>
            {underText}
        </div>
    )
}

/**
 * Базовая карточка для экрана "Поиск"
 *
 * @param isShowInfo флаг скрытия картинки и показа информации под ней
 * @param info элемент с информацией под картинкой
 * @param imageUrl ссылка на картинку
 * @param imageHeight
 * @param imageWidth
 * @param overPicture элемент для наложения поверх картинки
 * @param onClick коллбэк при нажатии на картинку
 */
export const SearchCard = ({
    isShowInfo,
    info,
    imageUrl,
    imageHeight = 348,
    imageWidth = 255,
    overPicture,
    onClick
}: {
    isShowInfo: boolean,
    info?: React.ReactNode | null,
    imageUrl: string | null | undefined,
    imageHeight?: number,
    imageWidth?: number,
    overPicture?: React.ReactNode,
    onClick?: (() => void)
}) => {
    const [scale, setScale] = useState(BASE_SCALE_FOR_CARD)

    return (
        <div style={{
            position: "relative",
            width: "auto",
            height: "auto",
            // border: `1px solid ${theme.onBackground}`,
            // borderRadius: pxSizes.value7px,
            justifyContent: "center",
            scale: scale
        }}
             onMouseOver={() => {
                 setScale(HOVER_SCALE_FOR_CARD)
             }}
             onMouseLeave={() => {
                 setScale(BASE_SCALE_FOR_CARD)
             }}
             onClick={onClick}>
            {info === null ? ImageCard({
                imageUrl: imageUrl,
                height: imageHeight,
                width: imageWidth,
                overPicture: overPicture
            }) : ImageCardWithInfo({
                isShowInfo: isShowInfo,
                imageUrl: imageUrl,
                infoUnder: info,
                height: imageHeight,
                width: imageWidth,
                overPicture: overPicture
            })}
        </div>
    )
}

/** Стиль для картинки */
export const imageStyle: CSSProperties = {
    height: "100%",
    width: "100%",
    position: "absolute",
    top: 0,
    objectFit: "cover",
    borderRadius: pxSizes.value7px,
}

/**
 * Отображение состояния загрузки картинки
 *
 * @param isLoad флаг загрузки
 */
const ImageLoader = ({isLoad}: {isLoad: boolean}) => {

    const {theme} = useShikiTheme()

    let loader: React.ReactNode | null = isLoad ? null : <div style={{
        display: "flow",
        position: "absolute",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center"
    }}>
        <LinearProgress sx={{
            backgroundColor: 'transparent',
            '& .MuiLinearProgress-bar': {
                backgroundColor: theme.secondary
            }
        }} variant={"indeterminate"}/>
    </div>

  return(
      loader
  )
}

/**
 * Контейнер загрузки изображения для карточки
 *
 * @param imageUrl ссылка на картинку
 * @param height
 * @param width
 * @param overPicture элемент для наложения поверх картинки
 */
export const ImageCard = (
    {imageUrl, height = imageSizes.coverHeight, width = imageSizes.coverWidth, overPicture = null,}:
        {
            imageUrl: string | null | undefined,
            height?: number | string,
            width?: number | string,
            overPicture?: React.ReactNode | null
        }
) => {
    const [loaded, setLoaded] = useState(false)

    return (
        <div style={{
            height: height,
            width: width
        }}>
            <div style={imageStyle}>

                <img src={appendHost(imageUrl)}
                     style={imageStyle}
                onLoad={() => {
                    setLoaded(true)
                }}/>

                <div style={overPictureStyle}>
                    {overPicture}
                </div>

                <ImageLoader isLoad={loaded}/>
            </div>
        </div>
    )
}

/** Стиль для картинки экрана Детальной информации */
export const imageStyleForDetails: CSSProperties = {
    height: imageSizes.detailsCoverHeight,
    width: imageSizes.detailsCoverWidth,
    position: "relative",
    top: 0,
    objectFit: "cover",
    borderRadius: pxSizes.value7px,
}

/**
 * Контейнер загрузки изображения для карточки
 *
 * @param imageUrl ссылка на картинку
 * @param overPicture элемент для наложения поверх картинки
 */
export const ImageCardForDetails = ({imageUrl}: { imageUrl: string | null | undefined, }) => {
    return (
        <img src={appendHost(imageUrl)}
             alt={''} style={imageStyleForDetails}/>
    )
}

/**
 * Функция для получения стиля для информации за картинкой с изменением её видимости
 *
 * @param isVisible флаг видимости
 */
export const getInfoStyle = (isVisible: boolean): CSSProperties => {
    return {
        height: "100%",
        width: "100%",
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        margin: "auto",
        objectFit: "cover",
        opacity: isVisible ? "1" : "0",
        objectPosition: "center",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: pxSizes.value7px,
    }
}

/**
 * Функция для получения стиля для картинки с изменением её видимости
 *
 * @param isVisible флаг видимости
 */
export const getImageStyle = (isVisible: boolean): CSSProperties => {
    return {
        position: "relative",
        height: "100%",
        width: "100%",
        objectFit: "cover",
        opacity: isVisible ? "1" : "0",
        transition: 'all .5s',
        borderRadius: pxSizes.value7px,
    }
}

/** Стиль для элемента, который накладывается на картинку */
export const overPictureStyle: CSSProperties = {
    position: "absolute",
    top: 0,
    height: "100%",
    width: "100%",
    objectFit: "cover",
    borderRadius: pxSizes.value7px,
}

/**
 * Контейнер загрузки изображения для карточки
 *
 * @param isShowInfo флаг показа информации под картинкой
 * @param infoUnder элемент с информацией под картинкой
 * @param imageUrl ссылка на картинку
 * @param height
 * @param width
 * @param overPicture элемент для наложения поверх картинки
 */
export const ImageCardWithInfo = (
    {
        isShowInfo,
        infoUnder = null,
        imageUrl,
        height = imageSizes.coverHeight,
        width = imageSizes.coverWidth,
        overPicture = null
    }:
        {
            isShowInfo: boolean,
            infoUnder?: React.ReactNode | null,
            imageUrl?: string | null | undefined,
            height?: number | string,
            width?: number | string,
            overPicture?: React.ReactNode | null
        }
) => {
    const [loaded, setLoaded] = useState(false)

    return (
        <div style={{
            height: height,
            width: width,
            objectFit: "cover",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <div style={getInfoStyle(!isShowInfo)}>
                {infoUnder}
            </div>

            <img src={appendHost(imageUrl)}
                 style={getImageStyle(isShowInfo)}
                 onLoad={() => {
                     setLoaded(true)
                 }}
            />

            <div style={overPictureStyle}>
                {overPicture}
            </div>

            <ImageLoader isLoad={loaded}/>
        </div>
    )
}

/**
 * Накладываемый на картинку текст в левом верхнем - правом нижнем углах
 *
 * @param leftTopText
 * @param rightBottomText
 */
export const OverPictureOne = (
    {leftTopText = null, rightBottomText = null}:
        {
            leftTopText?: string | null,
            rightBottomText?: string | null
        }
) => {

    let leftTop;
    if (leftTopText != null) {
        leftTop =
            <div style={{
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                position: "absolute",
                top: 0,
                borderTopLeftRadius: pxSizes.value7px,
                borderBottomRightRadius: pxSizes.value7px,
            }}>
                <div style={{
                    padding: 3
                }}>
                    {MyText({text: leftTopText, color: "white"})}
                </div>
            </div>
    }

    let rightBottom;
    if (rightBottomText != null) {
        rightBottom =
            <div style={{
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                position: "absolute",
                right: 0,
                bottom: 0,
                borderTopLeftRadius: pxSizes.value7px,
                borderBottomRightRadius: pxSizes.value7px,
            }}>
                <div style={{
                    padding: 3
                }}>
                    {MyText({text: rightBottomText, color: "white"})}
                </div>
            </div>
    }

    return (
        <div style={imageStyle}>
            {leftTop}
            {rightBottom}
        </div>
    )
}

/**
 * Накладываемый на картинку текст снизу по центру и в левом верхнем углу
 *
 * @param leftTopText
 * @param centerText
 * @param onTitleClick
 */
export const OverPictureTwo = (
    {leftTopText = null, centerText = null, onTitleClick = null, onTitleHover = null}:
        {
            leftTopText?: string | null,
            centerText?: string | null,
            onTitleClick?: (() => void) | null,
            onTitleHover?: ((focus: boolean) => void) | null
        }
) => {

    const [hover, setHover] = useState(false)

    let leftTop;
    if (leftTopText != null) {
        leftTop =
            <div style={{
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                position: "absolute",
                top: 0,
                borderTopLeftRadius: pxSizes.value7px,
                borderBottomRightRadius: pxSizes.value7px,
            }}>
                <div style={{
                    padding: 3
                }}>
                    {MyText({text: leftTopText, color: "white"})}
                </div>
            </div>
    }

    let center;
    if (centerText != null) {
        center =
            <div style={{
                backgroundColor: hover ? "rgba(0, 0, 0, 0.9)" : "rgba(0, 0, 0, 0.7)",
                position: "absolute",
                bottom: 0,
                height: "auto",
                width: "100%",
                alignSelf: "center",
                borderBottomLeftRadius: pxSizes.value7px,
                borderBottomRightRadius: pxSizes.value7px
            }}
                 onClick={onTitleClick ?? (() => {
                 })}
                 onMouseOver={() => {
                     setHover(true)
                     if (onTitleHover) {
                         onTitleHover(true)
                     }
                 }} onMouseLeave={() => {
                setHover(false)
                if (onTitleHover) {
                    onTitleHover(false)
                }
            }}>
                {MyText({text: centerText, maxLines: 3, color: "white"})}
            </div>
    }

    return (
        <div style={overPictureStyle}>
            {leftTop}
            {center}
        </div>
    )
}

/**
 * Столбец с информацией сзади картинки
 *
 * @param status статус выхода произведения
 * @param score средняя оцена пользователей
 * @param episodes количество эпизодов
 * @param episodesAired количество вышедших эпизодов
 * @param chapters количество глав
 * @param volumes количество томов
 * @param dateAired дата начала трансляции
 * @param dateReleased дата окончания трансляции
 * @param isMal флаг использования карточки для MyAnimeList
 */
export const InfoColumn = (
    {
        status = null,
        score = null,
        episodes = null,
        episodesAired = null,
        chapters = null,
        volumes = null,
        dateAired = null,
        dateReleased = null,
        isMal = false
    }: {
        status?: string | null,
        score?: number | null,
        episodes?: number | null,
        episodesAired?: number | null,
        chapters?: number | null,
        volumes?: number | null,
        dateAired?: string | null,
        dateReleased?: string | null,
        isMal?: boolean
    }
) => {

    const {theme} = useShikiTheme()

    let episodesDiv: React.ReactNode | null = null;

    let chaptersDiv: React.ReactNode | null = null;

    let volumesDiv: React.ReactNode | null = null;

    let dateDiv: React.ReactNode | null = null;

    if (status === AiredStatus.ANONS || status === AiredStatus.RELEASED || status === AiredStatus.PAUSED || status === AiredStatus.DISCONTINUED) {
        if (isMoreThan(episodes, 0)) {
            episodesDiv = TextLabel({
                text: `${episodes}`,
                labelText: EPISODES_TEXT
            })
        }

        if (isMoreThan(chapters, 0)) {
            chaptersDiv = TextLabel({
                text: `${chapters}`,
                labelText: CHAPTERS_TEXT
            })
        }

        if (isMoreThan(volumes, 0)) {
            volumesDiv = TextLabel({
                text: `${chapters}`,
                labelText: VOLUMES_TEXT
            })
        }
    }

    if (status === AiredStatus.ONGOING) {

        if (episodes != null && episodesAired != null) {
            episodesDiv = TextLabel({
                text: `${episodesAired} из ${episodes}`,
                labelText: EPISODES_TEXT
            })
        }

        if (isMoreThan(chapters, 0)) {
            chaptersDiv = TextLabel({
                text: `${chapters}`,
                labelText: CHAPTERS_TEXT
            })
        }

        if (isMoreThan(volumes, 0)) {
            volumesDiv = TextLabel({
                text: `${chapters}`,
                labelText: VOLUMES_TEXT
            })
        }
    }

    if (status === AiredStatus.ANONS || status === AiredStatus.ONGOING) {
        dateDiv = TextLabel({
            text: getDatePeriodString({dateStart: dateAired}),
            labelText: RELEASE_DATE_TEXT
        })
    }

    if (status === AiredStatus.RELEASED || status === AiredStatus.PAUSED || status === AiredStatus.DISCONTINUED) {
        dateDiv = TextLabel({
            text: getDatePeriodString({dateStart: dateAired, dateEnd: dateReleased}),
            labelText: RELEASE_DATE_TEXT
        })
    }

    return (
        <div style={{
            padding: pxSizes.value7px,
            display: "flow",
            width: "100%",
            height: "auto",
            objectFit: "cover",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "30%"
        }}>

            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <div style={{
                    paddingRight: pxSizes.value7px
                }}>
                    {MyText({text: status?.toAiredStatusScreenString(), color: status?.toAiredStatusColor()})}
                </div>
                <img src={starIcon} style={{
                    height: 16,
                    width: 16,
                    filter: theme.secondaryPng,
                }} alt={''}/>
                <div style={{
                    paddingLeft: pxSizes.value7px
                }}>
                    {MyText({text: `${score}`})}
                </div>
            </div>

            {episodesDiv}

            {chaptersDiv}

            {volumesDiv}

            {dateDiv}

        </div>
    )
}

/**
 * Карточка для скриншота
 *
 * @param imageUrl ссылка на скриншот
 * @param height высота картинки
 * @param width ширина картинки
 * @param onClick коллбэк нажатия на карточку
 */
export const ScreenshotVideoCard = ({
    imageUrl,
    height = imageSizes.screenshotHeight,
    width = imageSizes.screenshotWidth,
    onClick
}: {
    imageUrl: string | null | undefined,
    height?: string | number,
    width?: string | number,
    onClick?: () => void
}) => {

    const [hover, setHover] = useState<boolean>(false)

    return (
        <img src={appendHost(imageUrl)} style={{
            height: height,
            width: width,
            borderRadius: pxSizes.value7px,
            scale: hover ? HOVER_SCALE_FOR_CARD : BASE_SCALE_FOR_CARD,
        }} alt={''}
             onMouseOver={() => {
                 setHover(true)
             }}
             onMouseLeave={() => {
                 setHover(false)
             }}
        onClick={onClick}/>
    )
}