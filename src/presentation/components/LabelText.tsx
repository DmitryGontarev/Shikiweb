import {pxSizes, textSizes} from "../theme/Sizes";
import {MyText, MyTextOnBackground} from "./Texts";

export const TextLabel = ({
    paddingAll = pxSizes.value7px,
    text,
    labelText,
    textSize = textSizes.defaultForApp,
    labelSize = textSizes.min
}: { paddingAll?: string | number, text: string | null | undefined, labelText: string | null | undefined, textSize?: string | number, labelSize?: string | number }) => {

    return(
        <div style={{
            display: "flow",
            padding: paddingAll,
            justifyContent: "center",
            alignItems: "center"
        }}>
            <MyText text={text} fontSize={textSize}/>
            <MyTextOnBackground text={labelText} fontSize={labelSize}/>
        </div>
    )
}