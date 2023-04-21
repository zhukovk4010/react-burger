//Экземпляр иконки ингредиента

//Импорты
import clsx from "clsx";
import styles from "./IngredientIcon.module.css";

//Типы
type IngredientIconPropsType = {
    srcSet: string;
    src: string;
    alt?: string;
    overflow?: number;
    extraClass?: string;
};

export const IngredientIcon = ({
    srcSet,
    src,
    alt = "ingredient",
    overflow = 0,
    extraClass,
}: IngredientIconPropsType) => {
    return (
        <div className={clsx(styles.container, extraClass)}>
            <div>
                <picture className={styles.picture}>
                    <source srcSet={srcSet} />
                    <img src={src} alt={alt} width="112" height="56" />
                </picture>
                {overflow > 0 && (
                    <div
                        className={clsx(
                            styles.container,
                            styles.picture,
                            styles.overflow
                        )}
                    >
                        <div
                            className={clsx(
                                styles.picture,
                                "text text_type_main-small"
                            )}
                        >
                            +{overflow}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
