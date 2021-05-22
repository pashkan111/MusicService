import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/loader'
import Message from '../components/message'
import FormContainer from '../components/FormContainer'
import {userDetail, userUpdateProfile} from '../Actions/userActions'
import axios from 'axios'
import {USER_UPDATE_RESET} from '../constants/userConstance'

function ProfileScreen({history}) {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')

    const userLogin = useSelector(state => state.userLogin)
    const userDetails = useSelector(state => state.userDetails)
    const userReset = useSelector(state => state.userReset)
    const dispatch = useDispatch()

    const { userInfo } = userLogin
    const { user } = userDetails
    const { success } = userReset

    useEffect(() => {
        if (!userInfo) {
            history.push('/login/')
        } else {
            if (!user || !user.email || success) {
                dispatch({type: USER_UPDATE_RESET})
                dispatch(userDetail())              
            } else {
                setEmail(user.email)
                setUsername(user.name)
            }   
        }
    }, [dispatch, history, userInfo,success, user])

    const handlerSubmit = (e) => {
        e.preventDefault()
        dispatch(userUpdateProfile({
            'name': username,
            'email': email
        }))
    }

    return (
        <Row>
            <Col md={5}>
                <h3 className="text-center">Мой профиль</h3>
                <FormContainer>  
                    {/* {error && <Message variant='danger'>{error}</Message>}
                    {loading && <Loader />} */}
                    <Form onSubmit={handlerSubmit}>
                        <FormGroup controlId='email'>
                            <FormLabel>Email</FormLabel>
                            <FormControl
                                type='email'
                                placeholder='Введите email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            >
                            </FormControl>
                        </FormGroup>

                        <FormGroup controlId='username'>
                            <FormLabel>Имя</FormLabel>
                            <FormControl
                                type='username'
                                placeholder='Введите ваше имя'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            >
                            </FormControl>
                        </FormGroup>
                        
                        
                        <Button
                            type='submit'
                            variant='primary'                   
                        >
                            Изменить
                        </Button>
                    </Form>
                </FormContainer> 
            </Col>
            <Col md={7}>
                <h3>Мои плейлисты</h3>
            </Col>
        </Row>
    )
}

export default ProfileScreen
