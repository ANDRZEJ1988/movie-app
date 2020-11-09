import React, {useContext} from 'react';
import './Header.scss';
import Logo from "../../assets/logo.png";
import {NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import {DarkThemeContext} from "../../dark-theme-context/DarkThemeContext";
import {movieSeach} from "../../function";
import {useHistory} from 'react-router-dom';
import {Input, Select } from 'antd';
import 'antd/dist/antd.css';
import {strings} from "../../strings/strings";


export const Header = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {Search} = Input;
    const serchMovie = (value) => {
        movieSeach(value, dispatch, history)
    }
    const [isDarkTheme, setIsDarkTheme] = useContext(DarkThemeContext);
    const [, setlanguage] = useContext(DarkThemeContext);
    const toogleTheme = () => {
        setIsDarkTheme(!isDarkTheme);
    }
    const {Option} = Select;
    const changeLanguage = (value) => {
        strings.setLanguage(value);
        setlanguage(value);
    }


    return (
        <div className="header">
            <img src={Logo} className="header-logo" alt="logo"/>
            <div className="header-menu">
                <NavLink className="header-menu-link" to="/">{strings.main}</NavLink>
                <NavLink className="header-menu-link" to="/new-movies">{strings.new}</NavLink>
                <NavLink className="header-menu-link" to="/popular">{strings.popular}</NavLink>
            </div>
            <Search
                placeholder={strings.input}
                onSearch={value => serchMovie(value)}
            />
            <div className="toggle" onClick={toogleTheme}>
                <input className="toggleInput" type="checkbox"/>
                <label className="onbtn">{isDarkTheme ? strings.dark : strings.light}</label>
            </div>
            <div>
                <Select defaultValue="en" onChange={changeLanguage}>
                    <Option value="en">English</Option>
                    <Option value="uk">Українська</Option>
                    <Option value="ru">Русский</Option>
                </Select>
            </div>

        </div>
    );
}


