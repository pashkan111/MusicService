import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/loader'
import Message from '../components/message'
import FormContainer from '../components/FormContainer'
import {login} from '../Actions/userActions'
import axios from 'axios'

function Login({location, history}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'
    const userLogin = useSelector(state => state.userLogin)
    const {loading, error, userInfo} = userLogin

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const handlerSubmit = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }
    return (
        
            <FormContainer>  
                <h2>Войти</h2>
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader />}
                <Form onSubmit={handlerSubmit}>
                    <FormGroup controlId='email'>
                        <FormLabel>Email address</FormLabel>
                        <FormControl
                            type='email'
                            placeholder='Введите email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        >
                        </FormControl>
                    </FormGroup>
                    
                    <FormGroup controlId='password'>
                        <FormLabel>Password</FormLabel>
                        <FormControl
                        type='password'
                        placeholder='Введите password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        >
                        </FormControl>

                    </FormGroup>
                    <Button
                        type='submit'
                        variant='primary'                   
                    >
                        Войти
                    </Button>
                </Form>
                <Row className='py-3'>
                    <Col>
                        Новый пользователь? <Link
                            to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                            Зарегистрироваться
                            </Link>
                    </Col>
                </Row>
            </FormContainer>  

    )
}

export default Login
