import React from 'react'

export default function SongCard(props) {
    return (
        <div id={props.id} className="song-card">
            <img
                className="release-song-image"
                src={props.thumb}
                alt={props.name}
                title={props.name}/>
            <div className="song-title">{props.name}</div>
            <p className="artist-name">{props.artistName}</p>
        </div>
    )
}