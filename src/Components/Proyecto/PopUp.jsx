import { MdDelete } from "react-icons/md";
import styles from "../../Styles/Proyectos/Project.module.css"
import Popup from 'reactjs-popup';

function PopUpProject({ message, setDeleteSelected }) {

    return (
        <Popup trigger={
            <MdDelete size={"1.5vw"} color={"rgba(0,53,108,1)"} />
        } modal nested>
            {close => (
                <div className={styles.modal}>
                    <button className={styles.close} onClick={close}>
                    &times;
                    </button>
                    <div className={styles.content}>
                        {message}
                    </div>
                    <div className={styles.actions}>
                    <Popup
                        trigger={<button className={styles.buttonModal}> Aceptar </button>}
                        position="top left"
                        nested
                        >
                    </Popup>
                    <button
                        className={styles.buttonModal}
                        onClick={() => {
                            close();
                            setDeleteSelected(false);
                        }}
                        >
                        Cancelar
                    </button>
                    </div>
                </div>
            )}
        </Popup>
    )
}

export default PopUpProject;