import React, {useState} from 'react';
import {DarkThemeContext, LanguageContext} from "../../dark-theme-context/DarkThemeContext";

export const DarkThemeWrapper = (props) => {
    const [isDarkTheme, setIsDarkTheme] = useState(true);
    const [language, setlanguage] = useState('en');
    const {children} = props;
    return (
        <DarkThemeContext.Provider value={[isDarkTheme, setIsDarkTheme]}>
            <LanguageContext.Provider value={[language, setlanguage]}>
                {children}
            </LanguageContext.Provider>
        </DarkThemeContext.Provider>
    );
}

