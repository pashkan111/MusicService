import React from 'react'
import {Navbar, Nav, Container, NavDropdown} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {logout} from '../Actions/userActions'

function Header() {

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
      <Navbar bg="light" expand="lg" collapseOnSelect>
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>Music service</Navbar.Brand>
                </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        {userInfo ? (
                            <NavDropdown title={userInfo.name} id='email'>
                                <LinkContainer to='/profile'>
                                    <NavDropdown.Item>Профиль</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logoutHandler}>Выйти</NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <Nav>
                            <LinkContainer to="/register/">
                                <Nav.Link><i className='fas fa-user'></i>Регистрация</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/login/">
                                <Nav.Link><i className='fas fa-user'></i>Войти</Nav.Link>
                            </LinkContainer>
                            </Nav>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header