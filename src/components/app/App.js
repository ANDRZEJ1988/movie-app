import React from 'react';
import './App.css';
import {Footer} from "../footer/Footer";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import {NewHeader} from "../new-header/NewHeader";
import {DarkThemeWrapper} from "../dark-theme-wrapper/DarkThemeWrapper";
import {NewMovielist} from "../new-movielist/NewMovielist";
import {MovieCard} from "../movie-card/MovieCard";
import {NewMovies} from "../new-movies/NewMovies";
import {PopularMovies} from "../popular-movies/PopularMovies";
import {SearchMovies} from "../search-movies/SearchMovies";



export function App() {
    return (
        <DarkThemeWrapper>
            <Router>
                <NewHeader/>
                <Switch>
                    <Route path="/" exact
                           render={(routerProps) => {
                               return <NewMovielist {...routerProps}/>
                           }}/>
                    <Route path="/movie/:title" exact
                           render={(routerProps) => {
                               return <MovieCard {...routerProps}/>
                           }}/>
                    <Route path="/new-movies" exact
                           render={(routerProps) => {
                               return <NewMovies {...routerProps}/>
                           }}/>
                    <Route path="/popular" exact
                           render={(routerProps) => {
                               return <PopularMovies {...routerProps}/>
                           }}/>
                    <Route path="/search" exact
                           render={(routerProps) => {
                               return <SearchMovies {...routerProps}/>
                           }}/>
                    <Redirect from="*" to="/" exact />
                                    </Switch>
                <Footer/>
            </Router>
        </DarkThemeWrapper>
    )
}
export default App;

