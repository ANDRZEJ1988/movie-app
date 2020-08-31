import React from 'react';
import './App.css';
import {Footer} from "../footer/Footer";
import {BrowserRouter as Router} from "react-router-dom";
import {Header} from "../header/Header";
import {DarkThemeWrapper} from "../dark-theme-wrapper/DarkThemeWrapper";
import {Navigation} from "../navigation/Navigation";


export function App() {
    return (
        <DarkThemeWrapper>
            <Router>
                <Header/>
                <Navigation/>
                <Footer/>
            </Router>
        </DarkThemeWrapper>
    )
}

export default App;

