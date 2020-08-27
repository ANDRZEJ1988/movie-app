import { createSelector } from 'reselect'


export const movieListSelector=state => state.movieList;
export const imageUrlFirstPartSelector=state => state.imageUrlFirstPart;
export const genreSelector=state => state.genre;
export const isLoadingSelector=state => state.isLoading;
export const cardSelector=state => state.card;
export const imgCardUrlSelector=state => state.imgCardUrl;
export const sortByAlphabetSelector=createSelector(
    movieListSelector,
    (movieList)=>(movieList.slice().sort((a, b) => a.title > b.title ? 1 : -1))
);
export const sortByPopularSelector=createSelector(
    movieListSelector,
    (movieList)=>(movieList.slice().sort((a, b) => a.popularity > b.popularity ? -1 : 1))
);
export const sortByRateSelector=createSelector(
    movieListSelector,
    (movieList)=>(movieList.slice().sort((a, b) => a.vote_average > b.vote_average ? -1 : 1))
);