import {useParams} from "react-router";
import React, {useEffect, useState} from "react";
import {useShikiNavigateLinks} from "./navigation/useShikiNavigateLinks";
import {useDetailsHook} from "../hooks/useDetailsHook";
import {Loader, LoaderWithBackButton} from "../components/Lodaer";
import {BackgroundImage} from "../components/BackgroundImage";
import {StackTopContainer} from "../components/StackTopContainer";
import {ToolbarForApp} from "../components/ToolbarForApp";
import {AnimeDetailsModel} from "../../data/models/anime/AnimeDetailsModel";
import {TextLabel} from "../components/LabelText";
import {
    AGE_TEXT, CHARACTERS_TITLE, DESCRIPTION_TITLE,
    EPISODE_TIME_TEXT,
    EPISODES_TEXT, RELATED_TITLE,
    RELEASE_DATE_TEXT, SCREENSHOTS_TITLE, SIMILAR_TITLE,
    START_WATCHING_TEXT,
    TYPE_TEXT
} from "../../appconstants/Strings";
import {AnimeType} from "../../data/models/anime/AnimeType";
import {getDatePeriodString, getYearString} from "../../utils/DateUtils";
import {ElementCard, ImageCardForDetails, InfoColumn, ScreenshotVideoCard} from "../components/ElementCard";
import {PaddingAll, PaddingBySide} from "../components/PaddingAll";
import {useShikiTheme} from "../theme/ThemeProvider";
import {imageSizes, pxSizes, textSizes} from "../theme/Sizes";
import {MyText, MyTextBold, MyTextOnBackground, MyTextSemiBold} from "../components/Texts";
import {MangaDetailsModel} from "../../data/models/manga/MangaDetailsModel";
import {appendHost, getEmptyIfBothNull} from "../../utils/StringUtils";
import {useWindowHeight, useWindowWidth} from "../components/hooks/useWindowWidthHeight";
import {SIDE_BAR_WIDTH} from "../components/Sidebar";
import {hexToRgbWithAlpha} from "../../utils/CommonUtils";
import {MyDivider} from "../components/MyDivider";
import {RowTitleText} from "../components/RowTitleText";
import {CharacterModel} from "../../data/models/roles/CharacterModel";
import {HorizontalScrollList} from "../components/HorizontalScrollList";
import {ScreenshotModel} from "../../data/models/anime/ScreenshotModel";
import {SpacerSized} from "../components/SpacerSized";
import {RoundedIconButton} from "../components/RoundedIconButton";
import {RelatedModel} from "../../data/models/common/RelatedModel";
import {AnimeModel} from "../../data/models/anime/AnimeModel";
import {AnimeCard} from "../components/AnimeCard";
import {WhiteColorPng} from "../theme/Colors";
import {GenreModel} from "../../data/models/common/GenreModel";
import {GenreCard} from "../components/GenreCard";

require("../../utils/CommonUtils")
require("../../utils/DateUtils")
require("../converters/EnumToPresentation")
require("../../utils/IntUtils")
require("../../utils/StringUtils")


/**
 * Страница Детальной информации об аниме/манге/ранобэ
 */
export const DetailsPage = () => {

    const {getDetailsPageType} = useShikiNavigateLinks()

    const windowWidth = useWindowWidth()
    const windowHeight = useWindowHeight()

    const [screenHeight, setScreenHeight] = useState(windowHeight)

    const {id} = useParams()

    const {loading, error, animeDetails, characters, screenshots, related, animeSimilar} = useDetailsHook({
        detailsType: getDetailsPageType(),
        id: Number(id)
    })

    const [showViewer, setShowViewer] = useState<boolean>(false)
    const [viewerIndex, setViewerIndex] = useState<number>(0)

    useEffect(() => {
        setScreenHeight(windowHeight)
    }, [windowHeight])

    /** секция Жанры */
    const genres = animeDetails?.genres?.isNotEmpty() ? <Genres genres={animeDetails?.genres}/> : null

    /** секция Описание */
    const description = animeDetails?.description != null ?
        <DetailsDescription description={animeDetails?.description}/> : null

    /** секция Персонажи */
    const charactersElement = characters.isNotEmpty() ? <Characters characters={characters}/> : null

    /** секция Кадры */
    const screenshotsElement = screenshots.isNotEmpty() ?
        <Screenshots screenshots={screenshots} onClick={(index: number) => {
            setViewerIndex(index)
            setShowViewer(true)
        }}/> : null

    const screensUrls: string[] = [];
    for (let i of screenshots) {
        if (i.original != null) {
            screensUrls.push(i.original)
        }
    }

    const screenshotViewer = screensUrls.isNotEmpty() && showViewer ?
        <ScreenshotsViewer screenshots={screensUrls ?? []} index={viewerIndex} onDismiss={() => {
            setShowViewer(false)
        }}/> : null

    /** секция Связанные */
    const relatedElement = related.isNotEmpty() ? <Related relatedList={related}/> : null

    /** секция Похожее */
    const similarElement = animeSimilar.isNotEmpty() ? <SimilarAnime animeSimilar={animeSimilar}/> : null

    /** Всё наполнение экрана */
    let content: React.ReactNode;

    if (loading) {
        content = <LoaderWithBackButton/>
    } else {
        content = <BackgroundImage imageUrl={animeDetails?.image?.original}>
            <StackTopContainer top={
                <ToolbarForApp/>
            } underTop={
                <div style={{
                    display: "flow",
                    height: screenHeight,
                    width: windowWidth - SIDE_BAR_WIDTH
                }}>
                    <div style={{
                        display: "flow",
                        height: screenHeight,
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <DetailsHeader animeDetails={animeDetails} mangaDetails={null}/>
                        {genres}
                        <MyDivider/>
                        {description}
                        {charactersElement}
                        {screenshotsElement}
                        {relatedElement}
                        {similarElement}
                        <SpacerSized/>
                    </div>

                    {screenshotViewer}
                </div>
            }/>
        </BackgroundImage>
    }

    return (
        content
    )
}

/**
 * Верхняя часть экрана Детальной информации
 *
 * @param animeDetails детальная информация аниме
 * @param mangaDetails детальная информация манги/ранобэ
 */
const DetailsHeader = ({
    animeDetails,
    mangaDetails
}: {
    animeDetails: AnimeDetailsModel | undefined,
    mangaDetails: MangaDetailsModel | null
}) => {

    let leftLabel: React.ReactNode | null = null;
    if (animeDetails != null) {
        leftLabel = LeftLabelAnimeTextHeader({animeDetails})
    }
    if (mangaDetails != null) {

    }

    return (
        <div style={{
            display: "flow",
            width: "100%",
            height: "auto",
            justifyContent: "center",
        }}>
            <div style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-around",
                alignItems: "center"
            }}>
                {leftLabel}

                <CenterImageScoreHeader imageUrl={animeDetails?.image?.original} score={animeDetails?.score}/>

                <RightStatusButtonsHeader animeDetails={animeDetails} mangaDetails={mangaDetails}/>
            </div>

            <div style={{
                display: "flow",
                width: "100%",
                alignSelf: "center",
                justifyContent: "center",
            }}>
                <MyTextBold
                    text={animeDetails != null
                        ? getEmptyIfBothNull({str1: animeDetails.russian, str2: animeDetails.name})
                        : getEmptyIfBothNull({str1: mangaDetails?.russian, str2: mangaDetails?.name})}
                    fontSize={textSizes.extraBig}
                    maxLines={5}/>

                <MyTextOnBackground
                    text={animeDetails?.name ?? mangaDetails?.name}
                    fontSize={textSizes.big}
                    maxLines={5}/>
            </div>
        </div>
    )
}

/**
 * Левая часть верхней части экрана Детальной информации Аниме
 *
 * @param animeDetails модель данный детальной информации об аниме
 */
const LeftLabelAnimeTextHeader = ({animeDetails}: { animeDetails: AnimeDetailsModel | undefined }) => {

    /** Тип */
    let type: React.ReactNode | null = null
    if (!animeDetails?.kind?.isNullOrEmpty()) {
        type = TextLabel({
            text: animeDetails?.kind?.toAnimeTypeScreenString(),
            labelText: TYPE_TEXT
        })
    }

    /** Количество эпизодов */
    let episodes: React.ReactNode | null = null
    if (animeDetails?.kind != AnimeType.MOVIE && animeDetails?.episodes !== null) {
        episodes = TextLabel({
            text: animeDetails?.episodes.toString(), labelText: EPISODES_TEXT
        })
    }

    /** Длительность */
    let duration: React.ReactNode | null = null
    if (animeDetails?.duration ?? 0 > 0) {
        duration = TextLabel({
            text: animeDetails?.duration?.toEpisodeTime(),
            labelText: EPISODE_TIME_TEXT
        })
    }

    /** Возрастной рейтинг */
    let ageRating: React.ReactNode | null = null
    if (animeDetails?.rating?.toAgeRatingTypeScreenString() != '') {
        ageRating = TextLabel({
            text: animeDetails?.rating?.toAgeRatingTypeScreenString(),
            labelText: AGE_TEXT
        })
    }

    /** Дата выхода в зависимости от типа трансляции */
    let releaseDate: React.ReactNode | null = null
    if (animeDetails?.anons === true || animeDetails?.ongoing === true) {

        /** Если анонс, то отображается дата выхода */
        if (animeDetails?.anons === true) {
            if (animeDetails.aired_on != null) {
                releaseDate = TextLabel({
                    text: getDatePeriodString({dateStart: animeDetails.aired_on}),
                    labelText: RELEASE_DATE_TEXT
                })
            }
        }

        /** Если онгоинг, то отображается Время до след. эпизода */
        if (animeDetails?.ongoing === true) {
            if (animeDetails.next_episode_at != null) {
                releaseDate = TextLabel({
                    text: animeDetails.next_episode_at.getDateBeforeCurrent(),
                    labelText: `до ${(animeDetails.episodes_aired ?? 0) + 1} эп.`
                })
            }
        }
    } else {
        /** Если НЕ Фильм и НЕ Спэшл, то показываем одну или две даты */
        if (animeDetails?.aired_on != null && animeDetails?.released_on == null) {
            releaseDate = TextLabel({
                text: getDatePeriodString({
                    dateStart: animeDetails.aired_on
                }),
                labelText: RELEASE_DATE_TEXT
            })
        }

        if (animeDetails?.aired_on == null && animeDetails?.released_on != null) {
            releaseDate = TextLabel({
                text: getDatePeriodString({
                    dateStart: animeDetails.released_on
                }),
                labelText: RELEASE_DATE_TEXT
            })
        }

        if (animeDetails?.aired_on != null && animeDetails?.released_on != null) {
            releaseDate = TextLabel({
                text: getDatePeriodString({
                    dateStart: animeDetails.aired_on,
                    dateEnd: animeDetails.released_on
                }),
                labelText: RELEASE_DATE_TEXT
            })
        }
    }

    return (
        <div style={{
            display: "flow",
            width: "33%",
            height: "auto",
            alignItems: "center",
            justifyContent: "center"
        }}>
            {type}
            {episodes}
            {duration}
            {ageRating}
            {releaseDate}
        </div>
    )
}

const starIcon = "/ic_star.png"

/**
 * Центральная часть верхней части экрана Детальной информации
 *
 * @param imageUrl ссылка на картинку
 * @param score оценка
 */
const CenterImageScoreHeader = ({
    imageUrl,
    score
}: {
    imageUrl: string | null | undefined,
    score: number | null | undefined
}) => {

    const {theme} = useShikiTheme()

    return (
        <div style={{
            display: "flow",
            width: "33%",
            height: "auto",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <div style={{
                display: "flex",
                width: "auto",
                height: "auto",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <ImageCardForDetails imageUrl={imageUrl}/>
            </div>

            <PaddingAll>
                <div style={{
                    display: "flex",
                    width: "auto",
                    height: "auto",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <img src={starIcon} style={{
                        height: 17,
                        width: 17,
                        filter: theme.secondaryPng,
                    }} alt={''}/>

                    <PaddingBySide left={pxSizes.value7px}>
                        <MyText text={score?.toString()}/>
                    </PaddingBySide>
                </div>
            </PaddingAll>

        </div>
    )
}

const iconPlay = '/ic_play.png'

/**
 * Правая часть верхней части экрана Детальной информации
 *
 * @param animeDetails детальная информация аниме
 * @param mangaDetails детальная информация манги/ранобэ
 */
const RightStatusButtonsHeader = ({
    animeDetails,
    mangaDetails
}: {
    animeDetails: AnimeDetailsModel | undefined,
    mangaDetails: MangaDetailsModel | null
}) => {

    const {theme} = useShikiTheme()

    const {navigateEpisode} = useShikiNavigateLinks()

    const [hover, setHover] = useState<boolean>(false)

    return (
        <div style={{
            display: "flow",
            width: "33%",
            height: "auto",
            justifyContent: "center",
            alignItems: "center",
        }}>

            <PaddingBySide bottom={pxSizes.value14px}>
                <MyTextBold
                    text={(animeDetails?.status ?? mangaDetails?.status)?.toAiredStatusScreenString()}
                    color={(animeDetails?.status ?? mangaDetails?.status)?.toAiredStatusColor()}
                />
            </PaddingBySide>

            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <div style={{
                    display: "flex",
                    height: 50,
                    width: 150,
                    alignItems: "center",
                    justifyContent: "center",
                    background: hexToRgbWithAlpha({hex: theme.background, alpha: 0.5}),
                    border: `1px solid ${hover ? theme.onPrimary : theme.onBackground}`,
                    borderRadius: pxSizes.value50px
                }} onClick={() => {
                    navigateEpisode({
                            animeId: animeDetails?.id,
                            animeNameRu: animeDetails?.russian,
                            animeNameEng: animeDetails?.name,
                            animeImageUrl: animeDetails?.image?.original
                        }
                    )
                }} onMouseOver={() => {
                    setHover(true)
                }}
                     onMouseLeave={() => {
                         setHover(false)
                     }}>
                    <PaddingBySide left={pxSizes.value7px}>
                        <MyTextSemiBold text={START_WATCHING_TEXT}/>
                    </PaddingBySide>

                    <PaddingBySide left={pxSizes.value7px} right={pxSizes.value3px}>
                        <img src={iconPlay} style={{
                            display: "flow",
                            height: 24,
                            width: 24,
                            filter: theme.secondaryPng
                        }} alt={''}/>
                    </PaddingBySide>

                </div>
            </div>

        </div>
    )
}

/**
 * Список жанров
 *
 * @param genres
 */
const Genres = ({genres}: {genres: GenreModel[]}) => {

    let elememts: React.ReactNode[] = []
    for (let i of genres) {
        elememts.push(
            <GenreCard isHover={true} text={i.russian}/>
        )
    }

    return(
        <PaddingBySide left={pxSizes.value7px} top={pxSizes.value14px}>
            <HorizontalScrollList elements={elememts}/>
        </PaddingBySide>
    )
}

/**
 * Часть экрана с Описанием, находится под жанрами
 */
const DetailsDescription = ({description}: { description: string | null | undefined }) => {

    return (
        <div style={{
            display: "flow",
            height: "auto",
            width: "100%"
        }}>
            <RowTitleText text={DESCRIPTION_TITLE}/>
            <PaddingBySide left={pxSizes.value14px} right={pxSizes.value14px}>
                <MyText text={description} maxLines={100000} textAlign={'start'} fontSize={textSizes.big}/>
            </PaddingBySide>
        </div>
    )
}

/**
 * Часть экрана с Персонажами, находится под Описанием
 *
 * @param characters список персонажей
 */
const Characters = ({characters}: { characters: CharacterModel[] }) => {

    let charactersElements: React.ReactNode[] = []

    for (let i of characters) {
        charactersElements.push(
            <ElementCard imageUrl={i.image?.original} titleText={getEmptyIfBothNull(
                {
                    str1: i.russian,
                    str2: i.name
                }
            )}/>
        )
    }

    return (
        <TitleHorizontalList title={CHARACTERS_TITLE} list={charactersElements}/>
    )
}

/**
 * Часть экрана со Скриншотами из Аниме
 *
 * @param screenshots список со скриншотами
 * @param onClick коллбэк с индексом нажатого скриншота
 */
const Screenshots = ({screenshots, onClick}: { screenshots: ScreenshotModel[], onClick?: (index: number) => void }) => {

    let screens: React.ReactNode[] = []

    function getScreenIndex(screen: ScreenshotModel) {
        const index = screenshots.indexOf(screen)
        if (index != -1) {
            if (onClick != null) {
                onClick(index)
            }
        }
    }

    for (let i of screenshots) {
        screens.push(
            <ScreenshotVideoCard imageUrl={i.original} onClick={() => {
                getScreenIndex(i)
            }}/>
        )
    }

    return (
        <TitleHorizontalList title={SCREENSHOTS_TITLE} list={screens}/>
    )
}

const iconChevronLeft = '/ic_chevron_left.png';
const iconChevronRight = '/ic_chevron_right.png'
const iconClose = '/ic_close.png'

/**
 * Компонент для показа скриншотов
 *
 * @param screenshots список ссылок на картинки
 * @param index стартовый индекс показа элементы из списка при первом открытии
 * @param onDismiss коллбэка закрытия показа скриншотов
 */
const ScreenshotsViewer = ({
    screenshots,
    index,
    onDismiss
}: { screenshots: string[], index?: number, onDismiss?: () => void }) => {

    const {theme} = useShikiTheme()

    const windowHeight = useWindowHeight()
    const windowWidth = useWindowWidth()

    const [currentIndex, setCurrentIndex] = useState<number>(index ?? 0)

    const screensLength = screenshots.length - 1

    function getNextLeftIndex() {
        const index = currentIndex - 1
        if (index < 0) {
            setCurrentIndex(screensLength)
        } else {
            setCurrentIndex(index)
        }
    }

    function getNextRightIndex() {
        const index = currentIndex + 1
        if (index > screensLength) {
            setCurrentIndex(0)
        } else {
            setCurrentIndex(index)
        }
    }

    return (
        <div style={{
            display: "flex",
            width: windowWidth,
            height: windowHeight,
            position: "fixed",
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",
            background: hexToRgbWithAlpha({hex: theme.background, alpha: 0.87})
        }}>

            <div style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                height: windowHeight,
                position: "absolute",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <PaddingAll all={pxSizes.value100px}>
                    <RoundedIconButton image={iconChevronLeft} color={theme.onBackgroundPng} backgroundColor={theme.background} onClick={getNextLeftIndex}/>
                </PaddingAll>

                <PaddingAll all={pxSizes.value100px}>
                    <RoundedIconButton image={iconChevronRight} color={theme.onBackgroundPng} backgroundColor={theme.background} onClick={getNextRightIndex}/>
                </PaddingAll>
            </div>

            <div style={{
                height: "70%",
                width: "70%",
                position: "absolute",
                alignSelf: "center",
                justifyContent:"end",
                alignItems: "center",
            }}>
                <img src={appendHost(screenshots[currentIndex])} style={{
                    height: "100%",
                    width: "100%",
                }} onClick={onDismiss} alt={''}/>
                <div style={{
                    height: "auto",
                    width: "auto",
                    position: "absolute",
                    top: 0,
                    right: 0,
                    justifyContent: "end",
                }}>
                    <PaddingBySide top={pxSizes.value7px}>
                        <RoundedIconButton
                            image={iconClose}
                            color={WhiteColorPng}
                            backgroundColor={hexToRgbWithAlpha({hex: theme.background, alpha: 0.3})}
                            onClick={onDismiss}/>
                    </PaddingBySide>
                </div>
            </div>

        </div>
    )
}

/**
 * Часть экрана со Связанным
 *
 * @param relatedList список связанных произведений
 */
const Related = ({relatedList}: {relatedList: RelatedModel[]}) => {

    let relatedElements: React.ReactNode[] = []

    for (let i of relatedList) {
        relatedElements.push(
            <RelatedCard related={i}/>
        )
    }

    return(
        <TitleHorizontalList title={RELATED_TITLE} list={relatedElements}/>
    )
}

/**
 * Часть экрана со Связанным
 *
 * @param relatedList список связанных произведений
 */
const RelatedCard = ({related}: {related: RelatedModel}) => {

    const isAnime = related.anime != null

    return(
        <ElementCard
            imageUrl={isAnime ? related.anime?.image?.original : related.manga?.image?.original}
            titleText={related.relation_russian}
            secondTextOne={isAnime ? related.anime?.kind?.toAnimeTypeScreenString() : related.manga?.kind?.toMangaTypeScreenString()}
            secondTextTwo={isAnime ? getYearString({dateString: related.anime?.released_on ?? related.anime?.aired_on}) :
                getYearString({dateString: related.manga?.released_on ?? related.manga?.aired_on})}
            onImageClick={() => {

            }}
            onTextClick={() => {

            }}
            info={<InfoColumn
            status={related.anime?.status ?? related.manga?.status}
            score={related.anime?.score ?? related.manga?.score}
            episodes={related.anime?.episodes}
            episodesAired={related.anime?.episodes_aired}
            chapters={related.manga?.chapters}
            volumes={related.manga?.volumes}
            dateAired={related.anime?.aired_on ?? related.manga?.aired_on}
            dateReleased={related.anime?.aired_on ?? related.manga?.released_on}/>}
        />
    )
}

/**
 * Часть экрана с Похожим Аниме
 *
 * @param animeSimilar список похожего аниме
 */
const SimilarAnime = ({animeSimilar}: {animeSimilar: AnimeModel[]}) => {

    let similarElements: React.ReactNode[] = []

    for (let i of animeSimilar) {
        similarElements.push(
            <AnimeCard anime={i}/>
        )
    }

    return(
        <TitleHorizontalList title={SIMILAR_TITLE} list={similarElements}/>
    )
}

/**
 * Показ горизонтального списка элементов с заголовком
 * @constructor
 */
const TitleHorizontalList = ({title, list}: {title: string, list: React.ReactNode[]}) => {
    let elements: React.ReactNode[] = []

    for (let i of list) {
        elements.push(
            <PaddingBySide left={pxSizes.value7px} right={pxSizes.value7px}>
                {i}
            </PaddingBySide>
        )
    }

    return(
        <PaddingBySide top={pxSizes.value14px}>
            <div style={{
                display: "flow",
                height: "auto",
                width: "100%"
            }}>
                <RowTitleText text={title}/>
                <HorizontalScrollList elements={elements}/>
            </div>
        </PaddingBySide>
    )
}