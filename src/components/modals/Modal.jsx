//Компонент модального окна, принамает в children нужную компоненту для отрисовки
//Внутри добавлен компонент подложки под модальное окно

import { useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from 'prop-types';

import ModalOverlay from "./ModalOverlay";

import { TEXT_LARGE } from "../../utils/constants";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './Modal.module.css';


const modalRoot = document.getElementById('react-modals');


const Modal = ({ onClose, children, title }) => {

    //Закрытие модального окна через Escape
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key == 'Escape') { 
                onClose();
            }
        }
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    },[])

    
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

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
    title: PropTypes.string,
}



export default Modal;