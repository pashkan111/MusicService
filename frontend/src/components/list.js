import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {playlistActions} from '../playlistActions/actions'
import {useDispatch, useSelector} from 'react-redux'
import Loader from './loader'
import Message from './message'

function Playlists() {

    const dispatch = useDispatch()
    const playList = useSelector(state => state.playList)
    const {loading, error, playlists} = playList
    
    useEffect(() => {
        dispatch(playlistActions())
    }, [])

    return (
        <div>
            {
                loading ? <Loader/>
                :error ? <Message variant='danger'>{error}</Message>
                : <ul>
                        <li>
                        {playlists.map(item => (
                            <Link to={`/playlist-detail/${item.id}`}>
                                <h3 key={item.id}>{item.name}</h3>
                            </Link>
                        ))}
                        
                        </li>
                    </ul>
            }
        </div>
    )
}

export default Playlists
