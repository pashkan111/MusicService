import React, {useState, useEffect} from 'react'
import { Button, Table, Card, Row, Col} from 'react-bootstrap'
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../components/loader'
import Message from '../components/message'
import Search from '../components/search'
import {Link} from 'react-router-dom'

function Playlist(props) {
    // const dispatch = useDispatch()
    // const playlistDetail = useSelector(state => state.playlistDetail)
    // const {loading, error, playlist} = playlistDetail

    const [playlist, setPlaylist] = useState([])
    const [currentPage, setCurrent] = useState(0)
    const [fetching, setFetching] = useState(true)
    const [count, setCount] = useState(0)

    
    const id = props.match.params.id
    const playlistName = props.location.search.split('=')[1].replace('%', ' ')
    
    useEffect(() => {
        if (fetching) {
            axios.get(`http://127.0.0.1:8000/api/playlist/${id}?limit=20&offset=${currentPage}`)
            .then(resp => {
                // setPlaylist(...playlist, ...resp.data.results)
                setPlaylist([...playlist, ...resp.data.results])
                setCount(resp.data.count+1)
                setCurrent(prev => prev+20)
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
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) <150) {
            setFetching(true)
        }
    }

    function deleteSong(song_id) {
        const body= JSON.stringify({
            'playlist_id': id,
            'song_id': song_id
        })
        axios({
            method: "POST",
            headers: { "Content-Type": "application/json" },
            url: 'http://127.0.0.1:8000/api/delete-song/playlist/',
            data: body,            
        }).then(resp => console.log(resp))
        setPlaylist(playlist.filter(item => item.id !== song_id))

    }

    useEffect(() => {
        setCount(prev => prev-1)
    }, [playlist])


    return (
        <div className='row justify-content-md-center'>
            {/* <Search/> */}
        {/* {
            loading? <Loader/>
        :error ? <Message variant='danger'>{error}</Message> */}
        : 
        <Row>
                <h2 className="text-center">{playlistName}</h2>
                <h2>Всего: {count}</h2>
            {
                playlist.length == 0 ?
                <Row>
                    <Col col-md-7>
                    <h4>Ваш плейлист пуст...<Link  to='/music/'><h4 className="text-center" >Добавить песни</h4>
                    </Link></h4>
                    </Col>
                </Row>
                :
                playlist.map(item => (
                    <Card className='my-2 rounded' style={{ width: '50rem' }} key={item.id}>
                        <Card.Body>
                            <Row>
                                <Col md={8}>
                                    <Card.Title>{item.title}</Card.Title>
                                    <Card.Subtitle className="text-muted">{item.performer}</Card.Subtitle>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={4}>
                                    <Button 
                                    className="danger"
                                    onClick = {() => deleteSong(item.id)}
                                    >Удалить</Button>                                  
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                ))
}
         </Row>
        </div>
    )
}
export default Playlist
