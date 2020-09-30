import React from 'react'
import {Link} from "react-router-dom";

export default function SongCard(props) {
    return (
        <div id={props.id} className="song-card">
            <img
                className="release-song-image"
                src={props.thumb}
                alt={props.name}
                title={props.name}/>
            <div className="song-title">{props.name}</div>
            <Link to={"/artist/" + props.artistID} className="link-none-decoration">
                <p
                    className="artist-name"
                    onClick={() => props.getArtistProfile(props.artistID)}>{props.artistName}</p>
            </Link>
        </div>
    )
}