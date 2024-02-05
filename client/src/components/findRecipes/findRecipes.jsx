import useFetchRecipes from '../../hooks/useFetchRecipes'
import { Row, Col, Form, Container } from 'react-bootstrap'
import styles from './findRecipes.module.css'
import FindRecipesImage from './findRecipesImage.jsx'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

function FindRecipes() {
    const { recipes, isLoading, error } = useFetchRecipes();
    const [filteredRecipeList, setFilteredRecipeList] = useState([]);
    const [searchFilter, setSearchFilter] = useState('');
    const [userFilter, setUserFilter] = useState(false);

    const navigate = useNavigate();
    const userID = useSelector(state => state.login.userID);

    useEffect(() => {
        setFilteredRecipeList(recipes);
    }, [recipes]);

    useEffect(() => {
        if (recipes) {
            let newList = recipes;
            if (userFilter) {
                newList = newList.filter(recipe => {
                    return recipe.authorID === userID;
                })
            }

            newList = newList.filter(recipe => {
                return recipe.title.toLowerCase().includes(searchFilter.toLowerCase());
            })

            setFilteredRecipeList(newList);
        }
    }, [searchFilter, userFilter]);


    return (
        <div>
            <Container>
                <Form>
                    <Row className="align-items-center">
                        <Col md={8} lg={9} className="mb-3 mt-3">
                            <Form.Control onChange={(e) => setSearchFilter(e.target.value)} type="search" placeholder="Find recipe" />
                        </Col>
                        <Col md={4} lg={3} className="mb-3 mt-3 d-flex justify-content-md-end">
                            <Form.Check
                                onChange={(e) => setUserFilter(e.target.checked)}
                                type="switch"
                                id="custom-switch"
                                label="My recipes only"
                            />
                        </Col>
                    </Row>
                </Form>
            </Container>
            {
                filteredRecipeList &&
                filteredRecipeList.map((recipe, idx) => {
                    return <Col>
                        {
                            (idx % 2 === 0) ?
                                <Row onClick={() => navigate(`/recipe/${recipe._id}`)}>
                                    <Col md={8}>
                                        <FindRecipesImage recipe={recipe}></FindRecipesImage>
                                    </Col>
                                    <Col md={4} className={styles.descriptionRight}>
                                        <h1 style={{ fontSize: '30px' }}>{recipe.title}</h1>
                                        <h2 style={{ fontSize: '15px' }}>by {recipe.author}</h2>
                                        <h2 style={{ fontSize: '15px' }}>prep time: {recipe.prepTime}</h2>
                                    </Col>
                                </Row>
                                :
                                <Row onClick={() => navigate(`/recipe/${recipe._id}`)}>
                                    <Col md={4} className={styles.descriptionLeft}>
                                        <h1 style={{ fontSize: '30px' }}>{recipe.title}</h1>
                                        <h2 style={{ fontSize: '15px' }}>by {recipe.author}</h2>
                                        <h2 style={{ fontSize: '15px' }}>prep time: {recipe.prepTime}</h2>
                                    </Col>
                                    <Col md={8}>
                                        <FindRecipesImage recipe={recipe}></FindRecipesImage>
                                    </Col>

                                </Row>
                        }
                    </Col>
                })
            }
        </div>
    )
};

export default FindRecipes;
