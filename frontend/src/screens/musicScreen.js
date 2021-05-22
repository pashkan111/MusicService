import React, {useState, useEffect} from 'react'
import { Button, Table, Card, Row, Col, NavDropdown } from 'react-bootstrap'
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../components/loader'
import Message from '../components/message'
import Search from '../components/search'

function MusicScreen() {
    // const dispatch = useDispatch()
    // const playlistDetail = useSelector(state => state.playlistDetail)
    // const {loading, error, playlist} = playlistDetail
    // const dispatch = useDispatch()
    const playList = useSelector(state => state.playList)
    const {playlists} = playList

    const [songs, setSongs] = useState([])
    const [currentPage, setCurrent] = useState(0)
    const [fetching, setFetching] = useState(true)
    const [count, setCount] = useState(0)
    
    useEffect(() => {

        if (fetching) {
            axios.get(`http://127.0.0.1:8000/api/songs/?_limit=10&_page=3&offset=${currentPage}`)
            .then(resp => {
                setSongs([...songs, ...resp.data.results])
                setCurrent(prev => prev+20)
                setCount(resp.data.count)
            })
            .finally(() => {
                setFetching(false)

            })
        }
    }, [fetching])

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

    const searchMusic = (str) => {
        axios({
            method:"POST",
            url: "http://127.0.0.1:8000/api/search-music/",
            data: {
                'term': str
            },
            headers: {"Content-Type": "application/json"},
        }).then(resp => setSongs(resp.data))
    }

    return (
        <div className='row justify-content-md-center'>
            <Search searchMusic={searchMusic}/>
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
                                    // <NavDropdown.Item key={i.id} onClick={() => console.log(i.id, item.id)}>{i.name}</NavDropdown.Item>
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
