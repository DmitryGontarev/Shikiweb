import {Route, Routes} from "react-router-dom";
import {ENTER_LINK, SIDEBAR_LINK} from "../navigation/useShikiNavigateLinks";
import {AuthContainer} from "./AuthContainer";
import {GuestSidebar} from "./GuestSidebar";
import React from "react";
import {EnterPage} from "../EnterPage";

/**
 * Общий контейнер страниц приложения
 */
export const AppContainerPage = () => {
    return (
        <Routes>
            <Route path={ENTER_LINK} element={EnterPage()}/>
            <Route path={SIDEBAR_LINK} element={
                AuthContainer({children: GuestSidebar()})
            }/>
        </Routes>
    )
}