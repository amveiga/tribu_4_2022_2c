import styles from "./../Styles/Proyecto.module.css";
import {useParams} from "react-router-dom";
import { useState, useEffect } from "react";
import ProyectoHeader from "./../Components/Proyecto/ProyectoHeader"
import SeccionTareas from "./../Components/Proyecto/SeccionTareas"
import { GetRecursos, GetAllTask, PutHourProject } from "../Components/Proyecto/ProjectViewList";
import ButtonCreateTask from "../Components/Proyecto/ButtonCreateTask";
import ReactLoading from "react-loading";

function ProyectoPrueba() {
    let {id} = useParams();
    const recursosName = []
    const [listRecursos, setListRecursos] = useState([]);
    const [tareas, setTareas] = useState([]);
    const [loading, setLoading] = useState(true);
    var horasTotales =0;
    listRecursos.map((recurso) => {
        return recursosName.push({"value": recurso["legajo"],
            "label" : `${recurso["Nombre"]}, ${recurso["Apellido"]}`})
    })

    tareas.map((tarea) => (horasTotales += tarea.invertedHours))
    
    useEffect(() => {
        GetAllTask(id, setTareas, setLoading);
        GetRecursos(setListRecursos, setLoading);
        PutHourProject(id, horasTotales, setLoading)
        // eslint-disable-next-line react-hooks/exhaustive-deps      
    },[])

    return  ( 
        <div className={styles.proyectoContainer}>
            {loading ? (
                <div className={styles.loading}>
                    <ReactLoading
                        type={"bars"}
                        color={"rgba(0,53,108,1"}
                        height={"10%"}
                        width={"10%"}
                    />
                </div>
            ) : (
                <div className={styles.container}>
                    <ProyectoHeader id={id} tareas={tareas}/>
                    <SeccionTareas projectID={id} tareas={tareas}/>
                    <ButtonCreateTask
                        projectID={id}
                        listRecursos={recursosName}   
                    />
                </div>
            )}
        </div>
    )
}

export default ProyectoPrueba;
