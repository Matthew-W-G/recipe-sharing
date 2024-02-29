import React, { useEffect, useState } from 'react';
import { Container, Form, Row, Col, ListGroup, Button, InputGroup } from 'react-bootstrap';
import styles from './addRecipe.module.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { loginAction } from '../../loginSlice';

function AddRecipe() {
    const navigate = useNavigate();
    const loginState = useSelector(state => state.login);

    useEffect(() => {
        if (!loginState.isLoading && !loginState.isLoggedin) {
            navigate('/login')

        }
    }, [loginState])

    const [recipeName, setRecipeName] = useState('');
    const [ingredientList, setIngredientList] = useState([]);
    const [newIngredient, setNewIngredient] = useState('');
    const [stepList, setStepList] = useState([]);
    const [newStep, setNewStep] = useState('');
    const [prepHours, setPrepHours] = useState(0);
    const [prepMins, setPrepMins] = useState(0);
    const [prepTime, setPrepTime] = useState('');
    const [validField, setValidField] = useState({
        name: true,
        ingredients: true,
        steps: true,
        prepMins: true,
        prepHours: true,
    });

    function addIngredient(e) {
        e.preventDefault();
        if (newIngredient.trim() !== '') {
            setIngredientList([...ingredientList, newIngredient]);
            setNewIngredient('');
        }
    }

    function addStep(e) {
        e.preventDefault();
        if (newStep.trim() !== '') {
            setStepList([...stepList, newStep]);
            setNewStep('');
        }
    }

    function isValid() {
        const checkFields = {
            name: recipeName.trim() !== '',
            steps: stepList.length > 0,
            ingredients: ingredientList.length > 0,
            prepMins: prepMins + prepHours !== 0,
            prepHours: prepMins + prepHours !== 0
        };
        setValidField(checkFields);
        console.log(checkFields)

        let res = true;
        for (const key in checkFields) {
            console.log(res && checkFields[key])
            res = res && checkFields[key];
        }
        return res
    }

    function addRecipe() {
        if (isValid()) {
            const time = prepHours === 0 ? `${prepMins} mins` : `${prepHours} hr ${prepMins} mins`;
            setPrepTime(time);
            const recipeData = {
                'title': recipeName,
                'steps': stepList,
                'ingredients': ingredientList,
                'prepTime': time
            };
            console.log(recipeData)
            fetch(`${process.env.REACT_APP_API_URL}/recipes/addRecipe`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(recipeData)
            }).then(response => {
                if (!response.ok) {
                    throw new Error(response.status)
                }
                return response.json()
            }).then(data => {
                navigate(`/recipe/${data._id}`)
            })
        }
    }

    return (
        <Container style={{ marginTop: '20px' }} className={styles.form}>
            <Row className={"justify-content-md-center"}>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label style={{ fontSize: '24px' }}>Recipe Name</Form.Label>
                        <Form.Control className={validField.name ? 'primary' : 'border-danger'} onChange={(e) => setRecipeName(e.target.value)} type="text" placeholder="Enter recipe name" />
                    </Form.Group>
                    <Form onSubmit={(e) => addIngredient(e)} >
                        <Form.Group className="mb-3">
                            <Form.Label style={{ fontSize: '24px' }}>Ingredients</Form.Label>
                            <ListGroup className="mb-2">
                                {
                                    ingredientList.map(ingredient => {
                                        return (
                                            <ListGroup.Item className="mb-1" variant="secondary">
                                                {ingredient}
                                            </ListGroup.Item>
                                        )
                                    })
                                }
                            </ListGroup>
                            <InputGroup className="mb-2">
                                <Form.Control className={validField.ingredients ? 'primary' : 'border-danger'} value={newIngredient} onChange={(e) => setNewIngredient(e.target.value)} placeholder="Enter ingredient"></Form.Control>
                                <Button type="Submit" style={{ fontWeight: 'bold' }}>Add Ingredient</Button>
                            </InputGroup>
                        </Form.Group>
                    </Form>
                    <Form onSubmit={(e) => addStep(e)} >
                        <Form.Group className="mb-3">
                            <Form.Label style={{ fontSize: '24px' }}>Steps</Form.Label>
                            <ListGroup as="ol" numbered className="mb-2" style={{ textAlign: 'left' }}>
                                {
                                    stepList.map(step => {
                                        return (
                                            <ListGroup.Item className="mb-1" variant="secondary">
                                                {step}
                                            </ListGroup.Item>
                                        )
                                    })
                                }
                            </ListGroup>
                            <InputGroup className="mb-2">
                                <Form.Control className={validField.steps ? 'primary' : 'border-danger'} value={newStep} onChange={(e) => setNewStep(e.target.value)} placeholder="Enter step"></Form.Control>
                                <Button type="Submit" style={{ fontWeight: 'bold' }}>Add Step</Button>
                            </InputGroup>
                        </Form.Group>
                    </Form>
                    <Form.Group className="mb-3">
                        <Form.Label style={{ fontSize: '24px' }}>Prep Time</Form.Label>
                        <Row style={{ justifyContent: 'center' }}>
                            <Col md={3}>
                                <Form.Control className={validField.prepHours ? 'primary' : 'border-danger'} onChange={(e) => setPrepHours(e.target.value)} type="text" placeholder="hours" />
                            </Col>
                            <Col md={3}>
                                <Form.Control className={validField.prepMins ? 'primary' : 'border-danger'} onChange={(e) => setPrepMins(e.target.value)} type="text" placeholder="mins" />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Button onClick={() => addRecipe()} style={{ fontWeight: 'bold' }}>Add Recipe!</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default AddRecipe;
