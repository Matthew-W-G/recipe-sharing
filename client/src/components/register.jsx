import Modal from 'react-bootstrap/Modal';
import { Button, Form, Row, Col, Container } from 'react-bootstrap';
import { useState } from 'react';


function Register(props) {
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: ""
  });

  const [invalidField, setInvalidField] = useState({
    firstName: false,
    lastName: false,
    username: false,
    email: false,
    password: false
  });

  const [registrationError, setRegistrationError] = useState("");

  function registrationRequest(e) {
    if (checkFields()) {
      e.preventDefault();
      fetch(`${process.env.REACT_APP_API_URL}/users/adduser`,
        {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(registerData)
        }).then((response) => {
          if (!response.ok) {
            if (response.status === 409) {
              setInvalidField({ ...invalidField, username: true });
              setRegistrationError("Username already taken");
            } else {
              setRegistrationError("Issue with registration. Please try again later");
            }
          } else {
            const loginData = {
              username: registerData.username,
              password: registerData.password
            }
            props.login(loginData);
          }
        }).catch((error) => {setRegistrationError("Issue with registration. Please try again later");
      });
    }
  }

  function checkFields() {
    const isInvalid = {};
    let validToSubmit = true;
    for (const key in registerData) {
      isInvalid[key] = registerData[key] === '';
      validToSubmit = validToSubmit && !isInvalid[key]
    }
    setInvalidField({ ...isInvalid })
    setRegistrationError("Enter all fields")
    return validToSubmit;
  }


  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton className="d-flex justify-content-center">
        <Modal.Title className="flex-grow-1 text-center">Join today</Modal.Title>
      </Modal.Header>
      <Form onSubmit={e => registrationRequest(e)}>
        <Modal.Body>
          <Row>
            <Col className="col-md-6 text-center">
              <Form.Group className="mb-3" controlId="registerFirstName">
                <Form.Label className="text-dark fs-6">First Name*</Form.Label>
                <Form.Control className={invalidField.firstName ? "border-danger" : ""} placeHolder="First Name" onChange={(e) => setRegisterData({ ...registerData, firstName: e.target.value })} />
              </Form.Group>
            </Col>
            <Col className="md-6 text-center">
              <Form.Group className="mb-3" controlId="registerLastName">
                <Form.Label className="text-dark">Last Name*</Form.Label>
                <Form.Control className={invalidField.lastName ? "border-danger" : ""} placeHolder="Last Name" onChange={(e) => setRegisterData({ ...registerData, lastName: e.target.value })} />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3 text-center" controlId="registerEmail">
            <Form.Label className="text-dark">Email*</Form.Label>
            <Form.Control className={invalidField.email ? "border-danger" : ""} placeHolder="Email" onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })} />
          </Form.Group>
          <Form.Group className="mb-3 text-center " controlId="registerUsername">
            <Form.Label className="text-dark">Username*</Form.Label>
            <Form.Control className={invalidField.username ? "border-danger" : ""} placeHolder="Username" onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })} />
          </Form.Group>
          <Form.Group className="mb-3 text-center" controlId="registerPassword">
            <Form.Label className="text-dark">Password*</Form.Label>
            <Form.Control className={invalidField.password ? "border-danger" : ""} placeHolder="Password" onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Container>
            <Row>
              <Col className="col-xs-12 col-md-8 text-center text-danger" style={{"font-size":"12px", "font-weight":"bold"}}>{registrationError}</Col>
              <Col className="col-xs-6 col-md-4">
                <Button className="mr-2" variant="secondary" onClick={props.handleClose}>
                  Close
                </Button>
                <Button type="Submit" variant="primary">Join</Button>
              </Col>
            </Row>
          </Container>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default Register;