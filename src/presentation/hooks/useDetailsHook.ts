import {useEffect, useState} from "react";
import {AnimeDetailsModel} from "../../data/models/anime/AnimeDetailsModel";
import {DetailsScreenType} from "../PagesEnums";
import {
    getAnimeDetailsById, getAnimeExternalLinksById,
    getAnimeRolesById,
    getAnimeScreenshotsById, getRelatedAnime,
    getSimilarAnime
} from "../../data/network/api/AnimeApi";
import {AxiosError} from "axios";
import {RolesModel} from "../../data/models/common/RolesModel";
import {CharacterModel} from "../../data/models/roles/CharacterModel";
import {ScreenshotModel} from "../../data/models/anime/ScreenshotModel";
import {RelatedModel} from "../../data/models/common/RelatedModel";
import {AnimeModel} from "../../data/models/anime/AnimeModel";
import {LinkModel} from "../../data/models/common/LinkModel";

require("../../utils/CommonUtils")

/**
 * Функция для работы с данными экрана Детальной информации
 *
 * @param detailsType тип запроса детальной информации
 * @param id идентификационный номер произведения
 */
export function useDetailsHook({detailsType, id}: {detailsType: DetailsScreenType | null, id: number | null}) {

    /** флаг состояния загрузки  */
    const [loading, setLoading] = useState<boolean>(true)

    /** флаг ошибки загрузки */
    const [error, setError] = useState<boolean>(false)

    /** детальная информация об аниме */
    const [animeDetails, setAnimeDetails] = useState<AnimeDetailsModel>()

    /** роли и персонажи */
    const [roles, setRoles] = useState<RolesModel[]>([])
    const [characters, setCharacters] = useState<CharacterModel[]>([])
    const [mainCharacters, setMainCharacters] = useState<CharacterModel[]>([])
    const [supportingCharacters, setSupportingCharacters] = useState<CharacterModel[]>([])

    /** кадры из аниме */
    const [screenshots, setScreenshots] = useState<ScreenshotModel[]>([])

    /** список произведений связанных с текущим */
    const [related, setRelated] = useState<RelatedModel[]>([])

    /** список похожих аниме */
    const [animeSimilar, setAnimeSimilar] = useState<AnimeModel[]>([])

    /** список внешних ссылок на произведение */
    const [externalLinks, setExternalLinks] = useState<LinkModel[]>([])


    useEffect(() => {
        if (id != null) {

            if (detailsType == DetailsScreenType.ANIME) {
                loadAnimeData().then()
            }

        }
    }, [id])

    /**
     * Функция для загрузки всей детальной информации об Аниме
     */
    async function loadAnimeData() {
        await setError(false)
        await setLoading(true)
        await loadAnimeDetails()
        await loadRoles()
        await loadScreenshots()
        await loadAnimeSimilar()
        await loadRelated()
        await loadLinks()

        await setLoading(false)
    }

    /** Загрузка детальной информации об Аниме из сети */
    async function loadAnimeDetails() {
        try {
            await getAnimeDetailsById({id: id})
                .then(
                    anime => {
                        setAnimeDetails(anime)
                    }
                )
                .catch(async (e) => {
                    await setError(true)
                })
                .finally(() => {

                })
        } catch (e) {
            const error = e as AxiosError
            await setError(true)
        }
    }

    /** Загрузка Персонажей и Людей, принимавших участие в создании Аниме/Манги/Ранобэ */
    async function loadRoles() {
        try {
            await getAnimeRolesById({id: id})
                .then(
                    async roles => {
                        await setRolesAndCharacters({roles: roles})
                    }
                )
                .catch(() => {

                })
                .finally(() => {

                })
        } catch (e) {
            const error = e as AxiosError
        }
    }

    // ключи определения роли персонажа
    const MAIN_CHARACTER: string = "Main";
    const SUPPORTING_CHARACTER: string = "Supporting";

    /** функция для установки состояний ролей и персонажей */
    async function setRolesAndCharacters({roles}: {roles: RolesModel[]}) {
        await setRoles(roles)

        let main: CharacterModel[] = []
        let support: CharacterModel[] = []

        const characters = roles.filter((item: RolesModel) => {
            return item.character != null
        })

        for (let role of characters) {
            if (role.roles?.includes(MAIN_CHARACTER)) {
                role.character?.let((it: CharacterModel) => {
                    main.push(it)
                })
            } else {
                if (role.roles?.includes(SUPPORTING_CHARACTER)) {
                    role.character?.let((it: CharacterModel) => {
                        support.push(it)
                    })
                } else {
                    role.character?.let((it: CharacterModel) => {
                        support.push(it)
                    })
                }
            }
        }

        let allCharacters: CharacterModel[] = []

        allCharacters.push(...main)
        allCharacters.push(...support)

        await setCharacters(allCharacters)
        await setMainCharacters(main)
        await setSupportingCharacters(support)
    }

    /** Загрузка кадров из аниме */
    async function loadScreenshots() {
        try {
            await getAnimeScreenshotsById({id: id})
                .then(
                    async screenshots => {
                       await setScreenshots(screenshots)
                    }
                ).catch(() => {

                })
                .finally(() => {

                })
        } catch (e) {
            const error = e as AxiosError
        }
    }

    /** Загрузка Связанных произведений */
    async function loadRelated() {
        try {
            await getRelatedAnime({id: id})
                .then(
                    async related => {
                        setRelated(related)
                    }
                )
                .catch(() => {

                })
                .finally(() => {

                })
        } catch (e) {

        }
    }

    /** Загрузка Похожего аниме */
    async function loadAnimeSimilar() {
        try {
            await getSimilarAnime({id: id})
                .then(
                    async anime => {
                        await setAnimeSimilar(anime)
                    }
                )
                .catch(() => {

                })
                .finally(() => {

                })
        } catch (e) {

        }
    }

    /** Загрузка ссылок на связанные сайты */
    async function loadLinks() {
        try {
            await getAnimeExternalLinksById({id: id})
                .then(
                    async links => {
                        await setExternalLinks(links)
                    }
                )
                .catch(() => {

                })
                .finally(() => {

                })
        } catch (e) {

        }
    }

    return { loading, error, animeDetails, characters, screenshots, related, animeSimilar }
}