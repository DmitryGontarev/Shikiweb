import React from "react";
import {pxSizes} from "../theme/Sizes";

/**
 * Отступ для всех сторон
 *
 * @param all величина всех оступов
 */
export const PaddingAll = React.memo(
    ({
         all = pxSizes.value7px, children
     }: {
         all?: string | number,
         children: React.ReactNode
     }
    ) => {
        return (
            <div style={{
                padding: all
            }}>
                {children}
            </div>
        )
    }
)

/**
 * Отступ для определённой стороны
 *
 * @param left величина левого отступа
 * @param top величина верхнего отступа
 * @param right величина правого отступа
 * @param bottom величина нижнего отступа
 */
export const PaddingBySide = React.memo(
    ({
         left = 0,
         top = 0,
         right = 0,
         bottom = 0,
         children
     }: {
         left?: string | number,
         top?: string | number,
         right?: string | number,
         bottom?: string | number,
         children: React.ReactNode
     }
    ) => {
        return (
            <div style={{
                paddingLeft: left,
                paddingTop: top,
                paddingRight: right,
                paddingBottom: bottom
            }}>
                {children}
            </div>
        )
    }
)