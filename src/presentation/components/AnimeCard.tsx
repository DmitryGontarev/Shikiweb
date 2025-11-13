import {AnimeModel} from "../../data/models/anime/AnimeModel";
import {ElementCard, InfoColumn} from "./ElementCard";
import {getEmptyIfBothNull} from "../../utils/StringUtils";
import {getYearString} from "../../utils/DateUtils";
import {useShikiNavigateLinks} from "../pages/navigation/useShikiNavigateLinks";

/**
 * Карточка аниме
 *
 * @param anime модель данных аниме
 */
export const AnimeCard = ({anime}: {anime: AnimeModel}) => {

    const {navigateAnimeDetails} = useShikiNavigateLinks()

    function navigate() {
        navigateAnimeDetails({id: anime.id})
    }

    return(
        <ElementCard
            imageUrl={anime.image?.original}
            titleText={getEmptyIfBothNull({str1: anime.russian, str2: anime.name})}
            secondTextOne={anime.kind?.toAnimeTypeScreenString()}
            secondTextTwo={getYearString({dateString: anime.released_on ?? anime.aired_on})}
            onImageClick={navigate}
            onTextClick={navigate}
            info={<InfoColumn
            status={anime.status}
            score={anime.score}
            episodes={anime.episodes}
            episodesAired={anime.episodes_aired}
            dateAired={anime.aired_on}
            dateReleased={anime.released_on}/>}
        />
    )
}