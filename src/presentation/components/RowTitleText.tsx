import {PaddingAll} from "./PaddingAll";
import {MyTextBold} from "./Texts";
import {pxSizes, textSizes} from "../theme/Sizes";

/**
 * Строка заголовка
 */
export const RowTitleText = ({text}: {text: string | null}) => {
  return (
      <div style={{
          display: "flex",
          width: "100%",
          height: "100%",
          justifyContent: "start",
          alignSelf: "center"
      }}>
          <PaddingAll all={pxSizes.value14px}>
              <MyTextBold text={text} fontSize={textSizes.big}/>
          </PaddingAll>
      </div>
  )
}