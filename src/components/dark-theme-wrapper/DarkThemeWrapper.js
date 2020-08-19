import React, {useState} from 'react';
import {DarkThemeContext} from "../../dark-theme-context/DarkThemeContext";

export const  DarkThemeWrapper =(props)=> {
const [isDarkTheme, setIsDarkTheme]=useState(true);
const {children}=props;
        return (
            <DarkThemeContext.Provider value={[isDarkTheme, setIsDarkTheme]}>
                {children}
            </DarkThemeContext.Provider>
        );
}

