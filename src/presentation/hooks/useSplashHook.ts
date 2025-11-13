import {useState} from "react";
import {UserBriefModel} from "../../data/models/user/UserBriefModel";
import {getCurrentUserBriefInfo} from "../../data/network/api/UserApi";
import {HTTP_200_STATUS_OK} from "../../appconstants/HttpStatusCode";

/**
 * Функция для работы с данными экрана Старта (Splash)
 */
export function useSplashHook() {

    const [loading, setLoading] = useState<boolean>(false)

    const [error, setError] = useState<boolean>(false)

    const [userBrief, setUserBrief] = useState<UserBriefModel | null>(null)

    const [showEnter, setShowEnter] = useState<boolean>(false)

    async function getUserBrief() {
        setError(false)
        try {
            setLoading(true)
            await getCurrentUserBriefInfo()
                .then(
                    response => {
                        if (response.status === HTTP_200_STATUS_OK && response.data == null) {
                            setShowEnter(true)
                        }

                        if (response.status === HTTP_200_STATUS_OK && response.data != null) {
                            setUserBrief(response.data)
                        }
                    }
                )
                .catch((e) => {
                    setError(true)
                })
                .finally(() => {
                    setLoading(false)
                })
        } catch (e) {
            setError(true)
        }
    }

    async function startLoading() {
        await getUserBrief()
    }

    return { loading, error, userBrief, startLoading, showEnter }
}