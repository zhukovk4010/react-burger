//Компонент деталец выбранного ингредиента, передается в модальное окно

//Импорты
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router";

import { AppStateType } from "../../../../../services/reducers/rootReducer";

import {
    DIGITS_DEFAULT,
    TEXT_DEFAULT,
    TEXT_INACTIVE_COLOR,
    TEXT_LARGE,
    TEXT_MEDIUM,
} from "../../../../../utils/constants";
import styles from "./IngredientDetails.module.css";

const IngredientDetails = () => {
    const location = useLocation();
    const { id } = useParams();
    const { ingredientsData } = useSelector((state: AppStateType) => ({
        ingredientsData: state.ingredients.ingredientsData,
    }));

    let background = location.state && location.state.background;

    //Находим нужный ингредиент
    const selectedIngredient = ingredientsData.find(
        (element) => element._id === id
    );

    if (ingredientsData.length === 0) {
        return <div>Ожидайте</div>;
    }

    return (
        <section className={styles.container}>
            {background ? (
                ""
            ) : (
                <div className={`${TEXT_LARGE} ${styles.headerName}`}>
                    Детали ингредиента
                </div>
            )}
            <div className={styles.ingredientImg}>
                <img src={selectedIngredient?.image_large} alt={""} />
            </div>
            <p className={`${TEXT_MEDIUM} ${styles.nameIngredient}`}>
                {selectedIngredient?.name}
            </p>
            <div className={styles.detailInfomation}>
                <div className={styles.categoryInformation}>
                    <p className={`${TEXT_DEFAULT} ${TEXT_INACTIVE_COLOR}`}>
                        Калории,ккал
                    </p>
                    <p className={`${DIGITS_DEFAULT} ${TEXT_INACTIVE_COLOR}`}>
                        {selectedIngredient?.calories}
                    </p>
                </div>
                <div className={styles.categoryInformation}>
                    <p className={`${TEXT_DEFAULT} ${TEXT_INACTIVE_COLOR}`}>
                        Белки, г
                    </p>
                    <p className={`${DIGITS_DEFAULT} ${TEXT_INACTIVE_COLOR}`}>
                        {selectedIngredient?.proteins}
                    </p>
                </div>
                <div className={styles.categoryInformation}>
                    <p className={`${TEXT_DEFAULT} ${TEXT_INACTIVE_COLOR}`}>
                        Жиры, г
                    </p>
                    <p className={`${DIGITS_DEFAULT} ${TEXT_INACTIVE_COLOR}`}>
                        {selectedIngredient?.fat}
                    </p>
                </div>
                <div className={styles.categoryInformation}>
                    <p className={`${TEXT_DEFAULT} ${TEXT_INACTIVE_COLOR}`}>
                        Углеводы, г
                    </p>
                    <p className={`${DIGITS_DEFAULT} ${TEXT_INACTIVE_COLOR}`}>
                        {selectedIngredient?.carbohydrates}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default IngredientDetails;
