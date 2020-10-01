import React, {useEffect, useState} from 'react'
import NoSearch from '../no-search'
import RelatedPhoto from './related-photo'
import AlbumCart from './album-cart'
import TopCart from './top-cart'
export default React.memo(function ArtistProfile(props) {
    const [token,
        setToken] = useState('');
    const [artistInfo,
        setArtistInfo] = useState([]);
    const [relatedArtists,
        setRelatedArtists] = useState([])
    const [artistID,
        setArtistID] = useState('')
    const [albums,
        setAlbums] = useState([])
    const [topTracks,
        setTopTracks] = useState([])
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
    // getArtists use authOptions object and ask for auth token Once token is ready
    // and successful, it request the 12 first artist that match the search on
    // Spotify's API Using a concatenated url where offset is the state declared
    const getArtist = () => {
        request.post(authOptions, (error, response, body) => {
            setToken(body.access_token);
            if (!error && response.statusCode === 200) {
                const infoOptions = {
                    url: 'https://api.spotify.com/v1/artists/' + props.artistID,
                    headers: {
                        'Authorization': 'Bearer ' + body.access_token
                    },
                    json: true
                };
                const relatedOptions = {
                    ...infoOptions,
                    url: 'https://api.spotify.com/v1/artists/' + props.artistID + '/related-artists'
                }
                const albumsOptions = {
                    ...infoOptions,
                    url: 'https://api.spotify.com/v1/artists/' + props.artistID + '/albums?limit=6&offset=' + offset
                }
                const topTracksOptions = {
                    ...infoOptions,
                    url: 'https://api.spotify.com/v1/artists/' + props.artistID + '/top-tracks?market=CO'
                }
                request.get(infoOptions, (error, response, body) => {
                    setArtistInfo(body);
                });
                request.get(relatedOptions, (error, response, body) => {
                    setRelatedArtists(body.artists);
                });
                request.get(albumsOptions, (error, response, body) => {
                    setAlbums(body.items);
                });
                request.get(topTracksOptions, (error, response, body) => {
                    setTopTracks(body.tracks);
                });
            }
        });
    }
    // Life cycle to avoid requesting since information was gotten. Preventing 304
    // status code
    useEffect(() => {
        if (artistInfo.length === 0) {
            getArtist();
        }
    })
    // Next and Prev arrow buttons, using their ID to set the offset getArtists()
    // request offNext sums 6 to offset, so the next 6 albums will be rendered
    // offPrev substracts 6 from offset, to the prev 6 albums will be rendered It is
    // conditioned to prevent undefined results, by allowing prev be pressed if
    // offset is greater than 0
    const offsetList = (id) => {
        switch (id) {
            case 'offPrev':
                if (offset > 0) {
                    setOffset(offset - 6);
                }
                break;
            case 'offNext':
                setOffset(offset + 6);
                break;
        }
    }
    useEffect(() => {
        getArtist();
    }, [props.artistID, offset]);
    const getArtistProfile = (e) => {
        props.getArtistProfile(e)
    }

    if (artistInfo) {
        return (
            <div className="new-releases">
                <div className="artist-profile-content row">
                    <div className="artist-about column">
                        <div className="artist-about-photo column">
                            <div
                                style={artistInfo.images
                                ? {
                                    backgroundImage: 'url(' + artistInfo.images[1].url + ')'
                                }
                                : {
                                    backgroundColor: '#ffffff'
                                }}
                                className="artist-photo"></div>
                            <div className="artist-profile-name white">{artistInfo.name}</div>
                        </div>
                        <div className="artist-about-info relative">
                            <div className="artist-info">
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab ut adipisci
                                    voluptate sapiente consectetur labore, possimus aperiam, eaque voluptas
                                    accusantium perspiciatis quae iste, quibusdam esse quaerat a vero. A, sint!</p>
                            </div>
                        </div>
                        <div className="artist-about-related-container">
                            <p>Similar to {artistInfo.name}</p>
                            <div className="artist-about-related row">
                                {relatedArtists
                                    ? relatedArtists
                                        .slice(0, 5)
                                        .map(related => {
                                            return (<RelatedPhoto
                                                name={related.name}
                                                thumb={related.images
                                                ? related.images[0].url
                                                : ''}
                                                artistID={related.id}
                                                getArtistProfile={getArtistProfile}/>)
                                        })
                                    : ''}
                            </div>
                        </div>
                    </div>
                    <div className="artist-profile-music column">
                        <div className="artist-profile-music-albums column">
                            <div className="albums-control row">
                                <p>Albums</p>
                                <div className="release-control">
                                    <i
                                        id="offPrev"
                                        onClick={() => offsetList("offPrev")}
                                        className="fas fa-chevron-circle-left"></i>
                                    <i
                                        id="offNext"
                                        onClick={() => offsetList("offNext")}
                                        className="fas fa-chevron-circle-right"></i>
                                </div>
                            </div>

                            <div className="album-cart-container relative row">
                                {albums
                                    ? albums.map(album => {
                                        return (<AlbumCart
                                            title={album.name}
                                            year={album
                                            .release_date
                                            .slice(0, 4)}
                                            thumb={album.images
                                            ? album.images[0].url
                                            : ''}/>)
                                    })
                                    : ''}
                            </div>
                        </div>
                        <div className="artist-profile-music-tracks-container relative">
                            <div className="artist-profile-music-tracks column">
                                {topTracks
                                    ? topTracks.map((track, index) => {
                                        return (<TopCart
                                            position={index + 1}
                                            title={track.name}
                                            albumName={track.album.name}
                                            duration={track.duration_ms}
                                            thumb={track.album.images
                                            ? track.album.images[0].url
                                            : ''}/>)
                                    })
                                    : ''}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return <NoSearch title={'artist'}/>
    }

})