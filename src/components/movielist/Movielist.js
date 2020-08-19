import React, {useContext, useEffect} from 'react';
import {apiKey} from "../../constants/Menu";
import {useDispatch} from "react-redux";
import './Movielist.scss';
import {DarkThemeContext} from "../../dark-theme-context/DarkThemeContext";
import {UpcomingMovies} from "../upcoming-movies/UpcomingMovies";
import {requestFunction} from "../../function";
import {MoviesInfo} from "../movies-info/MoviesInfo";
import {Pagination} from "antd";

export const Movielist = () => {
    const dispatch = useDispatch();
    const getMovies = async (current) => {
        dispatch({type: "START_LOADING", payload: true});
        const results = await requestFunction(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${current}`);
        const copyResults = [];
        for (const element of results) {
            if (element.poster_path !== null) copyResults.push(element)
        }
        dispatch({type: "GET_MOVIES", payload: copyResults});
        const images = await requestFunction(`https://api.themoviedb.org/3/configuration?api_key=${apiKey}`);
        const {base_url, backdrop_sizes} = images;
        const firstPartUrl = base_url + backdrop_sizes[3];
        dispatch({type: "GET_IMAGE", payload: firstPartUrl});
        const genres = await requestFunction(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`);
        dispatch({type: "GET_GENRE", payload: genres});
        dispatch({type: "END_LOADING", payload: false});
    }
    const [isDarkTheme] = useContext(DarkThemeContext);
    useEffect(() => {
        getMovies();
    }, []);

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

