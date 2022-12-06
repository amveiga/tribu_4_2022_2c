import styles from "./../../Styles/Proyecto.module.css";
import TarjetaTarea from "./TarjetaTarea";

function SeccionTareas({projectID, listRecursos, tareas}) {
    
    const getTareasFilter = (statusTask) => {
        return tareas.filter( tarea=>
            tarea.status === statusTask
        )
    }

    return (        
        <div className={styles.linkTop}>
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