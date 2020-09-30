import React from 'react'
import {Link} from "react-router-dom";

export default function RelatedPhoto(props) {
    return (
        <Link to={"/artist/" + props.artistID} className="link-none-decoration">
            <div
                onClick={() => props.getArtistProfile(props.artistID)}
                className="related-photo relative"
                style={{
                backgroundImage: 'url(' + props.thumb + ')'
            }}></div>
        </Link>
    )
}