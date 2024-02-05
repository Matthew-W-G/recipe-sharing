import styles from './home.module.css';
import useFetchImages from '../../hooks/useFetchImages';
import { Carousel } from 'react-bootstrap';

function ImageContainer(props) {
    const { url, isLoading, isError } = useFetchImages(props.recipe.title);
    return (
        url ?
        <div className={styles.imageContainer}>
            <img src={url} alt="Featured Recipe"></img>
            <Carousel.Caption>
                <h1 style={{ fontSize: '90px' }}>{props.recipe.title}</h1>
                <h2>recipe by {props.recipe.author}</h2>
            </Carousel.Caption>
        </div> : <div>loading</div>
    )
}

export default ImageContainer;