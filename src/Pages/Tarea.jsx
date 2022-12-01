import { useParams } from "react-router-dom";
import styles from "./../Styles/Proyectos/Tarea.module.css";
import { useState, useEffect } from "react";
import { addInvertedHours, GetRecursos, GetTaskId } from "./../Components/Proyecto/ProjectViewList";
import { TaskController } from "../Components/Proyecto/TaskController"
import { BsArrowLeftCircleFill } from "react-icons/bs"
import { useNavigate } from "react-router-dom"
import { MdEdit } from "react-icons/md";
import ReactLoading from "react-loading";

function Tarea() {
    let { id } = useParams();
    const [task, setTask] = useState([]);

    const [hours, setHours] = useState(0);
    
    const [updateTask, setUpdateTask] = useState(false);
    const [listRecursos, setListRecursos] = useState([]);
    const [recursosList, setRecursosList] = useState([]);
    const [loading, setLoading] = useState(true);
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
    
    useEffect(() => {
        GetRecursos(setListRecursos, setLoading);
        GetTaskId(id, setTask, setRecursosList, setLoading);            
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])           


    return (
        <div className={styles.tareaContainerPrincipal }>
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
                    <div className={styles.paginaTarea}>
                        <div className={styles.headerTarea}>
                            <div className={styles.bloqueHeaderTarea}>
                                <div className={styles.titleAndBBcontainer}>
                                    <div className={styles.backButton} title="Volver" onClick={() => navigate(-1)}>
                                        <BsArrowLeftCircleFill/>
                                    </div>
                                    <div className={styles.titulo}> 
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
                        <div className={styles.datos}>
                            {"id: " + task._id}
                        </div>
                        <div className={styles.column}>
                            <div>
                                Tipo:
                            </div>
                            <div className={styles.estado + " " + styles.analisis}>
                                Desarrollo
                            </div>
                        </div>
                        <div className={styles.column}>
                            <div>
                                Estado:
                            </div>
                            <div className={styles.estado + " " + styles.analisis}>
                                {getOptions(task.status)}
                            </div>
                        </div>
                    </div>
                    <div className={styles.linkRight}></div>
                        <div className={styles.bloqueHeaderTarea}>
                            <div>
                                Fecha de inicio ideal
                            </div>
                        <div className={styles.datos}>
                            {parseDate(task.idealInitDate)}
                        </div>
                        <div>
                            Fecha fin ideal
                        </div>
                        <div className={styles.datos}>
                            {parseDate(task.idealEndDate)}
                        </div>
                    </div>
                    <div className={styles.linkRight}>

                    </div>
                    <div className={styles.bloqueHeaderTarea}>
                        <div>
                            Total de hs invertidas
                        </div>
                        <div className={styles.datos}>
                            {task.invertedHours} hs
                        </div>
                    </div>
                </div>
                <div className={styles.linkTop}></div>
                    <div className={styles.contenidoTarea}>
                        <div className={styles.personasAsignadas}>
                            Personas asignadas
                            {recursosList.map((recurso)=>{
                                return (<div>{findRecursoById(recurso.id)}</div>)
                            })}
                        </div>
                        <div className={styles.descripcionTareas}>
                            Descrpicion de la tarea
                            <div className={styles.datos}>
                                {task.description}
                            </div>
                        </div>
                        <input
                            type={"text"}
                            value={hours}
                            onChange={handleHoursChange}
                            
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
            )}
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
