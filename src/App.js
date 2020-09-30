import React, {useState} from 'react';
import logo from './logo.svg';
import styles from './styles.css';
import Navbar from './components/navbar'
import NewReleases from './components/newrel/new-releases'
import ArtistSearch from './components/artists/artist-search'
import SongSearch from './components/songs/song-search'
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import './App.css';
// import 'semantic-ui-css/semantic.min.css';

export default function App() {
    const [search,
        setSearch] = useState({artists: '', songs: ''})
    const [artistID,
        setArtistID] = useState('')
    const getSearch = (search) => {
        setSearch({artists: search.artists, songs: search.songs})
    }
    const getArtistProfile = (e) => {
        setArtistID(e)
    }

    return (
        <Router>
            <div>
                <Navbar getSearch={getSearch}/>
                <Switch>
                    <Route path="/songs">
                        <SongSearch songSearch={search.songs} getArtistProfile={getArtistProfile}/>
                    </Route>
                    <Route path="/artists">
                        <ArtistSearch artistSearch={search.artists} getArtistProfile={getArtistProfile}/>
                    </Route>
                    <Route path="/">
                        <NewReleases getArtistProfile={getArtistProfile}/>
                    </Route>
                    <Route path={"/artist/"+artistID}>
                        <NewReleases getArtistProfile={getArtistProfile}/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}
