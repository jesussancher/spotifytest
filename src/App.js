import React, {useState} from 'react';
import logo from './logo.svg';
import styles from './styles.css';
import Navbar from './components/navbar'
import NewReleases from './components/newrel/new-releases'
import ArtistSearch from './components/artists/artist-search'
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import './App.css';
// import 'semantic-ui-css/semantic.min.css';

export default function App() {
    const [search, setSearch] = useState({
        artists: '',
        songs: '',
    })
    const getSearch = (search) => {
        setSearch({
            artists: search.artists, 
            songs: search.songs
        })
    }

    return (
        <Router>
            <div>
                <Navbar getSearch={getSearch}/>
                <Switch>
                    <Route path="/about">
                        <About/>
                    </Route>
                    <Route path="/artists">
                        <ArtistSearch artistSearch={search.artists} />
                    </Route>
                    <Route path="/">
                        <NewReleases />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

function About() {
    return <h2>About</h2>;
}
