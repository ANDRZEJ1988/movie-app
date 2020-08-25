import React, {useCallback, useContext, useEffect} from 'react';
import {useDispatch} from "react-redux";
import {apiKey} from "../../constants/Menu";
import {requestFunction} from "../../function";
import {MoviesInfo} from "../movies-info/MoviesInfo";
import {DarkThemeContext} from "../../dark-theme-context/DarkThemeContext";
import {Pagination} from "antd";

export const PopularMovies = () => {
    const dispatch = useDispatch();
    const getMovies = useCallback(async (current) => {
        dispatch({type: "START_LOADING", payload: true});
        const results = await requestFunction(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=${current}`);
        const copyResults = [];
        for (const element of results) {
            if (element.poster_path !== null) copyResults.push(element)
        }
        dispatch({type: "GET_MOVIES", payload: copyResults});
        dispatch({type: "END_LOADING", payload: false});
    }, [dispatch]);
    const [isDarkTheme] = useContext(DarkThemeContext);
    useEffect(() => {
        getMovies();
    }, [getMovies]);

    return (
        <div className={`${isDarkTheme && 'dark'}`}>
            <h1>Найкращі фільми за рейтингом</h1>
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

