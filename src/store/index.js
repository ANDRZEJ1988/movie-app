import {createStore} from "redux";

const initialState = {
    movieList: [],
    genre: [],
    isLoading: false,
    imageUrlFirstPart: '',
    card: [],
    search:[],
   };

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_MOVIES':
            return {...state, movieList: action.payload};
        case 'BUTTON':
            return {...state, movieList: action.payload};
        case 'START_LOADING':
            return {...state, isLoading: action.payload};
        case 'END_LOADING':
            return {...state, isLoading: action.payload};
        case 'GET_IMAGE':
            return {...state, imageUrlFirstPart: action.payload};
        case 'GET_GENRE':
            return {...state, genre: action.payload};
        case 'BY_ALPHABET':
            return {...state, movieList: action.payload};
        case 'BY_POPULAR':
            return {...state, movieList: action.payload};
        case 'BY_RATE':
            return {...state, movieList: action.payload};
        case 'SEARCH_MOVIE':
            return {...state, movieList: action.payload};
        case 'SHOW_CARD':
            return {...state, card: action.payload};
        default:
            return state;
    }
}

export const store = createStore(reducer);
