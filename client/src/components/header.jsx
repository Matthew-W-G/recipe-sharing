import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logoutAction } from '../loginSlice';
import { PersonCircle } from "react-bootstrap-icons"

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.login.isLoggedin);

    function logout() {
        fetch('http://localhost:3001/logout', {
            method: 'POST',
            credentials: 'include'
        }).then((response) => {
            if (response.ok) {
                dispatch(logoutAction());
            }
        });
    };

    return (
        <Navbar expand="lg" bg="light" variant="light">
            <Container>
                <Navbar.Brand href="/home">
                    <img src="/recipeLogo.png" style={{ borderRadius: '50%', maxWidth: '100px', maxHeight: '50px' }} alt="Logo" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/home">Home</Nav.Link>
                        <Nav.Link href="/findrecipes">Find Recipes</Nav.Link>
                        {isLoggedIn && <Nav.Link href="/addrecipe">Add Recipe</Nav.Link> }
                    </Nav>
                    <div>
                        {isLoggedIn ?
                            <div>
                                <PersonCircle onClick={() => navigate('/user')} className="mr-3" size="30" color="#0275d8"></PersonCircle>
                                <Button variant="outline-primary" onClick={() => logout()}>Log out</Button>
                            </div> :
                            <Button variant="primary" onClick={() => navigate('/login')}>Sign In</Button>
                        }
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;