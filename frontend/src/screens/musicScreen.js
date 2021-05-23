import React, {useState, useEffect} from 'react'
import { Button, Table, Card, Row, Col, NavDropdown } from 'react-bootstrap'
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../components/loader'
import Message from '../components/message'
import Search from '../components/search'
import searchSong from '../store'

function MusicScreen() {

    const playList = useSelector(state => state.playList)
    const {playlists} = playList
    const searchSong = useSelector(state => state.searchSong)
    const {term} = searchSong

    const ref = React.useRef()
    const [songs, setSongs] = useState([])
    const [currentPage, setCurrent] = useState(0)
    const [fetching, setFetching] = useState(true)
    const [count, setCount] = useState(0)
    
    useEffect(() => {
        if (fetching) {  
            queryData(term)
            console.log('aaaaaa')
        }
    }, [term])

function queryData(term) {
    axios({
        method:"POST",
        url: 'http://127.0.0.1:8000/api/songs/',
        headers: {"Content-Type": "application/json"},
        data:{
            "term": term
        }
    })
    .then(resp => {
        ref.current = resp.data
        sorting()
    })
}

function sorting() {
    const len = 20
    if (ref.current.length < len) {
        setSongs(ref.current)
    } else {
        const countIter = Math.ceil(ref.current.length/len)
        if (fetching == true) {
            for (let i=0; i<countIter; i++) {
            let x = 0; let y = 20
            setSongs(...songs, ref.current.slice(x, y))
            x = x+20; y = y+20
            setFetching(false)
            }
        }
    }
}

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)
        return function() {
            document.removeEventListener('scroll', scrollHandler)
        } 
    }, [])

    const scrollHandler = (e) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) <100) {
            setFetching(true)
        }
    }


    const addSongToPlaylist = (playlist_id, song_id) => {
        const data = {
            'song_id': song_id,
            'playlist_id': playlist_id
        }
        axios({
            method:"POST",
            url:'http://127.0.0.1:8000/api/add-song-to-playlist/',
            headers: {"Content-Type": "application/json"},
            data: data
        }).then (resp => console.log(resp))
    }

    return (
        <div className='row justify-content-md-center'>
            <Search/>
        {/* {
            loading? <Loader/>
        :error ? <Message variant='danger'>{error}</Message> */}
        : 
        <Row>
                <h2 className="text-center">Музыка</h2>
                <h2>Всего: {count}</h2>

                {songs.map(item => (
                    <Card className='my-2 rounded' style={{ width: '50rem' }} key={item.id}>
                        <Card.Body>
                            <Row>
                                <Col md={8}>
                                    <Card.Title>{item.title}</Card.Title>
                                    <Card.Subtitle className="text-muted">{item.performer}</Card.Subtitle>
                                </Col>
                            </Row>
                            <Row>
                                <NavDropdown title='Добавить'>
                                {playlists.map(i => (
                                    <NavDropdown.Item key={i.id} onClick={() => addSongToPlaylist(i.id, item.id)}>{i.name}</NavDropdown.Item>
                                    ))}
                                </NavDropdown>
                            </Row>
                        </Card.Body>
                    </Card>
                ))}
         </Row>
        </div>
    )
}
export default MusicScreen
