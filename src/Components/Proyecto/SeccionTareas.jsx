import { useState, useEffect } from "react";
import styles from "./../../Styles/Proyectos/Tarea.module.css";
import TarjetaTarea from "./TarjetaTarea";
import { GetAllTask } from "./ProjectViewList";
import { useParams } from "react-router-dom";

function SeccionTareas({projectID, listRecursos}) {
    const [tareas, setTareas] = useState([]);
    const { id } = useParams();

    const getTareasFilter = (statusTask) => {
        return tareas.filter( tarea=>
            tarea.status === statusTask
        )
    }
    return (        
        <div className={styles.linkTop}>
            {useEffect(() => {
                GetAllTask(id, setTareas);
                // eslint-disable-next-line react-hooks/exhaustive-deps
            },[])}
            Tareas
            <div className={styles.seccionTareas}>
                <div className={styles.columnaTareas}>
                    <div className={styles.etiquetaTarea + " "+ styles.pendiente}>
                        Pendiente 
                    </div> 
                    {getTareasFilter("pending").map((tarea) =>{
                        return  <TarjetaTarea tarea={tarea}/>
                    })}    
                </div>
                <div className={styles.columnaTareas}>
                    <div className={styles.etiquetaTarea  + " "+ styles.enProgreso}>
                        En Proceso
                    </div>
                    {getTareasFilter("inProgress").map((tarea) =>{
                        return  <TarjetaTarea  tarea={tarea}/>
                    })}
                </div>
                <div className={styles.columnaTareas}>
                    <div className={styles.etiquetaTarea  + " "+ styles.completado}>
                        Completada
                    </div>
                    {getTareasFilter("complete").map((tarea) =>{
                        return  <TarjetaTarea  tarea={tarea}/>
                    })}
                </div>
                <div className={styles.columnaTareas}>
                    <div className={styles.etiquetaTarea  + " "+ styles.cancelado}>
                        Cancelada
                    </div>
                    {getTareasFilter("canceled").map((tarea) =>{
                        return  <TarjetaTarea  tarea={tarea}/>
                    })}
                </div>
            </div>    
        </div>
    );
}




export default SeccionTareas;