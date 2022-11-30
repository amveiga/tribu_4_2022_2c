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

    // const findRecursoById = (id) => {
    //     const recurso = recursosName.find((recurso) => (recurso.value === id));
    //     return recurso ? (recurso.label) : (" ");
    // }

    // const mapearRecursos = (lista) => {
    //     const list = lista
    //     console.log("tarea", list)
        
    // }

    return (
        <div className={styles.proyectoContainer}>
            {useEffect(() => {
                GetRecursos(setListRecursos);
                GetTaskId(id, setTask);
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
                                <div>
                                <MdEdit
                                    size={"1.5vw"}
                                    title = "Editar proyecto"
                                />
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
                        {task.status ? task.status : "estado"}
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
                    Horas estimadas
                </div>
                <div className={stylesT.datos}>
                    12 hs
                </div>
                <div>
                    Personal asignado
                </div>
                <div className={stylesT.datos}>
                
                </div>
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
                    {/* {task['responsible'].map((recursoId) => {
                        console.log(recursoId)
                        return  (<div> {findRecursoById(recursoId["id"])} </div>)
                    })} */}
                        {/* <div>
                    {findRecursoById(1)}
                    </div> */}

                    { console.log(task.responsible) }
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
            <button
                className="updateTask"
                onClick={() => {
                    setUpdateTask(true)
                }}
            >
                Actualizar Tarea
            </button>    
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
