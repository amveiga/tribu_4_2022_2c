import styles from "./../Styles/Proyecto.module.css";
import { useParams } from "react-router-dom";
import stylesT from "./../Styles/Proyectos/Tarea.module.css";
import { useState, useEffect } from "react";
import { addInvertedHours, GetRecursos, GetTaskId } from "./../Components/Proyecto/ProjectViewList";
import { TaskController } from "../Components/Proyecto/TaskController"
import { BsArrowLeftCircleFill } from "react-icons/bs"
import { useNavigate } from "react-router-dom"
import { MdEdit } from "react-icons/md";

function Tarea() {
    let { id } = useParams();
    const [task, setTask] = useState([]);

    const [hours, setHours] = useState(0);
    
    const [updateTask, setUpdateTask] = useState(false);
    const [listRecursos, setListRecursos] = useState([]);
    const [recursosList, setRecursosList] = useState([]);

    const recursosName = [];

    const navigate = useNavigate();

    const handleHoursChange = (event) => {
        setHours(event.target.value);
    };

    const parseDate = (fecha) => {
        return fecha ? new Date(fecha).toLocaleDateString() : "";
    };

    listRecursos.map((recurso) => {
        return recursosName.push({"value": recurso["legajo"],
            "label" : `${recurso["Nombre"]}, ${recurso["Apellido"]}`})
    })

    const findRecursoById = (id) => {
        const recurso = recursosName.find((recurso) => (recurso.value === id));
        return recurso ? (recurso.label) : (" ");
    }

    const getOptions = (dato) =>  {
        switch(dato) {
            case "pending": return "Pendiente";
            case "inProgress": return "En Progreso";
            case "canceled": return "Cancelado";
            case "complete": return "Completado";
            default: return ""
        }
    }; 
    


    return (
        <div className={styles.proyectoContainer}>
            {useEffect(() => {
                GetRecursos(setListRecursos);
                GetTaskId(id, setTask, setRecursosList);            
                // eslint-disable-next-line react-hooks/exhaustive-deps
            }, [])}           
            <div className={stylesT.paginaTarea}>
                <div className={stylesT.headerTarea}>
                    <div className={stylesT.bloqueHeaderTarea}>
                        <div className={stylesT.titleAndBBcontainer}>
                            <div className={stylesT.backButton} title="Volver" onClick={() => navigate(-1)}>
                                <BsArrowLeftCircleFill/>
                            </div>
                            <div className={stylesT.titulo}> 
                                {task.name}
                                <MdEdit
                                    onClick={() =>
                                        (setUpdateTask(true))
                                    }
                                    size={"1.5vw"}
                                    title = "Editar tarea"
                                />
                            <div>
                        </div>
                    </div>
                </div>
                <div className={stylesT.datos}>
                    {"id: " + task._id}
                </div>
                <div className={stylesT.column}>
                    <div>
                        Tipo:
                    </div>
                    <div className={stylesT.estado + " " + stylesT.analisis}>
                        Desarrollo
                    </div>
                </div>
                <div className={stylesT.column}>
                    <div>
                        Estado:
                    </div>
                    <div className={stylesT.estado + " " + stylesT.analisis}>
                        {getOptions(task.status)}
                    </div>
                </div>
            </div>
            <div className={stylesT.linkRight}></div>
                <div className={stylesT.bloqueHeaderTarea}>
                    <div>
                        Fecha de inicio ideal
                    </div>
                <div className={stylesT.datos}>
                    {parseDate(task.idealInitDate)}
                </div>
                <div>
                    Fecha fin ideal
                </div>
                <div className={stylesT.datos}>
                    {parseDate(task.idealEndDate)}
                </div>
            </div>
            <div className={stylesT.linkRight}>

            </div>
            <div className={stylesT.bloqueHeaderTarea}>
                <div>
                    Total de hs invertidas
                </div>
                <div className={stylesT.datos}>
                    {task.invertedHours} hs
                </div>
            </div>
        </div>
        <div className={stylesT.linkTop}></div>
            <div className={stylesT.contenidoTarea}>
                <div className={stylesT.personasAsignadas}>
                    Personas asignadas
                    {recursosList.map((recurso)=>{
                        return (<div>{findRecursoById(recurso.id)}</div>)
                    })}
                </div>
                <div className={stylesT.descripcionTareas}>
                    Descrpicion de la tarea
                    <div className={stylesT.datos}>
                        {task.description}
                    </div>
                </div>
                <input
                    type={"text"}
                    value={hours}
                    onChange={handleHoursChange}
                    className={styles.input}
                />
                <button
                    onClick={() => {
                        addInvertedHours(id, hours);
                    }}
                >
                    Agregar Horas Invertidas
                </button>
            </div>
        </div>
        {updateTask && <TaskController
                            id={id}
                            task={task}
                            listRecursos = {recursosName}
                            projectID={""}
                            method={"Put"}
                            setStateCreate={setUpdateTask}
                        />}
    </div>);
}

export default Tarea;
