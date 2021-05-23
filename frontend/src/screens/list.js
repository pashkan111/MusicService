import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {playlistActions, deletePlaylistAction} from '../Actions/playlistActions'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/message'
import Loader from '../components/loader'
import logo from '../'
import { Card, Button, Row, Col } from 'react-bootstrap'


function Playlists() {

    const dispatch = useDispatch()
    const playList = useSelector(state => state.playList)
    const {loading, error, playlists} = playList

    useEffect(() => {
        dispatch(playlistActions())            
    }, [])

    return (
    <div className='row justify-content-md-center'>      
        {loading ? <Loader/>
        :error ? <Message variant='danger'>{error}</Message>
        :      
        <Row className="col-md-10">
            <h3 className="text-center mb-4">Мои плейлисты</h3>
            {playlists.map(item => (
            <Col className="col-md-3">
                <Card key={Date.now()} style={{width: '14rem', border: 'double', marginTop: '5px'}}>
                    <Card.Img variant="top" src="https://www.culture.ru/storage/images/7ca45d0d9d1e378f2338457334d35046/67daa40407747b7a5784abcfd11692cc.jpg" style={{width: '220px'}}/>
                    <Card.Body>
                    <Card.Title style={{height: '3rem'}}>
                        <Link to={`/playlist-detail/${item.id}?name=${item.name}`}>
                            <h4 className="text-center" >{item.name}</h4>
                        </Link>            
                    </Card.Title>
                    </Card.Body>
                    <Card.Footer>
                        <Row>
                            <Col md={7}>
                                <small className="text-muted">Песен: 200</small>
                            </Col>
                            <Col md={5}>
                                <Button 
                                variant="danger"
                                size='sm'
                                onClick = {() => dispatch(deletePlaylistAction(item.id))}
                                >Удалить</Button>                   
                            </Col>
                        </Row>
                    </Card.Footer>
                </Card>
            </Col>
                ))}
            <Col className="col-md-3">
                <Card style={{width: '14rem', border: 'solid', marginTop: '1rem'}}>
                    <Card.Body>
                    <Card.Title style={{height: '3rem'}}>
                        <Link to={"/playlist-create/"}>
                            <h4 className="text-center" >Добавить новый</h4>
                        </Link>            
                    </Card.Title>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
        }
    </div>
    )
}
export default Playlists
