//Подложка модального окна

//Импорты
import styles from "./ModalOverlay.module.css";

//Типы
type ModalOverlayPropsType = {
    onClose: () => void;
};

const ModalOverlay = ({ onClose }: ModalOverlayPropsType) => {
    return (
        <section
            onClick={() => {
                onClose();
            }}
            className={styles.modalOverlay}
        ></section>
    );
};

export default ModalOverlay;
