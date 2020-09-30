import React, {useEffect, useState} from 'react'
export default function NoSearch(props) {
    
    return (
        <div className="no-search">
            <h2 className="main-title">No related {props.title} :(</h2>
        </div>
    )
}