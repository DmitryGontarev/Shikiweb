import React, {useContext, useLayoutEffect, useState} from "react";
import {getUserAuthStatus, getUserId, setUserAuthStatus, setUserId} from "../../../data/local/UserLocalRepository";
import {UserAuthStatus} from "../../../data/models/user/UserAuthStatus";

/** Тип авторизации для createContext() */
type ShikiAuthorization = {
    status: UserAuthStatus | null,
    userId: string | null,
    setUserId: ({userId} : {userId: string}) => void,
    setUserStatus:  ({userStatus} : {userStatus: UserAuthStatus}) => void
}

/** Контекст авторизации */
const AuthContext = React.createContext<ShikiAuthorization>({
    status: null,
    userId: null,
    setUserId: () => void {},
    setUserStatus: () => void {},
})

/** Хук для получения контекста Авторизации */
export const useAuthorization = () => {
    return useContext(AuthContext)
}

/**
 * Поставщик авторизации
 *
 * @param children дочерние элементы контейнера
 */
export const AuthProvider = React.memo(
    ({children}: {children: React.ReactNode}) => {

        const [authStatus, setAuthStatusState] = useState<UserAuthStatus | null>(getUserAuthStatus())

        const [userId, setUserIdState] = useState<string | null>(getUserId)

        const setStatus = ({userStatus} : {userStatus: UserAuthStatus}) => {
            // сохранение статуса авторизации в хранилище
            setUserAuthStatus({userAuthStatus: userStatus})

            updateProviderData()
        }

        const setId = ({userId}: {userId: string}) => {
            // сохранение ID пользователя в хранилище
            setUserId({userId: userId})

            updateProviderData()
        }

        const providerAuth: ShikiAuthorization = {
            status: authStatus,
            userId: userId,
            setUserId: setId,
            setUserStatus: setStatus
        }

        useLayoutEffect(() => {
            updateProviderData()
        })

        /** Функция для обновления локальных состояний AuthProvider */
        function updateProviderData() {
            // сохранение статуса авторизации в состояние AuthProvider
            setAuthStatusState(getUserAuthStatus())

            // сохранение ID пользователя в состояние AuthProvider
            setUserIdState(getUserId)
        }

        return(
            <AuthContext.Provider value={providerAuth}>
                {children}
            </AuthContext.Provider>
        )
    }
)