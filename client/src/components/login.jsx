import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Register from './register';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { loginAction } from '../loginSlice';

function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [invalidCred, setInvalidCred] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const navigate = useNavigate();

    const loginData = {
        'username': username,
        'password': password
    };

    const dispatch = useDispatch();

    function authenticate(data) {
        fetch('http://localhost:3001/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            credentials: 'include'
        }).then(response => {
            if (!response.ok) {
                setInvalidCred(true);
            }
            return response.json();
        }).then(data => {
            dispatch(loginAction(data.userID));
            navigate('/home');
        });
    }

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: "calc(100vh - 70px)" }}>
            <Register show={showRegisterModal} handleClose={() => setShowRegisterModal(false)} login={authenticate} />
            <Col className="col-md-3">
                <Form>
                    <h2 className="text-center mb-3">Sign in</h2>
                    <Form.Group className="mb-4">
                        <Form.Control type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-4">
                        <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                    </Form.Group>
                    <div className="d-grid gap-2">
                        <Button variant="primary" block onClick={() => authenticate(loginData)}>Sign in</Button>
                    </div>
                    {invalidCred && <Alert variant="danger" className="mt-3">Invalid credentials</Alert>}
                    <div className="text-center mt-3">
                        <p>Not a member? <a href="#!" onClick={() => setShowRegisterModal(true)}>Register</a></p>
                    </div>
                </Form>
            </Col>
        </Container>
    );
}

export default Login;
