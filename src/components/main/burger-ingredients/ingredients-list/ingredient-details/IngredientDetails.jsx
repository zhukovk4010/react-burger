import { ingredientType } from '../../../../../utils/types';

import { DIGITS_DEFAULT, TEXT_DEFAULT, TEXT_INACTIVE_COLOR, TEXT_MEDIUM } from '../../../../../utils/constants';
import styles from './IngredientDetails.module.css';


const IngredientDetails = props => {

    return (
        <section className={styles.container}>
            <div className={styles.ingredientImg}>
                <img src={props.ingredient.image_large} alt={''} />
            </div>
            <p className={`${TEXT_MEDIUM} ${styles.nameIngredient}`}>{props.ingredient.name}</p>
            <div className={styles.detailInfomation}>
                <div className={styles.categoryInformation}>
                    <p className={`${TEXT_DEFAULT} ${TEXT_INACTIVE_COLOR}`}>Калории,ккал</p>
                    <p className={`${DIGITS_DEFAULT} ${TEXT_INACTIVE_COLOR}`}>{props.ingredient.calories}</p>
                </div>
                <div className={styles.categoryInformation}>
                    <p className={`${TEXT_DEFAULT} ${TEXT_INACTIVE_COLOR}`}>Белки,  г</p>
                    <p className={`${DIGITS_DEFAULT} ${TEXT_INACTIVE_COLOR}`}>{props.ingredient.proteins}</p>
                </div>
                <div className={styles.categoryInformation}>
                    <p className={`${TEXT_DEFAULT} ${TEXT_INACTIVE_COLOR}`}>Жиры,  г</p>
                    <p className={`${DIGITS_DEFAULT} ${TEXT_INACTIVE_COLOR}`}>{props.ingredient.fat}</p>
                </div>
                <div className={styles.categoryInformation}>
                    <p className={`${TEXT_DEFAULT} ${TEXT_INACTIVE_COLOR}`}>Углеводы,  г</p>
                    <p className={`${DIGITS_DEFAULT} ${TEXT_INACTIVE_COLOR}`}>{props.ingredient.carbohydrates}</p>
                </div>
            </div>
        </section>
    )
}

IngredientDetails.propTypes = {
    ingredient: ingredientType,
}


export default IngredientDetails;