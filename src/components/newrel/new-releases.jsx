import React, {useEffect, useState} from 'react'
import SongCard from './song-card'
export default React.memo(function NewReleases() {

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

    useEffect(() => {
        getSongs()
    }, []);

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
                console.log(options.url)
                request.get(options, function (error, response, body) {
                    setSongs(body.albums.items)
                });
            }
        });
    }
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
        setTimeout(()=>{
            getSongs();
        },50)
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
                <div className="white">
                    {songs.map(song => {
                        return (
                            <p>{song.name}</p>
                        )
                    })}
                </div>
                {/* <SongCard/> */}
            </div>
        </div>
    )
})