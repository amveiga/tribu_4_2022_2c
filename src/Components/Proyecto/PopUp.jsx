import { MdDelete } from "react-icons/md";
import styles from "../../Styles/Proyectos/Project.module.css"
import Popup from 'reactjs-popup';
import {DeleteProject} from "./ProjectViewList";

function PopUpProject({ message, setDeleteSelected, id }) {

    setDeleteSelected(false);

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
                        <button 
                            className={styles.buttonModal}
                            onClick={() => {
                                DeleteProject(id);
                                close();
                            }}> 
                            Aceptar 
                        </button>
                        <button
                            className={styles.buttonModal}
                            onClick={() => {
                                close();
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