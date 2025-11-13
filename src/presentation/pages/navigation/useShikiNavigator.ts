
import {useLocation, useNavigate} from "react-router";
import {STANDARD_START_LINK} from "./useShikiNavigateLinks";

/**
 * Кастомный хук для использования useNavigate из React Router
 */
export const useShikiNavigator = () => {

    // const history = window.history
    //
    // useEffect(() => {
    //     consolePrint(`HISTORY LENGTH = ${history.length}`)
    // }, [history.length])

    const location = useLocation()

    const navigator = useNavigate()

    /**
     * Функция перехода по следующей по ссылке
     *
     * @param link ссылка
     */
    function navigateNext({link}: {link: string}) {
        navigator(link)
    }

    /**
     * Функция перехода на предыдущие ссылки
     *
     * @param previousPage номер страницы с конца
     */
    function navigateBack({pageNumber = -1} :{pageNumber?: number}) {
        if (window.history?.length || window.history.state?.idx) {
            if (pageNumber < 0) {
                const page = (window.history?.length > -pageNumber) ? pageNumber : -1
                navigator(page)
            }
        } else {
            navigator(STANDARD_START_LINK, {replace: true})
        }
    }

    /**
     * Функция перехода на предыдущую страницу
     */
    function navigatePreviousPage() {
        navigateBack({pageNumber: -1})
    }

    /**
     * Функция перехода по следующей по ссылке с заменой текущей в истории браузера
     *
     * @param link ссылка
     */
    function navigateReplace(link: string) {
        navigator(link, {replace: true})
    }

    /**
     * Функция перехода по следующей по ссылке с заменой текущей в истории браузера
     *
     */
    function navigateMainPage() {
        navigator(STANDARD_START_LINK, {replace: true})
    }

    return {
        location,
        navigator,
        navigateNext,
        navigateBack,
        navigatePreviousPage,
        navigateReplace,
        navigateMainPage
    }
}