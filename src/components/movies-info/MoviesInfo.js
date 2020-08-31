import React, {useContext} from 'react';
import {loading} from "../loading/Loading";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from 'react-router-dom';
import './MoviesInfo.scss';
import {DarkThemeContext} from "../../dark-theme-context/DarkThemeContext";
import {
    movieListSelector,
    imageUrlFirstPartSelector,
    genreSelector,
    isLoadingSelector,
    sortByAlphabetSelector, sortByPopularSelector, sortByRateSelector
} from "../../store/selectors";
import {strings} from "../../strings/strings";
import {byAlphabetAction, byPopularAction, byRateAction, showCardAction} from "../../actions/actions";

export const MoviesInfo = () => {
    const [isDarkTheme] = useContext(DarkThemeContext);
    const dispatch = useDispatch();
    const history = useHistory();
    const movieList = useSelector(movieListSelector);
    const imageUrlFirstPart = useSelector(imageUrlFirstPartSelector);
    const genre = useSelector(genreSelector);
    const isLoading = useSelector(isLoadingSelector);
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
                            <li>{strings.genre}{matchGenre(value.genre_ids)}</li>
                            <li>{strings.date}{value.release_date}</li>
                            <li>{strings.rate}{value.vote_average}</li>
                        </ul>
                    </div>
                </div>
            )
        }))
    };

    const showCard = (movie) => {
        dispatch(showCardAction(movie));
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
    const byAlphabet = useSelector(sortByAlphabetSelector);
    const sortByAlphabet = () => {
        dispatch(byAlphabetAction(byAlphabet));
    };
    const byPopular = useSelector(sortByPopularSelector);
    const sortByPopular = () => {
        dispatch(byPopularAction(byPopular));
    };
    const byRate = useSelector(sortByRateSelector);
    const sortByRate = () => {
        dispatch(byRateAction(byRate));
    };
    return (
        <div className={`${isDarkTheme && 'dark'}`}>
            <div className="sort">
                <h3>Сортувати за</h3>
                <button className="my-buttons" onClick={sortByAlphabet}>{strings.byAlfabet}</button>
                <button className="my-buttons" onClick={sortByPopular}>{strings.byPopular}</button>
                <button className="my-buttons" onClick={sortByRate}>{strings.byRate}</button>
            </div>
            <div className="box">
                {(isLoading && loading()) ||
                render()
                }
            </div>
        </div>
    );
}

