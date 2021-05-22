import Loader from '../components/loader'
import Message from '../components/message'
import FormContainer from '../components/FormContainer'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {register} from '../Actions/userActions'

function Register({location, history}) {

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')

    const userRegister = useSelector(state => state.userRegister)
    const dispatch = useDispatch()
    const redirect = location.search ? location.search.split('=')[1] : '/'

    const {loading, error, userInfo} = userRegister

    const handlerSubmit = (e) => {
        e.preventDefault()
        dispatch(register(email, username, password, password2))
    }

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    return (
        <FormContainer>  
                <h2>Регистрация</h2>
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader />}
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
                    
                    <FormGroup controlId='password'>
                        <FormLabel>Пароль</FormLabel>
                        <FormControl
                        type='password'
                        placeholder='Введите пароль'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        >
                        </FormControl>
                    </FormGroup>
                    
                    <FormGroup controlId='password'>
                        <FormLabel>Подтвердите пароль</FormLabel>
                        <FormControl
                        type='password'
                        placeholder='Подтвердите пароль'
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                        >
                        </FormControl>
                    </FormGroup>
                    <Button
                        type='submit'
                        variant='primary'                   
                    >
                        Зарегистрироваться
                    </Button>
                </Form>
                <Row className='py-3'>
                    <Col>
                        Уже есть аккаунт? <Link
                            to={redirect ? `/login?redirect=${redirect}` : '/login/'}>
                            Войти
                            </Link>
                    </Col>
                </Row>
            </FormContainer>  
    )
}

export default Register
