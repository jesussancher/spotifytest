import React, {useEffect, useState} from 'react'
import {propTypes} from 'react-bootstrap/esm/Image';
import SongCard from './song-card'

export default React.memo(function NewReleases(props) {
    // States setup ***songs: Array with songs gotten as a response of the request
    // 12 songs were asked ***offset: Allows to get the next or prev 12 songs when
    // clicking the arrows ***client_id: Cliend identification given by Spotify Dev
    // Dashboard ***client_secret: Secret key given by Spotify ***authOptions:
    // Object with headers needed to get authorization token ***token: Athotization
    // token given by Spotify, this allows client to request on their APIs;
    const [token,
        setToken] = useState('');
    const [songs,
        setSongs] = useState([]);
    const [offset,
        setOffset] = useState(0);
    const request = require('request');
    const client_id = 'f405c9247eb741a1875dede5de8d269a';
    const client_secret = '8dbe2c529c8b41f0b727ddab2682969a';
    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
        },
        form: {
            grant_type: 'client_credentials'
        },
        json: true
    };
    // getSongs use authOptions object and ask for auth token Once token is ready
    // and successful, it request the 12 new releases songs on Spotify's API Using a
    // concatenated url where offset is the state declared
    const getSongs = () => {
        request.post(authOptions, (error, response, body) => {
            setToken(body.access_token);
            if (!error && response.statusCode === 200) {
                const options = {
                    url: 'https://api.spotify.com/v1/browse/new-releases?offset=' + offset + '&limit=12',
                    headers: {
                        'Authorization': 'Bearer ' + body.access_token
                    },
                    json: true
                };
                request.get(options, (error, response, body) => {
                    setSongs(body.albums.items);
                });
            }
        });
    }
    // Lif Cicle to render just when offset state changes
    useEffect(() => {
        getSongs();
    }, [offset]);
    // Next and Prev arrow buttons, using their ID to set the offset getSongs()
    // request offNext sums 12 to offset, so the next 12 songs will be rendered
    // offPrev substracts 12 from offset, to the prev 12 songs will be rendered It
    // is conditioned to prevent undefined results, by allowing prev be pressed if
    // offset is greater than 0
    const offsetList = (id) => {
        switch (id) {
            case 'offPrev':
                if (offset > 0) {
                    setOffset(offset - 12);
                }
                break;
            case 'offNext':
                setOffset(offset + 12);
                break;
        }
    }
    // We are passing the click artist's ID to App.js states
    const getArtistProfile = (e) => {
        props.getArtistProfile(e)
    }
    return (
        <div className="new-releases grid">
            <h2 className="main-title">New releases</h2>
            <div className="song-list-container grid">
                <div className="release-control white ">
                    <i
                        id="offPrev"
                        onClick={() => offsetList("offPrev")}
                        className="fas fa-chevron-circle-left"></i>
                    <i
                        id="offNext"
                        onClick={() => offsetList("offNext")}
                        className="fas fa-chevron-circle-right"></i>
                </div>
                <div className="song-card-container row white">
                    {songs.map((song, key) => {
                        let artist = []
                        for (let i = 0; i < song.artists.length; i++) {
                            artist.push(song.artists[i].name)
                        }
                        const artists_name = artist.join(" ft. ")
                        return (<SongCard
                            getArtistProfile={getArtistProfile}
                            id={'song' + key}
                            name={song.name}
                            artistName={artists_name}
                            artistID={song.artists[0].id}
                            thumb={song.images[1].url}/>)
                    })}
                </div>
            </div>
        </div>
    )
})