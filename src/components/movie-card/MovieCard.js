import React, {useContext} from 'react';
import {useSelector} from "react-redux";
import './MovieCard.scss';
import {DarkThemeContext} from "../../dark-theme-context/DarkThemeContext";
import {loading} from "../loading/Loading";
import {cardSelector, genreSelector, imgCardUrlSelector, isLoadingSelector} from "../../store/selectors";

export const MovieCard = () => {
    const card = useSelector(cardSelector);
    const genre = useSelector(genreSelector);
    const imgCardUrl = useSelector(imgCardUrlSelector);
    const isLoading = useSelector(isLoadingSelector);
    const matchGenre = (value) => {
        return value.map(id => {
            return genre.map(genr => {
                if (genr.id === id) {
                    return (
                        <span key={genr.id}>{genr.name} </span>
                    )
                } else return null;
            })
        })
    };
    const [isDarkTheme] = useContext(DarkThemeContext);
    return (
        <div className={`${isDarkTheme && 'darks'}`}>
            {(isLoading && loading()) ||
            <div className="container">
                <div className="movie">
                    <div>
                        <img className="movie-img" src={imgCardUrl + card.backdrop_path}
                             alt="зображення фільму"/>
                    </div>
                    <div className="movie-title">
                        <h3>{card.title}</h3>
                    </div>
                    <ul className="movie-movie-gen">
                        <li>Жанр: {matchGenre(card.genre_ids)}</li>
                        <li>Дата виходу - {card.release_date}</li>
                        <li>Рейтинг - {card.vote_average}</li>
                    </ul>
                    <p className="movie-description">{card.overview}</p>
                </div>
            </div>}
        </div>
    )
}

