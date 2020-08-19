import React, {Component, useState} from 'react';
import './Header.scss';
import Logo from '../../assets/logo.png';
import {menu} from "../../constants/Menu";
import {NavLink} from "react-router-dom";
import {connect} from 'react-redux';
import {searchMovie} from '../../function/index';


export const Header = (props) => {
    const [movie, setMovie] = useState('');
    const getMovieName = (event) => {
        setMovie(event.target.value);
    }
    const searchMovie = () => {
        const {searchMovie} = props;
        searchMovie(movie);
        console.log(props);
    }

    return (
        <div className="header">
            <img src={Logo} className="header-logo" alt="logo"/>
            <div className="header-menu">{
                menu.map(value => {
                    return (
                        <div className="header-menu" key={value.url}>
                            <NavLink className="header-menu-link" to={value.url}>{value.name} </NavLink>
                        </div>
                    )
                })
            }
            </div>
            <div className="header-menu">
                <input type="text" onChange={getMovieName}/>
                <button onClick={searchMovie(movie)}>Пошук</button>
            </div>
            <div className="header-menu">
                <span>Вхід</span>
                <span>/</span>
                <span>Регістарція</span>
            </div>
        </div>
    );
}

const mapStateToProps = (store) => {
    const {movieName} = store;
    // console.log(movieName);
    return {movieName}
}
const mapDispatchToProps = ({searchMovie});
export const HeaderWithConnect = connect(mapStateToProps, mapDispatchToProps)(Header);
