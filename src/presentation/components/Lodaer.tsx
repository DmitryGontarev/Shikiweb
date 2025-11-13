import {Spinner} from "react-bootstrap";
import React from "react";
import {useShikiTheme} from "../theme/ThemeProvider";
import {StackTopContainer} from "./StackTopContainer";
import {ToolbarForApp} from "./ToolbarForApp";
import {MyText} from "./Texts";
import {pxSizes, textSizes} from "../theme/Sizes";
import {WhiteColorPng} from "../theme/Colors";

/**
 * Показ загрузки экрана
 */
export const Loader = () => {

    const {theme} = useShikiTheme()

    return (
        <div style={{
            display: "flex",
            width: "100vw",
            height: "100vh",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <Spinner style={{
                color: theme.secondary,
                alignSelf: 'center'
            }}></Spinner>
        </div>
    )
}

/**
 * Показ загрузки экрана
 */
export const LoaderWithBackButton = () => {

    const {theme} = useShikiTheme()

    return (
        <StackTopContainer isPadding={false} top={
            <ToolbarForApp/>
        } underTop={
            <div style={{
                display: "flex",
                width: "100vw",
                height: "100vh",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <Spinner style={{
                    color: theme.secondary,
                    alignSelf: 'center'
                }}></Spinner>
            </div>
        }/>
    )
}

export const ElementLoader = () => {

    const {theme} = useShikiTheme()

    return (
        <div style={{
            width: "100%",
            height: "100%",
            left: '50%',
            top: '50%',
        }}>
            <Spinner style={{
                color: theme.secondary,
                alignSelf: 'center'
            }}></Spinner>
        </div>
    )
}

const iconNotFound = '/ic_not_found.png'

/**
 * Показ загрузки экрана
 */
export const ErrorMessage = () => {

    const {theme} = useShikiTheme()

    return (
        <div style={{
            display: "flex",
            width: "100vw",
            height: "100vh",
            justifyContent: "center",
            alignItems: "start",
        }}>
            <div style={{
                display: "flow",
                height: "auto",
                width: "auto",
                justifyContent: "center",
                alignItems: "start",
                paddingTop: 50
            }}>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "start",
                    paddingBottom: pxSizes.value14px
                }}>
                    <img
                        src={iconNotFound}
                        style={{
                            height: 100,
                            width: 100,
                            filter: theme.secondaryPng
                        }}/>
                </div>
                <MyText text={"Произошла ошибка"} fontSize={textSizes.big}/>
                <MyText text={"Попробуйте обновить страницу"} fontSize={textSizes.big}/>
            </div>

        </div>
    )
}