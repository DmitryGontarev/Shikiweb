import React from "react";
import {Navigate} from "react-router-dom";
import {useShikiNavigator} from "../navigation/useShikiNavigator";
import {useAuthorization} from "./AuthProvider";
import {UserAuthStatus} from "../../../data/models/user/UserAuthStatus";
import {ENTER_LINK} from "../navigation/useShikiNavigateLinks";

/**
 * Обёртка всего сайта для проверки авторизации и перенаправления на нужную ссылку
 *
 * @param children дочерние элементы контейнера
 */
export const AuthContainer = ({children}: { children: React.ReactNode }) => {

    const {location} = useShikiNavigator()

    const {status} = useAuthorization()

    if (status === null || status == UserAuthStatus.UNAUTHORIZED) {
        return <Navigate to={ENTER_LINK} state={{from: location}} replace={true}/>
    }

    return children
}