import React, {useEffect, useState} from 'react';
import './song.css'
import {Card} from 'react-bootstrap'

function Song(props) {
    const [important, setImportant] = useState(true)
    const {playlist} = props
    let classNames = 'app-list-item d-flex justify-content-between';

    const OnToggleImportant = () => {
        setImportant(!important)
    }

    if (important) {
            classNames += ' important';
        }

    useEffect(() => {
        console.log('changed')
        console.log(playlist)
        console.log(playlist.song)
    }, [])

    return(
               playlist.song.map(item => (
            <Card className='my-2 rounded' style={{ width: '50rem' }}>
                <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Subtitle className="text-muted">{item.performer}</Card.Subtitle>
                </Card.Body>
            </Card>

)) 
    )      
}

export default Song;
