import PropTypes from 'prop-types';

import styles from './ModalOverlay.module.css';


const ModalOverlay = props => {

    return (
        <section onClick={() => {props.onClose(false)}} className={styles.modalOverlay}></section>
    )
}

ModalOverlay.propTypes = {
    onClose: PropTypes.func.isRequired,
}


export default ModalOverlay;