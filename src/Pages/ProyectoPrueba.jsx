import styles from "./../Styles/Proyecto.module.css";
import {useParams} from "react-router-dom";
import { useState, useEffect } from "react";
import ProyectoHeader from "./../Components/Proyecto/ProyectoHeader"
import SeccionTareas from "./../Components/Proyecto/SeccionTareas"
import { GetRecursos, GetAllTask, PutHourProject } from "../Components/Proyecto/ProjectViewList";
import ButtonCreateTask from "../Components/Proyecto/ButtonCreateTask";

function ProyectoPrueba() {
    let {id} = useParams();
    const recursosName = []
    const [listRecursos, setListRecursos] = useState([]);
    const [tareas, setTareas] = useState([]);
    var horasTotales =0;
    listRecursos.map((recurso) => {
        return recursosName.push({"value": recurso["legajo"],
            "label" : `${recurso["Nombre"]}, ${recurso["Apellido"]}`})
    })

    tareas.map((tarea) => (horasTotales += tarea.invertedHours))

    return  ( 
        <div className={styles.proyectoContainer}>
            {useEffect(() => {
                GetAllTask(id, setTareas);
                GetRecursos(setListRecursos);
                PutHourProject(id, horasTotales)
                // eslint-disable-next-line react-hooks/exhaustive-deps      
            },[])}

            <ProyectoHeader id={id} tareas={tareas}/>
            <SeccionTareas projectID={id} tareas={tareas}/>
            <ButtonCreateTask
                    projectID={id}
                    listRecursos={recursosName}    
            />
        </div>
    )
}

export default ProyectoPrueba;
