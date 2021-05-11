import React from 'react'
import {Card} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import axios from 'axios'

function Home() {
    return (
        <Card className='my-3 p-3 rounded'>
            <h1>HOME</h1>
            <Link to='/my_playlists/'>
                Мои плейлисты
            </Link>
        </Card>
    )
}

export default Home
