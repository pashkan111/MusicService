import React from 'react'
import {Row, Col, Card, CardGroup} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'

function Home() {

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    return (       
    <div className='row justify-content-md-center col-md-12 col-sm-12 col-xs-12'>
        <CardGroup className='mt-2 mb-4'>
            <Card>
                <h2 className='text-center'>Добро пожаловать в Music servise</h2>
            </Card>
        </CardGroup>
        <Row >
            <Row>
            <Col className="col-md-6 offset-2">
                <Card style={{width: '14rem', border: 'double'}}>
                <Link to={userInfo ? ('/my_playlists/') : ('/login/')}>
                    <Card.Img variant="top" src="https://vk.vkfaces.com/849136/v849136189/18d9d4/JjGcZP3Zby8.jpg" style={{width: '220px'}}/>
                    <Card.Body>
                    <Card.Title style={{height: '3rem'}}>
                            <h4 className="text-center" >Мои плейлисты</h4>            
                    </Card.Title>
                    </Card.Body>
                    </Link>
                </Card>
            </Col>
            <Col className="col-md-4">
                <Card style={{width: '14rem', border: 'double', marginTop: '5px'}}>
                <Link to='/music/'>
                    <Card.Img variant="top" src="https://yt3.ggpht.com/ytc/AAUvwngBQ1xjRxSTX6eMq7DnJ1aUTqQBi5pDNhB5ePBP-g=s900-c-k-c0x00ffffff-no-rj" style={{width: '220px'}}/>
                    <Card.Body>
                    <Card.Title style={{height: '3rem'}}>
                        <Link>
                            <h4 className="text-center">Музыка</h4>
                        </Link>            
                    </Card.Title>
                    </Card.Body>
                    </Link>
                </Card>
            </Col>
            </Row>
                 
        </Row>
        </div>    

    )
}

export default Home
