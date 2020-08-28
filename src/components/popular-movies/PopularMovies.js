import React, {useCallback, useContext, useEffect} from 'react';
import {useDispatch} from "react-redux";
import {getPopularMovies} from "../../function";
import {MoviesInfo} from "../movies-info/MoviesInfo";
import {DarkThemeContext} from "../../dark-theme-context/DarkThemeContext";
import {Pagination} from "antd";
import {strings} from "../../strings/strings";

export const PopularMovies = () => {
    const dispatch = useDispatch();
    const getMovies=useCallback((current)=>getPopularMovies(current, dispatch),[dispatch]);
        const [isDarkTheme] = useContext(DarkThemeContext);
    useEffect(() => {
        getMovies();
    }, [getMovies]);

    return (
        <div className={`${isDarkTheme && 'dark'}`}>
            <h1>{strings.best}</h1>
            <div className="pagin">
                <Pagination
                    defaultCurrent={1}
                    total={10}
                    onChange={(current) => getMovies(current)}
                    defaultPageSize={1}
                />
            </div>
            <MoviesInfo/>
        </div>
    );
}

