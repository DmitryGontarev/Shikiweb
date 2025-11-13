import React, {useRef} from "react";
import {useWindowWidth} from "./hooks/useWindowWidthHeight";
import {useDragScroll} from "./hooks/useDragScroll";
import {SIDE_BAR_WIDTH} from "./Sidebar";

/**
 * Горизонтальный список элементов с прокруткой курсором мыши
 *
 * @param elements список элементов
 */
export const HorizontalScrollList = ({elements}: {elements: React.ReactNode[]}) => {

    /** ширина окна браузера */
    const windowWidth = useWindowWidth()

    /** ссылка на горизонтальный список с карточками календаря */
    const ref = useRef(null);

    /** события прокрутки курсором мыши */
    const {events} = useDragScroll({ref: ref, scrollY: false})

    return(
        <div ref={ref}
             {...events}
             style={{
                 display: "flex",
                 flexDirection: "row",
                 width: windowWidth - SIDE_BAR_WIDTH,
                 height: "auto",
                 overflow: "clip",
                 justifyContent: "start",
                 alignItems: "start",
                 overflowX: "hidden"
             }}>

            {elements}

        </div>
    )
}