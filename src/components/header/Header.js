import React, {useContext} from 'react';
import './Header.scss';
import Logo from "../../assets/logo.png";
import {apiKey} from "../../constants/Menu";
import {NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import {DarkThemeContext} from "../../dark-theme-context/DarkThemeContext";
import {requestFunction} from "../../function";
import {useHistory} from 'react-router-dom';
import {Input} from 'antd';
import 'antd/dist/antd.css';

export const Header = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {Search} = Input;
    const serchMovie = async (movieName) => {
        dispatch({type: "START_LOADING", payload: true});
        if (movieName.length === 0) {
            alert("Введіть назву фільма");
            dispatch({type: "END_LOADING", payload: false});
            return
        }
        const results = await requestFunction(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${movieName}&page=1&include_adult=false`);
        const copyResults = [];
        for (const element of results) {
            if (element.poster_path !== null) copyResults.push(element)
        }
        if (copyResults.length === 0) {
            alert("Жодного фільму за введеною назвою не знайдено");
        }
        dispatch({type: "SEARCH_MOVIE", payload: copyResults});
        dispatch({type: "END_LOADING", payload: false});
        history.push("/search");
    }
    const [isDarkTheme, setIsDarkTheme] = useContext(DarkThemeContext);
    const toogleTheme = () => {
        setIsDarkTheme(!isDarkTheme);
    }
    return (
        <div className="header">
            <img src={Logo} className="header-logo" alt="logo"/>
            <div className="header-menu">
                <NavLink className="header-menu-link" to="/">Головна</NavLink>
                <NavLink className="header-menu-link" to="/new-movies">Новинки</NavLink>
                <NavLink className="header-menu-link" to="/popular">Популярні</NavLink>
            </div>
            <Search
                placeholder="Введіть назву фільму"
                onSearch={value => serchMovie(value)}
            />
            <div className="toggle" onClick={toogleTheme}>
                <input className="toggleInput" type="checkbox"/>
                <label className="onbtn">{isDarkTheme ? 'Темна тема' : 'Світла тема'}</label>
            </div>
        </div>
    );
}


