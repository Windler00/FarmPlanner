import styles from "./Modal.module.css"

const Modal = ({active, setActive, children}) => {
    return(
        active && (
        <div className={styles.Modal} onClick={() => setActive(false)}>
            <div className={styles.ModalContent} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
        )
    )
}

export default Modal