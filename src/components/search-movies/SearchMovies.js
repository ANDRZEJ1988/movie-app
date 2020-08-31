import React, { useContext} from 'react';
import {DarkThemeContext} from "../../dark-theme-context/DarkThemeContext";
import {MoviesInfo} from "../movies-info/MoviesInfo";
import {useSelector} from "react-redux";
import {loading} from "../loading/Loading";
import {isLoadingSelector} from "../../store/selectors";
import {strings} from "../../strings/strings";

export const SearchMovies =()=> {
    const [isDarkTheme] = useContext(DarkThemeContext);
    const isLoading = useSelector(isLoadingSelector);

        return (
            <div className={`${isDarkTheme && 'dark'}`}>
                {(isLoading && loading()) ||
                  <div>
                <h1>{strings.result}</h1>
                < MoviesInfo />
                  </div>
                }
            </div>
        );
}

