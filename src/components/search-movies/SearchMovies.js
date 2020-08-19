import React, { useContext} from 'react';
import {DarkThemeContext} from "../../dark-theme-context/DarkThemeContext";
import {MoviesInfo} from "../movies-info/MoviesInfo";
import {useSelector} from "react-redux";
import {loading} from "../loading/Loading";

export const SearchMovies =()=> {
    const [isDarkTheme] = useContext(DarkThemeContext);
    const isLoading = useSelector(state => state.isLoading);

        return (
            <div className={`${isDarkTheme && 'dark'}`}>
                {(isLoading && loading()) ||
                  <div>
                <h1>Результат пошуку</h1>
                < MoviesInfo />
                  </div>
                }
            </div>
        );
}

