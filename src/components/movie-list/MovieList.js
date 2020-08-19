import React, {Component, useState, useEffect} from 'react';
import {apiKey} from "../../constants/Menu";
import {loading} from "../loading/Loading";
import './MovieList.scss';
import {connect} from 'react-redux';
import mapStateToProps from "react-redux/lib/connect/mapStateToProps";
import mapDispatchToProps from "react-redux/lib/connect/mapDispatchToProps";

 const MovieList = (props) => {
    const [movieList, setMovieList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [imageUrlFirstPart, setImageUrlFirstPart] = useState('');
    const [genre, setGenre] = useState([]);
     console.log(props);
     const getCard = async () => {
        setIsLoading(true);
        try {
            const requestMovieList = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`);
            const jsonMovieList = await requestMovieList.json();
            // console.log(jsonMovieList);
            const {results} = jsonMovieList;
            setMovieList(results);
            // console.log(results);
            setIsLoading(false);
        } catch (e) {
            // console.log(e);
            setIsLoading(false);
        }

        try {
            const requestImage = await fetch(`https://api.themoviedb.org/3/configuration?api_key=${apiKey}`);
            const jsonImage = await requestImage.json();
            // console.log(jsonImage);
            const {images: {base_url, backdrop_sizes}} = jsonImage;
            const firstPartUrl = base_url + backdrop_sizes[3];
            setImageUrlFirstPart(firstPartUrl);
            // console.log(firstPartUrl);
            setIsLoading(false);

        } catch (e) {
            console.log(e);
            setIsLoading(false);
        }
        try {
            const requestGenre = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`);
            const jsonGenre = await requestGenre.json();
            // console.log(jsonGenre);
            const {genres} = jsonGenre;
            setGenre(genres);
            setIsLoading(false);
            console.log(genres);
        } catch (e) {
            console.log(e);
            setIsLoading(false);
        }
    };
    const matchGenre = (value) => {
        return value.map(id => {
            return genre.map(genr => {
                if (genr.id === id) {
                    return (
                        <div key={genr.id}>{genr.name}</div>
                    )
                }
            })
        })
    };
    const renderMovies = (value) => {
        return (<div key={value.id} className="box">
                <div className="card">
                    <div>
                        <img className="card-img" src={imageUrlFirstPart + value.backdrop_path} alt="movie picture"/>
                    </div>
                    <div className="card-title">
                        <h3>{value.title}</h3>
                    </div>
                    <div className="card-title">
                        <div className="card-title-genre">Жанр: {matchGenre(value.genre_ids)}</div>
                    </div>
                    <div className="card-title">
                        Дата виходу - {value.release_date}
                    </div>
                    <div className="card-title">
                        Рейтинг - {value.vote_average}
                    </div>

                </div>

            </div>
        )
    }

    useEffect(() => {
        getCard();
    }, []);
    return (
        <div>
            <button>click</button>
            <div>
                {(isLoading && loading()) ||
                    movieList.map(value => renderMovies(value))
                }
            </div>
        </div>
    )
}

// const mapDispatchToProps=state=>{
//
//      return
// }
export const MovieListWithConnect=connect()(MovieList);
