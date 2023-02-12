//Компонент модального окна, принамает в children нужную компоненту для отрисовки
//Внутри добавлен компонент подложки под модальное окно

import { useEffect } from "react";
import { createPortal } from "react-dom";

import ModalOverlay from "./ModalOverlay";

import { TEXT_LARGE } from "../../utils/fontsStyles";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './Modal.module.css';


const modalRoot = document.getElementById('react-modals');


const Modal = ({ open, onClose, children, title }) => {

    //Закрытие модального окна через Escape
    useEffect(() => {
        const close = (e) => {
            if (e.keyCode === 27) {
                onClose()
            }
        }
        window.addEventListener('keydown', close)
        return () => window.removeEventListener('keydown', close)
    }, [])


    if (!open) return null;

    
    return createPortal(
        (
            <>
                <ModalOverlay onClose={onClose} />

                <section className={styles.modal}>
                    <div className={styles.titleAndButton}>
                        <h2 className={`${TEXT_LARGE} ${styles.title}`}>{title}</h2>
                        <button onClick={onClose} className={styles.buttonClose}>
                            <CloseIcon type='primary' />
                        </button>
                    </div>
                    {children}
                </section>
            </>
        ),
        modalRoot
    )
}


export default Modal;