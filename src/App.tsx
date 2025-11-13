import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter} from "react-router-dom";
import {ShikiThemeProvider} from "./presentation/theme/ThemeProvider";
import {AuthProvider} from "./presentation/pages/sidebars/AuthProvider";
import {AppContainerPage} from "./presentation/pages/sidebars/AppContainerPage";

/** Точка входа в браузерное приложение */
function App() {

    return (
        <ShikiThemeProvider>
            <BrowserRouter>
                <AuthProvider>
                    <AppContainerPage/>
                </AuthProvider>
            </BrowserRouter>
        </ShikiThemeProvider>
    );
}

export default App;