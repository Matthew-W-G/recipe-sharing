import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Form, Container, Row, Col, Button, Alert } from 'react-bootstrap'

function User() {
    const { isLoggedin, userID, isLoading } = useSelector(state => state.login);
    const navigate = useNavigate();
    const [userData, setUserData] = useState({});
    const [changesSaved, setChangesSaved] = useState(false)

    useEffect(() => {
        if (!isLoading) {
            if (!isLoggedin) {
                navigate('/login');
            } else {
                fetch(`${process.env.REACT_APP_API_URL}/users/${userID}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                }).then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not OK');
                    }
                    return response.json();
                }).then(data => {
                    setUserData(data);
                });
            } 
        } else {
            return <div>loading</div>
        }
    }, [isLoading, isLoggedin]);

    function saveChanges(e) {
        e.preventDefault();
        fetch(`${process.app.REACT_APP_API_URL}/users/updateUser/${userID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(userData)
        }).then(response => {
            if (response.ok) {
                setChangesSaved(true);
            }
        });
    }

    return (
        <Container className="justify-content-center mt-5 text-center" style={{ height: '100vh' }}>
            <Row className="justify-content-center">
                <Col md={6}>
                    <h2 className="mb-5">hello, {userData.firstName}!</h2>
                    <Form onSubmit={(e) => saveChanges(e)} className="mb-4">
                        <Row className="justify-content-center text-center mb-3" >
                            <Col md={3}>
                                <Form.Group>
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control defaultValue={userData.firstName} onChange={(e) => setUserData({...userData, firstName: e.target.value})}></Form.Control>
                                </Form.Group>
                            </Col>
                            <Col md={3}>
                                <Form.Group>
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control defaultValue={userData.lastName} onChange={(e) => setUserData({...userData, lastName: e.target.value})}></Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control defaultValue={userData.username} onChange={(e) => setUserData({...userData, username: e.target.value})}></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control readOnly defaultValue={userData.email}></Form.Control>
                        </Form.Group>
                        <Row className="justify-content-center">
                            <Col className="md-6">
                                <Button type="Submit" variant="primary">Save</Button>
                            </Col>
                        </Row>
                    </Form>
                    <div>
                        {changesSaved && <Alert variant="success">Changes saved successfully!</Alert>}
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default User;