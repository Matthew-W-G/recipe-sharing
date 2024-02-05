import useFetchImages from '../../hooks/useFetchImages';
import styles from './findRecipesImage.module.css'

function FindRecipesImage(props) {
    const { url, isLoading, isError } = useFetchImages(props.recipe.title);

    return (
        url ?
        <div className={styles.imageContainer}>
            <img src={url} alt="Featured Recipe"></img>
        </div> : <div>loading</div>
    )
}

export default FindRecipesImage;