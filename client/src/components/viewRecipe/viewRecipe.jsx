import { useParams } from "react-router-dom";
import ImageContainer from "../home/imageContainer";
import styles from './viewRecipe.module.css';
import useFetchImages from "../../hooks/useFetchImages";
import { Row, Col, ListGroup } from "react-bootstrap";
import { useEffect, useState } from "react";
import ViewRecipeImage from "./viewRecipeImage";

function ViewRecipe() {
    const [recipe, setRecipe] = useState();
    const params = useParams();
    const recipeID = params.recipeID;

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/recipes/${recipeID}`).
            then(response => {
                if (!response.ok) {
                    throw new Error(response.status);
                }
                return response.json();
            }).then(data => {
                setRecipe(data.recipe)
            }).catch(err => {
                return <div>Recipe not found!</div>
            })
    }, []);


    return (
        recipe ?
        <div>
            <Row className={'mb-4'}>
                <ViewRecipeImage recipe={recipe}></ViewRecipeImage>
            </Row>
            <Col>
                <Row >
                    <Col md={4} >
                        <h1 className={styles.header}>Ingredients</h1>
                        <Col className={styles.ingredientsCol}>
                            <ListGroup variant="flush">
                                {recipe.ingredients.map(ingredient =>
                                    <ListGroup.Item>{ingredient}</ListGroup.Item>
                                )}
                            </ListGroup>
                        </Col>
                    </Col>
                    <Col md={8}>
                        <h1 className={styles.header}>Steps</h1>
                        <Col className={styles.stepsCol}>
                            <ListGroup variant="flush" as="ol" numbered>
                                {recipe.steps.map(ingredient =>
                                    <ListGroup.Item>{ingredient}</ListGroup.Item>
                                )}
                            </ListGroup>
                        </Col>
                    </Col>
                </Row>
            </Col>
        </div> : <div>loading</div>
    );
};

export default ViewRecipe;
