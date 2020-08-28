import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import './UpcomingMovies.scss';
import {loading} from "../loading/Loading";
import {upcomingMoviesGet} from "../../function";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import {imageUrlFirstPartSelector, isLoadingSelector} from "../../store/selectors";
import {strings} from "../../strings/strings";
import {endLoadingAction} from "../../actions/actions";

export const UpcomingMovies = () => {
    const [imageUrlSecondPart, setImageUrlSecondPart] = useState([]);
    const imageUrlFirstPart = useSelector(imageUrlFirstPartSelector);
    const isLoading = useSelector(isLoadingSelector);
    const dispatch = useDispatch();
    const getUpcomingMovies = useCallback(async () => {
        setImageUrlSecondPart(await upcomingMoviesGet());
        dispatch(endLoadingAction());
    }, [dispatch]);

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
    }, [getUpcomingMovies]);
    return (
        <div>
            {(isLoading && loading()) ||
            <div className="divka">
                <h1>{strings.soon}</h1>
                <div className="pictures">
                    <ArrowBackIosIcon color="disabled" fontSize="large" onClick={sliderLeft}/>
                    <img ref={imageRefFirst} className="pictures-image" src={moviesUrl[0]} alt="зображення фільму"/>
                    <img ref={imageRefSecond} className="pictures-image" src={moviesUrl[1]} alt="зображення фільму"/>
                    <img ref={imageRefThird} className="pictures-image" src={moviesUrl[2]} alt="зображення фільму"/>
                    <img ref={imageRefThourth} className="pictures-image" src={moviesUrl[3]} alt="зображення фільму"/>
                    <ArrowForwardIosIcon color="disabled" fontSize="large" onClick={sliderRight}/>
                </div>
            </div>}
        </div>
    );

}

