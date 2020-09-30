import React, {useEffect, useState} from 'react'

export default function TopCart(props) {
    const [duration,
        setDuration] = useState('');
    // Convering miliseconds into representative time
    const getDuration = (time) => {
        const totalSeconds = Math.floor((time / 1000) % 60);
        const totalMinutes = Math.floor((time / 1000 / 60) % 60);
        const totalDuration = [
            totalMinutes
                .toString()
                .slice(0, 2),
            totalSeconds
                .toString()
                .slice(0, 2)
        ].join(':');
        if (parseInt(totalMinutes) < 10) {
            setDuration('0' + (totalDuration.charAt(3) === '' ? totalDuration+'0' : totalDuration))
        } else {
            setDuration((totalDuration.charAt(3) === '' ? totalDuration+'0' : totalDuration))
        }

    }
    // Lyfe Cicle used to run getDuration function, getting the track duration into
    // mm:ss format
    useEffect(() => {
        getDuration(parseInt(props.duration))
    }, [props.duration])

    return (
        <div className="top-cart row">
            <p className="top-position">{props.position}</p>
            <div
                className="top-image"
                style={{
                backgroundImage: 'url(' + props.thumb + ')'
            }}></div>
            <div className="top-song-info column">
                <div className="top-title">{props.title}</div>
                <div className="top-album">{props.albumName}</div>
            </div>
            <div className="top-duration">
                <p>{duration}
                </p>
            </div>
        </div>
    )
}