import styles from "./../Styles/Proyecto.module.css";
import { useParams } from "react-router-dom";
import stylesT from "./../Styles/Proyectos/Tarea.module.css";
import { useState, useEffect } from "react";
import { addInvertedHours, GetRecursos, GetTaskId } from "./../Components/Proyecto/ProjectViewList";
import { TaskController } from "../Components/Proyecto/TaskController"
import { BsArrowLeftCircleFill } from "react-icons/bs"
import { useNavigate } from "react-router-dom"

function Tarea() {
  let { tid } = useParams();
  const [task, setTask] = useState(["CAC"]);

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

  //let ids = task.responsible.map((r) => r);


  // const recursosTarea = recursosName.filter( (recurso) =>  estaElRecursoEnLaTarea(recurso) );

  // // function estaElRecursoEnLaTarea( recurso){
  // //   let prueba = task.responsible.filter( id => recurso.value === id.id )
  // //   return prueba.length > 0;
  // // }

  // console.log(recursosTarea);

  return (
    <div className={styles.proyectoContainer}>
      {useEffect(() => {
        GetTaskId(tid, setTask);
        GetRecursos(setListRecursos);
        
      }, [])}
      <div className={stylesT.paginaTarea}>
        <div className={stylesT.headerTarea}>
          <div className={stylesT.bloqueHeaderTarea}>
            <div className={stylesT.titleAndBBcontainer}>
              <div className={stylesT.backButton} title="Volver" onClick={() => navigate(-1)}><BsArrowLeftCircleFill/></div>
              <div className={stylesT.titulo}>{task.name}</div>
            </div>
            <div className={stylesT.datos}>{"id: " + task._id}</div>
            <div className={stylesT.column}>
              <div>Tipo: </div>
              <div className={stylesT.estado + " " + stylesT.analisis}>
                Desarrollo
              </div>
            </div>
            <div className={stylesT.column}>
              <div>Estado: </div>
              <div className={stylesT.estado + " " + stylesT.analisis}>
                {task.status ? task.status : "estado"}
              </div>
            </div>
          </div>

          <div className={stylesT.linkRight}></div>
          <div className={stylesT.bloqueHeaderTarea}>
            <div>Fecha de inicio ideal</div>
            <div className={stylesT.datos}>{parseDate(task.idealInitDate)}</div>
            <div>Fecha fin ideal</div>
            <div className={stylesT.datos}>{parseDate(task.idealEndDate)}</div>
          </div>
          <div className={stylesT.linkRight}></div>
          <div className={stylesT.bloqueHeaderTarea}>
            <div>Horas estimadas</div>
            <div className={stylesT.datos}>12 hs</div>
            <div>Personal asignado</div>
            <div className={stylesT.datos}>15 </div>
            <div>Total de hs invertidas</div>
            <div className={stylesT.datos}>{task.invertedHours} hs </div>
          </div>
        </div>
        <div className={stylesT.linkTop}></div>
        <div className={stylesT.contenidoTarea}>
          <div className={stylesT.personasAsignadas}>
            Personas asignadas
                {/* <div>
                  {}
                </div> */}
          </div>
          <div className={stylesT.descripcionTareas}>
            descrpicion de la tarea
            <div className={stylesT.datos}>{task.description}</div>
          </div>
          <input
            type={"text"}
            value={hours}
            onChange={handleHoursChange}
            className={styles.input}
          />
          <button
            onClick={() => {
              addInvertedHours(tid, hours);
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
                            id={tid}
                            task={task}
                            listRecursos = {recursosName}
                            projectID={""}
                            method={"Put"}
                        />}
    </div>
  );
}

export default Tarea;
