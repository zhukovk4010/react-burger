//Компонент модального окна, принамает в children нужную компоненту для отрисовки
//Внутри добавлен компонент подложки под модальное окно

//Импорты
import { useEffect } from "react";
import { createPortal } from "react-dom";

import ModalOverlay from "./ModalOverlay";

import { TEXT_LARGE } from "../../utils/constants";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Modal.module.css";

//Прицепляемся к диву
const modalRoot = document.getElementById("react-modals");

//Типы
type ModalPropsType = {
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
};

const Modal = ({ onClose, children, title }: ModalPropsType) => {
    //Закрытие модального окна через Escape
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, [onClose]);

    return createPortal(
        <>
            <ModalOverlay onClose={onClose} />

            <section className={styles.modal}>
                <div className={styles.titleAndButton}>
                    <h2 className={`${TEXT_LARGE} ${styles.title}`}>{title}</h2>
                    <button onClick={onClose} className={styles.buttonClose}>
                        <CloseIcon type="primary" />
                    </button>
                </div>
                {children}
            </section>
        </>,
        modalRoot!
    );
};

export default Modal;
