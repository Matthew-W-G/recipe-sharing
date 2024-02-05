import useFetchImages from "../../hooks/useFetchImages";
import styles from './viewRecipe.module.css';

function ViewRecipeImage(props) {
    const { url, isLoading, isError } = useFetchImages(props.recipe.title);
    
    if(url) {
        return (
            <div className={styles.imageContainer}>
                <h1 className={styles.header}>{props.recipe.title}</h1>
                <h2 className={styles.header} style={{ fontSize: '25px' }}>by {props.recipe.author}</h2>
                <img src={url} alt="Featured Recipe" />
            </div>
        )
    } else if(isLoading) {
        return <div>Loading</div>
    } else {
        return <div></div>
    }


}

export default ViewRecipeImage;