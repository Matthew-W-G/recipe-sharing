import { Carousel, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSWR from 'swr';
import useFetchFeaturedRecipes from "../../hooks/useFetchFeaturedRecipes";
import ImageContainer from "./imageContainer";

function Home() {
    const { recipes, isLoading, error } = useFetchFeaturedRecipes();

    const navigate = useNavigate();

    return (
        <div>
            {(recipes) ?
                <Carousel fade="true" >
                    {
                        recipes.map(recipe =>
                            <Carousel.Item onClick={() => navigate(`/recipe/${recipe._id}`)}>
                                <ImageContainer recipe={recipe}></ImageContainer>
                            </Carousel.Item>
                        )
                    }
                </Carousel> : <div>loading</div>
            }
        </div>
    );

}

export default Home;