import React, {useEffect, useState} from 'react'
import ArtistCard from './artist-card'
import NoSearch from '../no-search'
export default React.memo(function ArtistSearch(props) {
    // States setup ***artists: Array with artists gotten as a response of the
    // request 12 artists were asked ***offset: Allows to get the next or prev 12
    // songs when clicking the arrows ***client_id: Cliend identification given by
    // Spotify Dev Dashboard ***client_secret: Secret key given by Spotify
    // ***authOptions: Object with headers needed to get authorization token
    // ***token: Athotization token given by Spotify, this allows client to request
    // on their APIs;
    const [token,
        setToken] = useState('');
    const [artists,
        setArtists] = useState([]);
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
    // Life cicle to avoid re-rendering, it allows getArtists() function to render
    // just once
    useEffect(() => {
        getArtists();
    }, []);
    // getArtists use authOptions object and ask for auth token Once token is ready
    // and successful, it request the 12 first artist that match the search on Spotify's API Using
    // a concatenated url where offset is the state declared
    const getArtists = () => {
        let artistName = props
            .artistSearch
            .replace(" ", "%20");
        request.post(authOptions, (error, response, body) => {
            setToken(body.access_token);
            if (!error && response.statusCode === 200) {
                const options = {
                    url: 'https://api.spotify.com/v1/search?q=' + artistName + '&type=artist&limit=12&offset=' + offset,
                    headers: {
                        'Authorization': 'Bearer ' + body.access_token
                    },
                    json: true
                };
                console.log(options.url)
                request.get(options, (error, response, body) => {
                    setArtists(body.artists);
                });
            }
        });
    }
    // Next and Prev arrow buttons, using their ID to set the offset getArtists()
    // request offNext sums 12 to offset, so the next 12 artists will be rendered
    // offPrev substracts 12 from offset, to the prev 12 artists will be rendered It
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
    // typed into Artists input
    useEffect(() => {
        getArtists();
    }, [offset, props.artistSearch]);

    const getArtistProfile = (e) => {
        props.getArtistProfile(e)
    }
    if (props.artistSearch.length > 0) {
        if (artists) {
            return (
                <div className="new-releases grid">
                    <h2 className="main-title">Artists Found</h2>
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
                            {artists.items
                                ? artists
                                    .items
                                    .map((artist, key) => {
                                        return (<ArtistCard
                                            id={'song' + key}
                                            name={artist.name}
                                            artistID={artist.id}
                                            getArtistProfile={getArtistProfile}
                                            thumb={artist.images.length > 0
                                            ? artist.images[1].url
                                            : ''}/>)
                                    })
                                : <NoSearch title={'artists'} />
}
                        </div>
                    </div>
                </div>
            )
        } else {
            return (<NoSearch title={'artists'} />)
        }
    } else {
        return (<NoSearch title={'artists'} />)
    }

})