import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {apiKey} from "../../constants/Menu";
import './UpcomingMovies.scss';
import {loading} from "../loading/Loading";
import {requestFunction} from "../../function";
import Left from "../../assets/arrow_left.png";
import Right from "../../assets/arrow_right.png";

export const UpcomingMovies = () => {
    const [imageUrlSecondPart, setImageUrlSecondPart] = useState([]);
     const imageUrlFirstPart = useSelector(state => state.imageUrlFirstPart);
    const isLoading = useSelector(state => state.isLoading);
    const dispatch = useDispatch();
    const getUpcomingMovies = async () => {
        const results = await requestFunction(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`);
        const secondPart = [];
        results.map(value =>
            secondPart.push(value.poster_path)
        );
        const secondPartWithoutNull = secondPart.filter((value) => {
            return value !== null
        });
        setImageUrlSecondPart(secondPartWithoutNull);
        dispatch({type: "END_LOADING", payload: false});
    }
    const moviesUrl = imageUrlSecondPart.map(value => imageUrlFirstPart + value);
    const imageRefFirst = useRef();
    const imageRefSecond = useRef();
    const imageRefThird = useRef();
    const imageRefThourth = useRef();

    let i = 0;
    const sliderLeft = () => {
        (i - 1 < 0) ? i = moviesUrl.length - 4
            : i = i - 1;
        imageRefFirst.current.src = moviesUrl[i];
        imageRefSecond.current.src = moviesUrl[i + 1];
        imageRefThird.current.src = moviesUrl[i + 2];
        imageRefThourth.current.src = moviesUrl[i + 3];
    };
    const sliderRight = () => {
        (i + 4 > moviesUrl.length - 1) ? i = 0
            : i = i + 1;
        imageRefFirst.current.src = moviesUrl[i];
        imageRefSecond.current.src = moviesUrl[i + 1];
        imageRefThird.current.src = moviesUrl[i + 2];
        imageRefThourth.current.src = moviesUrl[i + 3];
    };

    useEffect(() => {
        getUpcomingMovies();
    }, []);
    return (
        <div>
            {(isLoading && loading()) ||
            <div className="divka">
                <h1>Скоро на екранах</h1>
                <div className="pictures">
                    <img src={Left} className="pictures-arrows" onClick={sliderLeft} alt="arrow-left"/>
                    <img ref={imageRefFirst} className="pictures-image" src={moviesUrl[0]} alt="зображення фільму"/>
                    <img ref={imageRefSecond} className="pictures-image" src={moviesUrl[1]} alt="зображення фільму"/>
                    <img ref={imageRefThird} className="pictures-image" src={moviesUrl[2]} alt="зображення фільму"/>
                    <img ref={imageRefThourth} className="pictures-image" src={moviesUrl[3]} alt="зображення фільму"/>
                    <img src={Right} className="pictures-arrows" onClick={sliderRight} alt="arrow-right"/>
                </div>
            </div>}
        </div>
    );

}

