import React, {useState} from "react";
import {pxSizes} from "../theme/Sizes";
import {MyText} from "./Texts";
import {useShikiTheme} from "../theme/ThemeProvider";

/**
 * Базовая кнопка
 *
 * @param btnText
 * @param btnColor
 * @param borderColor
 * @param onClick
 */
export const MyButton = React.memo(
    ({
         btnText,
         btnColor,
         borderColor,
         onClick
     }: {
         btnText: string,
         btnColor: string,
         borderColor: string,
         onClick: () => void
     }
    ) => {

        const {theme} = useShikiTheme()

        const [hover, setHover] = useState<boolean>(false)

        return (
            <div style={{
                padding: pxSizes.value7px
            }}
                 onMouseOver={() => {
                     setHover(true)
                 }}
                 onMouseLeave={() => {
                     setHover(false)
                 }}
                 onClick={onClick}>
                <button style={{
                    backgroundColor: btnColor,
                    borderRadius: pxSizes.value7px,
                    borderColor: hover ? theme.onPrimary : borderColor
                }}>
                    <div style={{
                        padding: pxSizes.value3px
                    }}>
                        <MyText text={btnText}/>
                    </div>
                </button>
            </div>
        )
    }
)