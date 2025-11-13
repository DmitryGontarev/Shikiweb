import {useShikiTheme} from "../theme/ThemeProvider";
import {MyTextSemiBold} from "../components/Texts";
import {ENTER_LIKE_GUEST_TITLE, ENTER_TITLE, SHIKIWEB_LOGO_TITLE} from "../../appconstants/Strings";
import {MyButton} from "../components/MyButton";
import {PaddingAll} from "../components/PaddingAll";
import {useShikiNavigator} from "./navigation/useShikiNavigator";
import {CALENDAR_LINK} from "./navigation/useShikiNavigateLinks";
import {useAuthorization} from "./sidebars/AuthProvider";
import {UserAuthStatus} from "../../data/models/user/UserAuthStatus";
import {clearUser} from "../../data/local/UserLocalRepository";
import React, {useEffect, useState} from "react";
import {useSplashHook} from "../hooks/useSplashHook";
import {LinearProgress} from "@mui/material";
import {delay} from "../../utils/CommonUtils";

const logoIcon = "/shikimori_logo.png"

/**
 * Страницы входа с иконкой, названием сайта и двумя кнопками выбора типа входа
 */
export const EnterPage = () => {

    const {theme} = useShikiTheme()

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // SPLASH
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const {loading, error, startLoading, showEnter} = useSplashHook()

    const [siteName, setSiteName] = useState<string>('')

    const [showProgress, setShowProgress] = useState<boolean>(false)

    async function setString() {
        if (siteName !== SHIKIWEB_LOGO_TITLE) {
            let string = ''
            for (let c of SHIKIWEB_LOGO_TITLE) {
                string = string + c
                setSiteName(string)
                await delay({delay: 100})
            }
            setShowProgress(true)
            await startLoading()
        }
    }

    useEffect(() => {
        setString().then()
    }, [])

    let screenlogoIcon: JSX.Element = <PaddingAll>
        <img src={logoIcon} style={{
            width: 100,
            height: 100,
            alignSelf: "center",
            justifyContent: "center",
            filter: theme.onPrimaryPng,
        }} alt={''}/>
    </PaddingAll>

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // ENTER
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const {setUserStatus} = useAuthorization()

    const {navigateReplace} = useShikiNavigator()

    let linearProgress: JSX.Element | null = null

    if (showProgress) {
        linearProgress = <PaddingAll>
            <div style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <div style={{
                    width: "80%",
                    display: "flow",
                    alignSelf: "center",
                }}>
                    <LinearProgress sx={{
                        backgroundColor: 'transparent',
                        '& .MuiLinearProgress-bar': {
                            backgroundColor: theme.secondary
                        }
                    }} variant={"indeterminate"}/>
                </div>
            </div>
        </PaddingAll>
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // SPLASH
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    let splash: JSX.Element = <div style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center"
    }}>

        <div style={{
            display: "flow",
            width: "auto",
            height: "auto",
            alignItems: "center",
            justifyContent: "center",
        }}>

            <div style={{
                display: "flex",
                width: "auto",
                height: "auto",
                alignItems: "center",
                justifyContent: "center",
            }}>

                <PaddingAll>
                    <MyTextSemiBold text={siteName} fontSize={50}/>
                </PaddingAll>

                {screenlogoIcon}
            </div>

            {linearProgress}

        </div>

    </div>

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // ENTER
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    let enter: JSX.Element = <div style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center"
    }}>

        <div style={{
            display: "flow",
            width: "auto",
            height: "auto",
            alignItems: "center",
            justifyContent: "center"
        }}>

            <div style={{
                display: "flex",
                width: "auto",
                height: "auto",
                alignItems: "center",
                justifyContent: "center",
            }}>
                {screenlogoIcon}
            </div>

            <PaddingAll>
                <MyTextSemiBold text={SHIKIWEB_LOGO_TITLE} fontSize={27}/>
            </PaddingAll>

            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>

                <MyButton
                    btnText={ENTER_LIKE_GUEST_TITLE}
                    btnColor={"transparent"}
                    borderColor={theme.secondary}
                    onClick={() => {
                        setUserStatus({userStatus: UserAuthStatus.GUEST})
                        navigateReplace(CALENDAR_LINK)
                    }}
                />

                <MyButton
                    btnText={ENTER_TITLE}
                    btnColor={theme.secondary}
                    borderColor={'transparent'}
                    onClick={() => {
                        clearUser()
                    }}
                />

            </div>

        </div>

    </div>

    let screen: JSX.Element

    if (!showEnter) {
        screen = splash
    } else {
        screen = enter
    }

    return (
        screen
    )
}