import React, {useState, useEffect} from 'react'
import Song from './song'
import {Button, Table} from 'react-bootstrap'
import axios from 'axios'
import {Row} from 'react-bootstrap'
import {playlistDetailActions} from '../playlistActions/actions'
import {useDispatch, useSelector} from 'react-redux'
import Loader from './loader'
import Message from './message'

function Playlist({match}) {
    const dispatch = useDispatch()
    const playlistDetail = useSelector(state => state.playlistDetail)
    const {loading, error, playlist} = playlistDetail

    useEffect(() => {
        dispatch(playlistDetailActions(match.params.id))
    }, [])

    return (
        <div>
        {
            loading? <Loader/>
            :error ? <Message variant='danger'>{error}</Message>
        : <Row>
            <Song playlist = {playlist}/>
        </Row>
    }
        </div>

    )
}

export default Playlist
