import React from 'react'

export default function AlbumCart(props) {
    return (
        <div className="album-cart">
            <div className="album-image" style={{backgroundImage: 'url('+props.thumb+')'}}></div>
            <div className="album-title">{props.title}</div>
            <div className="album-year">{props.year}</div>
        </div>
    )
}