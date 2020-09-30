import React, {useEffect, useState} from 'react'
import SongCard from './song-card'
import NoSearch from '../no-search'
export default React.memo(function SongSearch(props) {
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
    // Life cicle to avoid re-rendering, it allows getSongs() function to render
    // just once
    useEffect(() => {
        getSongs();
    }, []);
    // getSongs use authOptions object and ask for auth token Once token is ready
    // and successful, it request the 12 first songs which match with the search on
    // Spotify's API Using a concatenated url where offset is the state declared
    const getSongs = () => {
        let songName = props
            .songSearch
            .replace(" ", "%20");
        request.post(authOptions, (error, response, body) => {
            setToken(body.access_token);
            if (!error && response.statusCode === 200) {
                const options = {
                    url: 'https://api.spotify.com/v1/search?q=' + songName + '&type=track&limit=12&offset=' + offset,
                    headers: {
                        'Authorization': 'Bearer ' + body.access_token
                    },
                    json: true
                };
                console.log(options.url)
                request.get(options, (error, response, body) => {
                    setSongs(body.tracks);
                });
            }
        });
    }
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
    // Lif Cicle to render just when offset state changes and everytime something is
    // typed into Songs input
    useEffect(() => {
        getSongs();
    }, [offset, props.songSearch]);

    const getArtistProfile = (e) => {
        props.getArtistProfile(e)
    }
    if (props.songSearch.length > 0) {
        if (songs) {
            return (
                <div className="new-releases grid">
                    <h2 className="main-title">Songs Found</h2>
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
                            {songs.items
                                ? songs
                                    .items
                                    .map((song, key) => {
                                        let artist = []
                                        for (let i = 0; i < song.artists.length; i++) {
                                            artist.push(song.artists[i].name)
                                        }
                                        const artists_name = artist.join(" ft. ")
                                        return (<SongCard
                                            id={'song' + key}
                                            artistName={artists_name}
                                            artistID={song.artists[0].id}
                                            getArtistProfile={getArtistProfile}
                                            name={song.name}
                                            thumb={song.album.images.length > 0
                                            ? song.album.images[1].url
                                            : ''}/>)
                                    })
                                : <NoSearch title={'songs'}/>
}
                        </div>
                    </div>
                </div>
            )
        } else {
            return (<NoSearch title={'songs'}/>)
        }
    } else {
        return (<NoSearch title={'songs'}/>)
    }
})