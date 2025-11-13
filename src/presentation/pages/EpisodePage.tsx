import {useLocation, useParams} from "react-router";
import {BackgroundImage} from "../components/BackgroundImage";
import {useEpisodeHook} from "../hooks/useEpisodeHook";
import React, {useEffect, useRef, useState} from "react";
import {hexToRgbWithAlpha} from "../../utils/CommonUtils";
import {ToolbarForApp} from "../components/ToolbarForApp";
import {MyText, MyTextOnBackground, MyTextSemiBold} from "../components/Texts";
import {PaddingAll, PaddingBySide} from "../components/PaddingAll";
import {RoundedTextButton} from "../components/RoundedTextButton";
import {transitionThemeChange, useShikiTheme} from "../theme/ThemeProvider";
import {RoundedIconButton} from "../components/RoundedIconButton";
import {DUB_TITLE, SUBTITLES_TITLE} from "../../appconstants/Strings";
import {useWindowHeight, useWindowWidth} from "../components/hooks/useWindowWidthHeight";
import {SIDE_BAR_WIDTH} from "../components/Sidebar";
import {pxSizes} from "../theme/Sizes";
import {TranslationType} from "../../data/models/video/TranslationType";
import {Grid, Slider} from "@mui/material";
import {ShimoriTranslationModel} from "../../data/models/video/ShimoriTranslationModel";
import {EpisodeCard} from "../components/EpisodeCard";
import {ErrorMessage, Loader} from "../components/Lodaer";
import {HorizontalDrawer} from "../components/HorizontalDrawer";
import ReactPlayer from "react-player";
import {deleteM3u8} from "../../utils/StringUtils";
import {DefaultColorPrimary, WhiteColorPng} from "../theme/Colors";
import {OnProgressProps} from "react-player/base";

const buttonsSize = 50;

/**
 * Страница Эпизоды
 */
export const EpisodePage = () => {

    const {theme} = useShikiTheme()

    const windowWidth = useWindowWidth()

    const {id, name} = useParams()

    const {state} = useLocation()

    const {animeNameRu, animeImageUrl} = state

    const nameRu = animeNameRu as string | null
    const imageUrl = animeImageUrl as string | null

    const {
        loading,
        error,
        episodes,
        translations,
        currentEpisode,
        setCurrentEpisode,
        currentTranslationType,
        setCurrentTranslationType,
        setCurrentTranslation,
        currentVideo
    } = useEpisodeHook({
        id: id ?? 0,
        name: name ?? ''
    })

    const [showDrawer, setShowDrawer] = useState(false)

    const [showVideo, setShowVideo] = useState(false)

    const [videoUrl, setVideoUrl] = useState<string | null>(null)

    useEffect(() => {
        if (currentVideo?.tracks != null) {
            const url = currentVideo.tracks[2].url
            setVideoUrl(url)
            setShowVideo(true)
        }
    }, [currentVideo])

    let episodesBtn: React.ReactNode | null = null
    if (episodes ?? 0 > 0) {
        episodesBtn = <RoundedTextButton
            size={buttonsSize}
            borderColor={hexToRgbWithAlpha({hex: theme.onPrimary, alpha: 0.6})}
            backgroundColor={theme.background}
            text={`${currentEpisode}`}
            onClick={() => {
                setShowDrawer(prevState => !prevState)
            }}/>
    }

    let mainContent: React.ReactNode
    if (loading) {
        mainContent = <Loader/>
    } else {
        if (error) {
            mainContent = <ErrorMessage/>
        } else {
            mainContent = <EpisodeList translations={translations ?? []} onClick={(tr: ShimoriTranslationModel) => {
                setCurrentTranslation(tr)
            }}/>
        }
    }

    const drawerWidth = 250;

    let drawer: React.ReactNode | null = null
    if (episodes ?? 0 > 0) {

        let drawerBtns: React.ReactNode[] = []

        for (let i = 1; i <= (episodes ?? 0); i++) {
            const backgroundColor = i === currentEpisode ? hexToRgbWithAlpha({hex: theme.secondary, alpha: 0.3}) : 'transparent'
            drawerBtns.push(
                <Grid item={true} style={{
                    padding: pxSizes.value7px
                }} key={i}>
                    <RoundedTextButton
                        size={buttonsSize}
                        borderColor={hexToRgbWithAlpha({hex: theme.onPrimary, alpha: 0.6})}
                        backgroundColor={backgroundColor}
                        text={`${i}`}
                        onClick={() => {
                            setCurrentEpisode(i)
                            setShowDrawer(false)
                        }}/>
                </Grid>
            )
        }

        drawer = <Grid container={true} style={{
            height: "100%",
            width: drawerWidth,
            paddingTop: pxSizes.value20px
        }}>
            {drawerBtns}
        </Grid>
    }

    let videoPlayer: React.ReactNode | null = null
    if (showVideo && videoUrl != null) {
        videoPlayer = <VideoPlayer
            title={nameRu}
            episode={currentEpisode}
            url={videoUrl}
            onDismiss={() => {
                setShowVideo(false)
            }}/>
    }

    return (
        <div style={{
            display: "flex",
            height: "100%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <HorizontalDrawer drawerWidth={drawerWidth} showDrawer={showDrawer} drawer={
                <div style={{
                    height: "100%",
                    width: drawerWidth
                }}>
                    {drawer}
                </div>
            } content={
                <BackgroundImage imageUrl={imageUrl}>
                    <div style={{
                        display: "flow",
                        height: "100%",
                        width: windowWidth - SIDE_BAR_WIDTH
                    }}>
                        <div style={{
                            display: "flow",
                            height: "auto",
                            width: windowWidth - SIDE_BAR_WIDTH,
                            position: "fixed",
                        }}>

                            <ToolbarForApp centerElement={<MyTextSemiBold text={nameRu}/>}/>

                            <PaddingAll>
                                <div style={{
                                    display: "flex",
                                    height: 100,
                                    width: "100%",
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                }}>
                                    <PaddingAll>
                                        {episodesBtn}
                                    </PaddingAll>

                                    <PaddingAll>
                                        <div style={{
                                            display: "flex",
                                            width: "auto",
                                            height: "auto",
                                            alignItems: "center"
                                        }}>
                                            <TranslationButton
                                                selected={currentTranslationType === TranslationType.SUB_RU}
                                                text={SUBTITLES_TITLE}
                                                icon={iconSubtitle}
                                                onClick={() => {
                                                    setCurrentTranslationType(TranslationType.SUB_RU)
                                                }}/>
                                            <TranslationButton
                                                selected={currentTranslationType === TranslationType.VOICE_RU}
                                                text={DUB_TITLE}
                                                icon={iconMicrophone}
                                                onClick={() => {
                                                    setCurrentTranslationType(TranslationType.VOICE_RU)
                                                }}/>
                                        </div>
                                    </PaddingAll>
                                </div>
                            </PaddingAll>

                        </div>

                        <div style={{
                            height: 500,
                            paddingTop: 200
                        }}>
                            {mainContent}
                        </div>
                    </div>

                </BackgroundImage>
            }/>

            {videoPlayer}
        </div>
    )
}

const iconSubtitle = '/ic_subtitles_1.png'
const iconMicrophone = '/ic_microphone_1.png'

/**
 * Кнопка выбора типа трансляции
 *
 * @param selected флаг, что кнопка выбрана
 * @param text текст рядом с кнопкой
 * @param icon ссылка на иконку
 * @param onClick коллбэк нажатия на кнопку
 */
const TranslationButton = ({
    selected = false,
    text,
    icon,
    onClick
}: {
    selected?: boolean,
    text: string,
    icon: string,
    onClick: () => void
}) => {
    const {theme} = useShikiTheme()

    let leftText: React.ReactNode | null = null;
    if (selected) {
        leftText = <MyText text={text}/>
    }

    const selectedColor = hexToRgbWithAlpha({hex: theme.secondary, alpha: 0.2})

    return (
        <div style={{
            display: "flex",
            width: "auto",
            height: "auto",
            alignItems: "center"
        }}>
            <PaddingBySide right={pxSizes.value10px}>
                {leftText}
            </PaddingBySide>
            <RoundedIconButton
                image={icon}
                size={buttonsSize}
                color={theme.onBackgroundPng}
                backgroundColor={selected ? selectedColor : theme.background}
                borderColor={theme.onBackground}
                onClick={onClick}/>
        </div>
    )
}

/**
 * Список доступных трансляций эпизода
 *
 * @param translations список трансляций
 * @param onClick коллбэк нажатия на карточку эпизода, возвращающий данные выбранной трансляции
 */
const EpisodeList = ({
    translations,
    onClick
}: {
    translations: ShimoriTranslationModel[],
    onClick: (translation: ShimoriTranslationModel) => void }) => {

    let elements: React.ReactNode[] = [];
    for (let item of translations) {

        const index = translations.indexOf(item)

        elements.push(
            <Grid item={true} style={{
                padding: pxSizes.value7px
            }} key={index}>
                <EpisodeCard
                    author={item.author}
                    hosting={item.hosting}
                    quality={item.quality}
                    onClick={() => {
                        onClick(item)
                    }}/>
            </Grid>
        )
    }

    return (
        <Grid container={true} style={{
            height: "auto",
            width: "100%"
        }}>
            {elements}
        </Grid>
    )
}

/**
 * Видеоплеер для загрузки видео
 *
 * @param title название видео
 * @param episode номер эпизода
 * @param url ссылка на видео
 * @param onDismiss коллбэк закрытия видео
 */
const VideoPlayer = ({
    title,
    episode,
    url,
    onDismiss
}: {
    title: string | null,
    episode: number,
    url: string,
    onDismiss: () => void }) => {

    const {theme} = useShikiTheme()

    const windowHeight = useWindowHeight()
    const windowWidth = useWindowWidth()

    const videoPlayerRef = useRef(null)

    const [load, setLoad] = useState(true)
    const [buffer, setBuffer] = useState(false)

    const [player, setPlayer] = useState<ReactPlayer | null>(null)

    const [currentTime, setCurrentTime] = useState(0)

    const [isPlaying, setIsPlaying] = useState(true)

    const [isFullscreen, setFullscreen] = useState(false)

    const [volume, setVolume] = useState(0.5)

    function handleBackward() {
        player?.seekTo(player?.getCurrentTime() - 10)
    }

    function handleForward() {
        player?.seekTo(player?.getCurrentTime() + 10)
    }

    function handleFullscreen() {
        setFullscreen(prevState => !prevState)
        document.body.requestFullscreen().then()
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
                height: isFullscreen ? "100%" : "auto",
                width: isFullscreen ? windowWidth - SIDE_BAR_WIDTH : "auto",
                position: "absolute",
                alignSelf: "center",
                justifyContent: "center",
                alignItems: "center"
            }} onClick={() => {
            }}>
                <ReactPlayer
                    ref={videoPlayerRef}
                    playing={isPlaying}
                    // pip={isPiP}
                    volume={volume}
                    width="100%"
                    height="100%"
                    url={deleteM3u8({url: url})}
                    onReady={(player: ReactPlayer) => {
                        if (player) {
                            setLoad(false)
                            setPlayer(player)
                        }
                        setBuffer(false)
                    }}
                    onProgress={(progress: OnProgressProps) => {
                        setCurrentTime(progress.playedSeconds)
                    }}
                    onBuffer={() => {
                        setBuffer(true)
                    }}
                />

                {load ? null : <VideoPlayerControls
                    title={title}
                    episode={episode}
                    player={player}
                    playedSeconds={currentTime}
                    isPlaying={isPlaying}
                    isFullscreen={isFullscreen}
                    volume={volume}
                    onVolume={(value: number) => {
                        setVolume(value)
                    }}
                    onForward={handleForward}
                    onPlayPause={() => {setIsPlaying(prevState => !prevState)}}
                    onBackward={handleBackward}
                    onFullscreen={handleFullscreen}
                    onDismiss={onDismiss}
                />}

            </div>

            {load || buffer ? <Loader/> : null}
        </div>
    )
}

const iconClose = '/ic_close.png'
const iconPlay = '/ic_play.png'
const iconPause = '/ic_pause.png'
const iconForward = '/ic_forward.png'
const iconBackward = '/ic_backward.png'
const iconFullscreen = '/ic_fullscreen.png'
const iconLeaveFullscreen = '/ic_leave_fullscreen.png'
const iconVolume = '/ic_volume.png'
const iconVolumeMute = '/ic_volume_mute.png'

/**
 * Кнопки видеоплеера
 *
 * @param title название видео
 * @param episode номер эпизода
 * @param player экзмепляр плеера
 * @param playedSeconds количество проигранных секунд
 * @param isPlaying флаг проигрывания
 * @param volume значение громкости
 * @param onVolume коллбэк изменения громкости
 * @param isFullscreen флаг полноэкранного режима
 * @param onBackward коллбэк перемотки назад
 * @param onPlayPause коллбэк нажатия на паузу
 * @param onForward коллбэк перемотки вперёд
 * @param onFullscreen коллбэк перехода в полноэкранный режим
 * @param onDismiss коллбэк закрытия видео
 */
const VideoPlayerControls = ({
    title,
    episode,
    player,
    playedSeconds,
    isPlaying,
    isFullscreen,
    volume,
    onVolume,
    onBackward,
    onPlayPause,
    onForward,
    onFullscreen,
    onDismiss
}: {
    title: string | null,
    episode: number,
    player: ReactPlayer | null,
    playedSeconds: number,
    isPlaying: boolean,
    isFullscreen: boolean,
    volume: number,
    onVolume: (value: number) => void,
    onBackward: () => void,
    onPlayPause: () => void,
    onForward: () => void,
    onFullscreen: () => void,
    onDismiss: () => void
}) => {

    const {theme} = useShikiTheme()

    const buttonsBackground = hexToRgbWithAlpha({hex: theme.background, alpha: 0.05})
    const buttonsHover = hexToRgbWithAlpha({hex: theme.secondary, alpha: 0.3})

    const [show, setShow] = useState(false)

    const [sliderSeek, setSliderSeek] = useState(false)

    const [currentTime, setCurrentTime] = useState(0)
    useEffect(() => {
        if (!sliderSeek) {
            setCurrentTime(currentTime)
        }
    },[playedSeconds])

    const [mute, setMute] = useState(false)
    const [currentVolume, setCurrentVolume] = useState(volume)

    function handleVolumeSlider({value}: {value: number | number[]}) {
        const volume = value as number
        onVolume(volume)
    }

    function handleMute() {
        setMute(prevState => !prevState)
        if (mute) {
            handleVolumeSlider({value: currentVolume})
        } else {
            setCurrentVolume(volume)
            handleVolumeSlider({value: 0})
        }
    }

    function handleSlider({value}: {value: number | number[]}) {
        setSliderSeek(true)
        const time = value as number
        player?.seekTo(time)
        setCurrentTime(time)
        setSliderSeek(false)
    }

    return (
        <div style={{
            display: "flow",
            height: "100%",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            position: "absolute",
            opacity: show ? "1" : "0",
            top: 0,
            transition: transitionThemeChange,
            padding: pxSizes.value14px
        }} onMouseOver={() => {
            setShow(true)
        }}
             onMouseLeave={() => {
                 setShow(false)
             }}>

            <div style={{
                display: "flex",
                width: '100%',
                height: "33%",
                justifyContent: "space-between"
            }}>
                <div style={{
                    display: "flow",
                    height: "auto",
                    width: "auto",
                    justifyContent: "start",
                    alignItems: "start"
                }}>
                    <MyTextOnBackground text={title}/>
                    <MyTextOnBackground text={`${episode} эпизод`} textAlign={'start'}/>
                </div>

                <RoundedIconButton
                    image={iconClose}
                    color={WhiteColorPng}
                    backgroundColor={buttonsBackground}
                    hoverColor={buttonsHover}
                    onClick={onDismiss}/>
            </div>

            <div style={{
                display: "flow",
                width: '100%',
                height: "53%",
                justifyContent: "end",
                alignItems: "center"
            }}>
                <div style={{
                    display: "flex",
                    width: '100%',
                    height: "40%",
                    justifyContent: "end",
                    alignItems: "center"
                }}>
                    <div style={{
                        display: "flow",
                        width: 'auto',
                        height: "90%",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Slider
                            orientation={"vertical"}
                            sx={{
                                '& .MuiSlider-thumb': {
                                    color: theme.secondary
                                },
                                '& .MuiSlider-track': {
                                    color: theme.secondary
                                },
                                '& .MuiSlider-rail': {
                                    color: theme.onBackground
                                },
                                '& .MuiSlider-active': {
                                    color: theme.secondary
                                }
                            }}
                            max={1}
                            min={0}
                            step={0.05}
                            value={volume}
                            onChange={(event, value, activeThumb) => {
                                handleVolumeSlider({value: value})
                            }}
                        />

                        <RoundedIconButton
                            image={mute ? iconVolumeMute : iconVolume}
                            backgroundColor={buttonsBackground}
                            hoverColor={buttonsHover}
                            color={WhiteColorPng}
                            onClick={handleMute}/>
                    </div>
                </div>
            </div>


            <PaddingBySide
                left={pxSizes.value14px}
                right={pxSizes.value14px}
                bottom={pxSizes.value7px}>
                <div style={{
                    display: "flow",
                    width: '100%',
                    height: 'auto',
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <div style={{
                        display: "flex",
                        width: "100%",
                        height: "auto",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <PaddingBySide right={pxSizes.value14px}>
                            <MyText text={player?.getCurrentTime().toVideoTime()} color={DefaultColorPrimary}/>
                        </PaddingBySide>

                        <Slider
                            sx={{
                                '& .MuiSlider-thumb': {
                                    color: theme.secondary
                                },
                                '& .MuiSlider-track': {
                                    color: theme.secondary
                                },
                                '& .MuiSlider-rail': {
                                    color: theme.onBackground
                                },
                                '& .MuiSlider-active': {
                                    color: theme.secondary
                                }
                            }}
                            max={player?.getDuration()}
                            min={0}
                            value={currentTime}
                            onChange={(event, value, activeThumb) => {
                                handleSlider({value: value})
                            }}
                        />

                        <PaddingBySide left={pxSizes.value14px}>
                            <MyText text={player?.getDuration().toVideoTime()} color={DefaultColorPrimary}/>
                        </PaddingBySide>
                    </div>

                    <div style={{
                        display: "flex",
                        width: '100%',
                        height: 'auto',
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}>
                        <div></div>

                        <div style={{
                            display: "flex",
                            width: 'auto',
                            height: 'auto',
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <RoundedIconButton
                                image={iconBackward}
                                backgroundColor={buttonsBackground}
                                hoverColor={buttonsHover}
                                color={WhiteColorPng}
                                paddingRight={pxSizes.value14px}
                                onClick={onBackward}/>

                            <RoundedIconButton
                                image={isPlaying ? iconPause : iconPlay}
                                backgroundColor={buttonsBackground}
                                hoverColor={buttonsHover}
                                color={WhiteColorPng}
                                onClick={onPlayPause}/>

                            <RoundedIconButton
                                image={iconForward}
                                backgroundColor={buttonsBackground}
                                hoverColor={buttonsHover}
                                color={WhiteColorPng}
                                paddingLeft={pxSizes.value14px}
                                onClick={onForward}/>
                        </div>

                        <RoundedIconButton
                            image={isFullscreen ? iconLeaveFullscreen : iconFullscreen}
                            backgroundColor={buttonsBackground}
                            hoverColor={buttonsHover}
                            color={WhiteColorPng}
                            onClick={onFullscreen}/>

                    </div>
                </div>
            </PaddingBySide>
        </div>
    )
}