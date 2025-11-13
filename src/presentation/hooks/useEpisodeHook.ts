import {TranslationType} from "../../data/models/video/TranslationType";
import {useEffect, useState} from "react";
import {getEpisodes, getTranslations, getVideo} from "../../data/network/api/ShimoriVideoApi";
import {ShimoriTranslationModel} from "../../data/models/video/ShimoriTranslationModel";
import {VideoModel} from "../../data/models/video/VideoModel";

/**
 * Функция для работы с данными экрана Эпизоды
 *
 * @param id идентификационный номер произведения
 * @param name название на английском
 * @param episode номер эпизода
 * @param translationType тип трансляции (Субтитры, Озвучка)
 */
export function useEpisodeHook({
    id,
    name,
    episode = 1,
    translationType = TranslationType.SUB_RU
}: {
    id: number | string | null,
    name: string | null,
    episode?: number,
    translationType?: TranslationType
}) {

    const [loading, setLoading] = useState<boolean>(true)

    const [error, setError] = useState<boolean>(false)

    /** текущий выбранный эпизод */
    const [currentEpisode, setCurrentEpisode] = useState(episode)

    /** текущий выбранный тип трансляции */
    const [currentTranslationType, setCurrentTranslationType] = useState(translationType)

    /** текущая трансляция для загрузки видео */
    const [currentTranslation, setCurrentTranslation] = useState<ShimoriTranslationModel | null>(null)

    /** текущее видео для показа */
    const [currentVideo, setCurrentVideo] = useState<VideoModel | null | undefined>(null)

    /** количество эпизодов */
    const [episodes, setEpisodes] = useState<number>()

    /** список трансляций */
    const [translations, setTranslations] = useState<ShimoriTranslationModel[] | null | undefined>([])

    useEffect(() => {
        loadEpisodesSize().then()
    }, [])

    useEffect(() => {
        loadTranslations({
            id: id,
            name: name,
            episode: currentEpisode,
            translationType: currentTranslationType
        }).then()
    }, [currentEpisode, currentTranslationType])

    useEffect(() => {
        if (currentTranslation != null) {
            loadVideo({
                malId: currentTranslation.targetId,
                episode: currentTranslation.episode,
                kind: currentTranslation.kind,
                author: currentTranslation.author,
                hosting: currentTranslation.hosting,
                hostingId: 1,
                videoId: currentTranslation.id,
                url: currentTranslation.url
            }).then()
        }
    }, [currentTranslation])

    /** Загрузка информации о количестве эпизодов в аниме */
    async function loadEpisodesSize() {
        setError(false)
        try {
            await getEpisodes({
                malId: id,
                name: name
            })
                .then(
                    async episodeCount => {
                        await setEpisodes(episodeCount)
                    }
                )
                .catch(async (e) => {

                })
                .finally(() => {

                })
        } catch (e) {
            await loadEpisodesSize()
        }
    }

    /**
     * Загрузка данных трансляции
     *
     * @param id идентификационный номер аниме
     * @param name название аниме на английском
     * @param episode номер эпизода
     * @param hostingId идентификационный номер хостинга
     * @param translationType тип трансляции (оригинал, субтитры, озвучка)
     */
    async function loadTranslations({
        id,
        name,
        episode,
        translationType
    }: {
        id: number | string | null,
        name: string | null,
        episode?: number,
        translationType?: TranslationType
    }) {
        setError(false)
        try {
            setLoading(true)
            await getTranslations({
                malId: id,
                name: name,
                episode: episode,
                kind: translationType
            })
                .then(
                    async translationsList => {
                        await setTranslations(translationsList)
                    }
                )
                .catch(async (e) => {
                    setError(true)
                })
                .finally(async () => {
                    await setLoading(false)
                })
        } catch (e) {
            // const error = e as AxiosError
            // setError(true)

            await loadTranslations({
                id: id,
                name: name,
                episode: episode,
                translationType: translationType
            })
        }
    }

    /** Загрузка ссылок на видео для показа в видеоплеере */
    async function loadVideo({
        malId,
        episode = 1,
        kind,
        author,
        hosting,
        hostingId = 1,
        videoId,
        url,
        accessToken = null
    }: {
        malId: number | string | null,
        episode?: number | null,
        kind: string | null,
        author: string | null,
        hosting: string | null,
        hostingId?: number | null,
        videoId: number | null,
        url: string | null,
        accessToken?: string | null
    }) {
        try {
            await getVideo({
                malId: malId,
                episode: episode,
                kind: kind,
                author: author,
                hosting: hosting,
                hostingId: hostingId,
                videoId: videoId,
                url: url,
                accessToken: accessToken
            })
                .then(
                    async video => {
                        await setCurrentVideo(video)
                        await setCurrentTranslation(null)
                    }
                )
                .catch(async (e) => {

                })
                .finally(async () => {

                })
        } catch (e) {

        }
    }

    return {
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
    }
}