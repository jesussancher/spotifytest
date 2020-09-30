import React from 'react'
import {Link} from "react-router-dom";

export default function ArtistCard(props) {
    return (
        <div
            id={props.id}
            className="song-card"
            onClick={() => props.getArtistProfile(props.artistID)}>
            <Link to={"/artist/" + props.artistID} className="link-none-decoration">

                <div
                    style={{
                    backgroundImage: 'url(' + props.thumb + ')'
                }}
                    className="search-artist-image"></div>
                {/* <img
                className="search-artist-image"
                src={props.thumb}
                alt={props.name}
                title={props.name}/> */}
                <div className="search-artist-name">{props.name}</div>
            </Link>

        </div>
    )
}