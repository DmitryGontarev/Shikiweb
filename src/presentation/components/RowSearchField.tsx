import React, {useEffect, useState} from "react";
import {transitionThemeChange, useShikiTheme} from "../theme/ThemeProvider";
import {pxSizes} from "../theme/Sizes";
import {hexToRgbWithAlpha} from "../../utils/CommonUtils";
import {RoundedIconButton} from "./RoundedIconButton";
import {useWindowWidth} from "./hooks/useWindowWidthHeight";
import {DefaultColorOnBackground} from "../theme/Colors";

const closeIcon = "/ic_close.png"

const rowSearchWidth = 700;

/**
 * Поле поиска для всех экранов
 *
 * @param placeholder подсказка в поле ввода
 * @param clearText флаг очистки поля ввода
 * @param value значение поля ввода
 * @param onChange коллбэк изменения поля ввода (выбрасывает введённую строку)
 * @param onSubmit события нажатия на клавиатуру
 * @param onClearClick коллбэк нажатия на кнопку очистки поля ввода
 * @param startElement опциональный элемент перед полем ввода
 * @param endElement опциональный элемент после поля ввода
 */
export const RowSearchField = React.memo(
    ({
         placeholder,
         clearText,
         onChange,
         onSubmit,
         onClearClick,
         clearString,
         startElement,
         endElement
     }: {
        placeholder?: string | null,
        clearText?: boolean,
        onChange: (value: string) => void,
        onSubmit: (value: string) => void,
        onClearClick: () => void,
        clearString: (func: () => void) => void,
        startElement?: React.ReactNode | null,
        endElement?: React.ReactNode | null
    }) => {

        const {theme} = useShikiTheme()

        const windowWidth = useWindowWidth()

        const [rowWidth, setRowWidth] = useState<number>(rowSearchWidth)

        const [input, setInput] = useState<string>('')

        function clearStr() {
            setInput('')
        }

        useEffect(() => {
            onChange(input)
        }, [input])

        useEffect(() => {
            if (clearText) {
                setInput('')
            }
        }, [clearText])

        useEffect(() => {
            if (windowWidth * 0.8 > rowSearchWidth) {
                setRowWidth(rowSearchWidth)
            } else {
                setRowWidth(windowWidth * 0.4)
            }
        }, [windowWidth])

        function handleSubmit(event: React.KeyboardEvent<HTMLInputElement>) {
            if (event.key === 'Enter') {
                onSubmit(input)
            }
        }

        clearString(clearStr)

        let clearBtn;

        if (input?.length ?? 0 > 0) {
            clearBtn = <RoundedIconButton
                image={closeIcon}
                paddingLeft={pxSizes.value3px}
                paddingTop={pxSizes.value7px}
                borderColor={hexToRgbWithAlpha({hex: DefaultColorOnBackground, alpha: 0.5})}
                onClick={() => {
                    setInput('')
                    onClearClick()
                }}/>
        } else {
            clearBtn = null
        }

        return (
            <div style={{
                display: "flex",
                height: pxSizes.value100px,
                width: "auto",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <div style={{
                    display: "flex",
                    verticalAlign: "middle",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    paddingRight: pxSizes.value7px
                }}>
                    {startElement}
                </div>

                <div style={{
                    width: "100%",
                    display: "flex",
                    verticalAlign: "middle",
                    alignItems: "center",
                    justifyContent: "end",
                }}>

                    <input
                        name={'baseInput'}
                        type={'text'} value={input}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setInput(event.target.value)}
                        placeholder={placeholder ?? ''}
                        onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                            handleSubmit(event)
                        }}
                        style={{
                            width: rowWidth,
                            height: pxSizes.value50px,
                            background: hexToRgbWithAlpha({hex: theme.surface, alpha: 0.7}),
                            color: theme.onPrimary,
                            borderColor: theme.onBackground,
                            borderWidth: 1,
                            borderRadius: pxSizes.value7px,
                            padding: pxSizes.value25px,
                            transition: transitionThemeChange
                        }}
                    />

                    <div style={{
                        position: "absolute",
                        display: "flex",
                        verticalAlign: "middle",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                        paddingLeft: pxSizes.value7px
                    }}>
                        {clearBtn}
                    </div>

                </div>

                <div style={{
                    display: "flex",
                    verticalAlign: "middle",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    paddingTop: pxSizes.value7px,
                    paddingLeft: pxSizes.value7px
                }}>
                    {endElement}
                </div>
            </div>
        )
    }
)