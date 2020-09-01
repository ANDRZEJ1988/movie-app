import React, {useCallback, useContext, useEffect} from 'react';
import {useDispatch} from "react-redux";
import './Movielist.scss';
import {DarkThemeContext} from "../../dark-theme-context/DarkThemeContext";
import {UpcomingMovies} from "../upcoming-movies/UpcomingMovies";
import {moviesGet} from "../../function";
import {MoviesInfo} from "../movies-info/MoviesInfo";
import {Pagination} from "antd";

export const Movielist = () => {
    console.log('heelo');
    const dispatch = useDispatch();
    const getMovies = useCallback((current) => moviesGet(current, dispatch), [dispatch]);
    const [isDarkTheme] = useContext(DarkThemeContext);
    useEffect(() => {
        getMovies();
    }, [getMovies]);

    return (
        <div className={`${isDarkTheme && 'dark'}`}>
            <UpcomingMovies/>
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
    )
}

