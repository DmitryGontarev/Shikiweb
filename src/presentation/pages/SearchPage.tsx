import React, {useEffect, useState} from 'react';
import {AnimeModel} from "../../data/models/anime/AnimeModel";
import {hexToRgbWithAlpha} from "../../utils/CommonUtils";
import {InfoColumn, OverPictureTwo, SearchCard} from "../components/ElementCard";
import {getEmptyIfBothNull} from "../../utils/StringUtils";
import {useShikiTheme} from "../theme/ThemeProvider";
import {useSearchHook} from "../hooks/useSearchHook";
import {StackTopContainer} from "../components/StackTopContainer";
import {Grid} from "@mui/material";
import {imageSizes, pxSizes} from "../theme/Sizes";
import {useCheckWindowBottom} from "../components/hooks/useCheckWindowBottom";
import {Spinner} from "react-bootstrap";
import {SEARCH_BY_TITLE_TEXT} from "../../appconstants/Strings";
import {RoundedIconButton} from "../components/RoundedIconButton";
import {DefaultColorOnBackground} from "../theme/Colors";
import {RowSearchField} from "../components/RowSearchField";
import {useShikiNavigateLinks} from "./navigation/useShikiNavigateLinks";


const iconReload = "/ic_reload.png"

/**
 * Экран 'Поиск'
 */
export const SearchPage = React.memo(
    () => {

        const {theme} = useShikiTheme()

        const isBottom = useCheckWindowBottom()

        const {animeList, loading, error, setPage, endReached, search, searchByTitle, fullReset} = useSearchHook()

        useEffect(() => {
            if (isBottom && !endReached && !loading) {
                setPage(prevState => prevState + 1)
            }
        }, [isBottom])

        let loaderElement;

        if (loading) {
            loaderElement = <SearchLoader/>
        }

        let clear: () => void = () => {}

        return (
            <StackTopContainer top={
                <RowSearchField
                    placeholder={SEARCH_BY_TITLE_TEXT}
                    clearText={search === null || search.length === 0}
                    clearString={(func) => {
                        clear = func;
                    }}
                    onChange={async (value: string) => {
                        if (value.length === 0) {
                            await fullReset()
                        }
                    }}
                    onSubmit={async (value: string) => {
                        await searchByTitle({title: value})
                    }}
                    onClearClick={async () => {
                        await fullReset()
                    }}
                    endElement={
                        <RoundedIconButton
                            image={iconReload}
                            backgroundColor={hexToRgbWithAlpha({hex: theme.surface, alpha: 0.7})}
                            onClick={async () => {
                                await fullReset()
                                clear()
                            }}
                            color={theme.onBackgroundPng}
                            borderColor={hexToRgbWithAlpha({hex: DefaultColorOnBackground, alpha: 0.5})}/>
                    }/>
            } underTop={
                <Grid container={true} style={{
                    height: "100%",
                    width: "100%",
                }}>
                    {
                        animeList.map((item: AnimeModel) => <Grid item={true} style={{
                            padding: pxSizes.value7px
                        }} key={item.id}>
                            <SearchAnimeCard anime={item}/>
                        </Grid>)
                    }
                    {loaderElement}
                </Grid>
            }/>
        )
    }
)

/**
 * Карточка аниме для экрана поиска
 *
 * @param anime модель данных аниме
 */
export const SearchAnimeCard = React.memo(
    ({anime}: { anime: AnimeModel | null }) => {

        const [imageVisible, setImageVisible] = useState(true)

        const {navigateAnimeDetails} = useShikiNavigateLinks()

        function goToDetails() {
            navigateAnimeDetails({id: anime?.id})
        }

        return (
            <SearchCard
                isShowInfo={imageVisible}
                imageUrl={anime?.image?.original}
                info={InfoColumn({
                        status: anime?.status,
                        score: anime?.score,
                        episodes: anime?.episodes,
                        episodesAired: anime?.episodes_aired,
                        dateAired: anime?.aired_on,
                        dateReleased: anime?.released_on
                    }
                )}
                overPicture={OverPictureTwo({
                    leftTopText: anime?.kind?.toAnimeTypeScreenString(),
                    centerText: getEmptyIfBothNull({str1: anime?.russian, str2: anime?.name}),
                    onTitleClick: goToDetails,
                    onTitleHover: (focus) => {
                        setImageVisible(!focus)
                    }
                })}
                onClick={goToDetails}
            />
        )
    }
)

/**
 * Карточка, отображаемая в конце списка при загрузке
 */
export const SearchLoader = () => {

    const {theme} = useShikiTheme()

    return (
        <Grid item={true} style={{
            padding: pxSizes.value7px
        }}>
            <div style={{
                height: imageSizes.coverHeight,
                width: imageSizes.coverWidth,
                alignItems: "center",
                justifyContent: "center",
                border: `1px solid ${theme.onBackground}`,
                borderRadius: pxSizes.value7px,
            }}>
                <div style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    left: '45%',
                    top: '45%',
                }}>
                    <Spinner style={{
                        color: theme.secondary,
                        alignSelf: 'center'
                    }}></Spinner>
                </div>
            </div>
        </Grid>
    )
}