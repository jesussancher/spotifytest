import React from 'react'

export default function ArtistCard(props) {
    return (
        <div id={props.id} className="song-card">
            <div style={{backgroundImage: 'url('+props.thumb+')'}} className="search-artist-image">
            </div>
            {/* <img
                className="search-artist-image"
                src={props.thumb}
                alt={props.name}
                title={props.name}/> */}
            <div className="search-artist-name">{props.name}</div>
        </div>
    )
}