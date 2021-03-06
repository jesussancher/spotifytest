import React, {useEffect, useState} from 'react';
import styles from './styles.css';
import Navbar from './components/navbar'
import NewReleases from './components/newrel/new-releases'
import ArtistSearch from './components/artists/artist-search'
import SongSearch from './components/songs/song-search'
import ArtistProfile from './components/artistProfile/artist-profile'
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from "react-router-dom";
import NoSearch from './components/no-search'
import './App.css';

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
    // Saving artist ID into the localStorage
    // useEffect(() => {
    //     const json = JSON.stringify(artistID);
    //     if (artistID.length > 0) {
    //         localStorage.setItem('artistID', json);
    //     }
    // });
    // useEffect(() => {
    //     const json = localStorage.getItem('artistID');
    //     const artID = JSON.parse(json);
    //     setArtistID(artID)
    // }, [artistID])
    return (
        <Router>
            <Redirect from="/" to="/home"></Redirect>

            <div>
                <Navbar getSearch={getSearch}/>
                <Switch>
                    <Route path="/songs">
                        <SongSearch songSearch={search.songs} getArtistProfile={getArtistProfile}/>
                    </Route>
                    <Route path="/artists">
                        <ArtistSearch
                            artistSearch={search.artists}
                            getArtistProfile={getArtistProfile}/>
                    </Route>
                    <Route path="/home">
                        <NewReleases getArtistProfile={getArtistProfile}/>
                    </Route>
                    <Route path={"/artist/" + artistID}>
                        <ArtistProfile getArtistProfile={getArtistProfile} artistID={artistID}/>
                    </Route>
                    <Route compontent={NoSearch}/>
                </Switch>
            </div>
        </Router>
    );
}
