import {
    BY_ALPHABET, BY_POPULAR, BY_RATE,
    END_LOADING,
    GET_GENRE,
    GET_IMAGE,
    GET_MOVIES,
    IMAGE_CARD, SEARCH_MOVIE,
    SHOW_CARD,
    START_LOADING
} from "./action-types";

export const startLoadingAction=()=>{
return({
type: START_LOADING,
payload: true
})
};
export const getMoviesAction=(movies)=>{
return({
type: GET_MOVIES,
payload: movies
})
};
export const getImageAction=(firstPartUrl)=>{
return({
type: GET_IMAGE,
payload: firstPartUrl
})
};
export const getImageCardAction=(imgCardUrl)=>{
return({
type: IMAGE_CARD,
payload: imgCardUrl
})
};
export const getGenreAction=(genres)=>{
return({
type: GET_GENRE,
payload: genres
})
};
export const endLoadingAction=()=>{
    return({
        type: END_LOADING,
        payload: false
    })
};
export const showCardAction=(movie)=>{
    return({
        type: SHOW_CARD,
        payload: movie
    })
};
export const byAlphabetAction=(byAlphabet)=>{
    return({
        type: BY_ALPHABET,
        payload: byAlphabet
    })
};
export const byPopularAction=(byPopular)=>{
    return({
        type: BY_POPULAR,
        payload: byPopular
    })
};
export const byRateAction=(byRate)=>{
    return({
        type: BY_RATE,
        payload: byRate
    })
};
export const searchMovieAction=(copyResults)=>{
    return({
        type: SEARCH_MOVIE,
        payload: copyResults
    })
};
