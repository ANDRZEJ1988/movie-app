import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {Movielist} from "../movielist/Movielist";
import {MovieCard} from "../movie-card/MovieCard";
import {NewMovies} from "../new-movies/NewMovies";
import {PopularMovies} from "../popular-movies/PopularMovies";
import {SearchMovies} from "../search-movies/SearchMovies";

export const Navigation =()=> {
        return (
            <Switch>
                <Route path="/" exact
                       render={(routerProps) => {
                           return <Movielist {...routerProps}/>
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
                <Redirect from="*" to="/" exact/>
            </Switch>
        );
}

