import {
    endLoadingAction, getGenreAction,
    getImageAction, getImageCardAction,
    getMoviesAction,
    searchMovieAction,
    startLoadingAction
} from "../actions/actions";
import {strings} from "../strings/strings";
import {apiKey} from "../constants/Menu";

export const requestFunction = async (argument) => {
    try {
        const requestAllMovies = await fetch(argument);
        const jsonAllMovies = await requestAllMovies.json();
        const {results, images, genres} = jsonAllMovies;
        if (results) return results;
        if (images) return images;
        else return genres;
    } catch (e) {
        return console.log(e);
    }
};
export const movieSeach = async (movieName, dispatch, history) => {
    dispatch(startLoadingAction());
    if (movieName.length === 0) {
        alert(strings.enterMovie);
        dispatch(endLoadingAction());
        return
    }
    const results = await requestFunction(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${movieName}&page=1&include_adult=false`);
    const copyResults = [];
    for (const element of results) {
        if (element.poster_path !== null) copyResults.push(element)
    }
    if (copyResults.length === 0) {
        alert(strings.notFound);
    }
    dispatch(searchMovieAction(copyResults));
    dispatch(endLoadingAction());
    history.push("/search");
};
export const moviesGet = async (current, dispatch) => {
    dispatch(startLoadingAction());
    const results = await requestFunction(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${current}`);
    const copyResults = [];
    for (const element of results) {
        if (element.poster_path !== null) copyResults.push(element)
    }
    dispatch(getMoviesAction(copyResults));
    const images = await requestFunction(`https://api.themoviedb.org/3/configuration?api_key=${apiKey}`);
    const {base_url, backdrop_sizes} = images;
    const firstPartUrl = base_url + backdrop_sizes[0];
    const imgCardUrl = base_url + backdrop_sizes[3];
    dispatch(getImageAction(firstPartUrl));
    dispatch(getImageCardAction(imgCardUrl));
    const genres = await requestFunction(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`);
    dispatch(getGenreAction(genres));
    dispatch(endLoadingAction());
};
export const getNewMovies = async (current, dispatch) => {
    dispatch(startLoadingAction());
    const results = await requestFunction(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${current}`);
    const copyResults = [];
    for (const element of results) {
        if (element.poster_path !== null) copyResults.push(element)
    }
    dispatch(getMoviesAction(copyResults));
    dispatch(endLoadingAction());
};
export const getPopularMovies = async (current, dispatch) => {
    dispatch(startLoadingAction());
    const results = await requestFunction(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=${current}`);
    const copyResults = [];
    for (const element of results) {
        if (element.poster_path !== null) copyResults.push(element)
    }
    dispatch(getMoviesAction(copyResults));
    dispatch(endLoadingAction());
};
export const upcomingMoviesGet = async () => {
    const results = await requestFunction(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`);
    const secondPart = [];
    results.map(value =>
        secondPart.push(value.poster_path)
    );
    const secondPartWithoutNull = secondPart.filter((value) => {
        return value !== null
    });
    return (secondPartWithoutNull);
};