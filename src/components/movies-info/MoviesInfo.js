import React, {useContext} from 'react';
import {loading} from "../loading/Loading";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from 'react-router-dom';
import './MoviesInfo.scss';
import {DarkThemeContext} from "../../dark-theme-context/DarkThemeContext";

export const MoviesInfo = () => {
    const [isDarkTheme] = useContext(DarkThemeContext);
    const dispatch = useDispatch();
    const history = useHistory();
    const movieList = useSelector(state => state.movieList);
    const imageUrlFirstPart = useSelector(state => state.imageUrlFirstPart);
    const genre = useSelector(state => state.genre);
    const isLoading = useSelector(state => state.isLoading);
    const render = () => {
        return (movieList.map(value => {
            return (<div key={value.id} className="box-one" onClick={() => showCard(value)}>
                    <div className="cardss">
                        <div>
                            <img className="cardss-img" src={imageUrlFirstPart + value.poster_path}
                                 loading="lazy"
                                 alt="зображення фільму"/>
                        </div>
                        <div className="cardss-title">
                            <h3>{value.title}</h3>
                        </div>
                        <ul className="cardss-movie-gen">
                            <li>Жанр: {matchGenre(value.genre_ids)}</li>
                            <li>Дата виходу - {value.release_date}</li>
                            <li>Рейтинг - {value.vote_average}</li>
                        </ul>
                    </div>
                </div>
            )
        }))
    };

    const showCard = (movie) => {
        dispatch({type: "SHOW_CARD", payload: movie});
        history.push(`/movie/${movie.title}`);
    };
    const matchGenre = (value) => {
        return value.map(id => {
            return genre.map(genr => {
                if (genr.id === id)
                    return (
                        <span key={genr.id}>{genr.name} </span>
                    )
                else
                    return null;
            })
        })
    };
    const sortByAlphabet = () => {
        const copy = movieList.slice();
        const byAlphabet = copy.sort((a, b) => a.title > b.title ? 1 : -1);
        dispatch({type: "BY_ALPHABET", payload: byAlphabet});
    };
    const sortByPopular = () => {
        const copy = movieList.slice();
        const byPopular = copy.sort((a, b) => a.popularity > b.popularity ? -1 : 1);
        dispatch({type: "BY_POPULAR", payload: byPopular});
    };
    const sortByRate = () => {
        const copy = movieList.slice();
        const byRate = copy.sort((a, b) => a.vote_average > b.vote_average ? -1 : 1);
        dispatch({type: "BY_RATE", payload: byRate});
    };
    return (
        <div className={`${isDarkTheme && 'dark'}`}>
            <div className="sort">
                <h3>Сортувати за</h3>
                <button className="my-buttons" onClick={sortByAlphabet}>Алфавітом</button>
                <button className="my-buttons" onClick={sortByPopular}>Популярністю</button>
                <button className="my-buttons" onClick={sortByRate}>Рейтингом</button>
            </div>
            <div className="box">
                {(isLoading && loading()) ||
                render()
                }
            </div>
        </div>
    );
}

