import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/loader'
import Message from '../components/message'
import FormContainer from '../components/FormContainer'
import {createPlaylist} from '../Actions/playlistActions'
import axios from 'axios'

function CreatePlayist({location, history}) {
    const [playlistName, setPlaylistName] = useState('')  
    const dispatch = useDispatch()
    const redirect = location.search ? location.search.split('=')[1] : '/my_playlists/'

    function assignName(e) {
        const name = e.target.value
        if (name.length < 15) {
            setPlaylistName(name)
        } else {
            setPlaylistName(name.slice(0, 15))
        }
    }

    const handlerSubmit = (e) => {
        e.preventDefault()
        dispatch(createPlaylist(playlistName))
        history.push(redirect)
    }
    return (
            <FormContainer>  
                <h2>Создать новый плейлист</h2>

                <Form onSubmit={handlerSubmit}>
                    <FormGroup controlId='text'>
                        <FormLabel>Название</FormLabel>
                        <FormControl
                            type='text'
                            placeholder='Введите имя нового плейлиста'
                            onChange={assignName}
                        >
                        </FormControl>
                    </FormGroup>
                    <Button
                        type='submit'
                        variant='primary'                   
                    >
                        Создать
                    </Button>
                </Form>        
            </FormContainer>  
    )
}

export default CreatePlayist
