import styles from './ModalOverlay.module.css';


const ModalOverlay = props => {

    return (
        <section onClick={() => {props.onClose(false)}} className={styles.modalOverlay}></section>
    )
}


export default ModalOverlay;