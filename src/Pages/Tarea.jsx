import styles from "./../Styles/Proyecto.module.css";
import {useParams} from "react-router-dom"
import stylesT from "./../Styles/Proyectos/Tarea.module.css"
import { useState, useEffect } from "react";
import { addInvertedHours, GetTaskId } from "./../Components/Proyecto/ProjectViewList"
import Filtros from "./../Data/FiltrosTarea.json"


function Tarea() {
  let { tid } = useParams();
  const [task, setTask] = useState([]);

  const [hours, setHours] = useState(0);
  const [stateTask, setStateTask] = useState("")
  const handleHoursChange = event => {
    setHours(event.target.value);
  }
  
  const getOptions = (dato) => {
    return Filtros.find((e) => e.Estado === dato).Options;
  };

  const parseDate = (fecha) => {
    return (fecha ? 
       ((new Date(fecha)).toLocaleDateString()) : (""))
  };
  
  return (<div className={styles.proyectoContainer}>
                {useEffect(() => {
                    GetTaskId(tid, setTask);
                },[])}
            <div className={stylesT.paginaTarea} >
              <div className={stylesT.headerTarea}> 
        <div className={stylesT.bloqueHeaderTarea}>
        <div className={stylesT.titulo}>{task.name}</div>
        <div className={stylesT.datos}>{"id: "+task._id}</div>
        <div className={stylesT.column}>
          <div>Tipo: </div>
          <div className={stylesT.estado + " " + stylesT.analisis}>Desarrollo</div>
        </div>
        <div className={stylesT.column}>
          <div>Estado: </div>
          <div className={stylesT.estado + " " + stylesT.analisis}>{task.status ? task.status : "estado"}</div>
        </div>
      </div>
     
        <div className={stylesT.linkRight}></div>
        <div className={stylesT.bloqueHeaderTarea}>
          <div >Fecha de inicio ideal</div>
                <div className={stylesT.datos}>{parseDate(task.idealInitDate)}</div>
                <div >Fecha fin ideal</div>
                <div className={stylesT.datos}>{parseDate(task.idealEndDate)}</div>
        </div>
        <div className={stylesT.linkRight}></div>
        <div className={stylesT.bloqueHeaderTarea}>
                <div >Horas estimadas</div>
                <div className={stylesT.datos}>12 hs</div>
                <div >Personal asignado</div>
                <div className={stylesT.datos}>15 </div>
                <div >Total de hs invertidas</div>
                <div className={stylesT.datos}>{task.invertedHours} hs</div>
                
        </div>
      </div>
      <div className={stylesT.linkTop}></div>
      <div className={stylesT.contenidoTarea}> 
      
        <div className={stylesT.personasAsignadas}>
          <div >Personas asignadas</div>
          <div >Hosain, Kamal</div>
          <div>Chávez Cabanillas, José</div>
          <div >Álvarez, Juan Manuel</div>
          <div >Pereyra, Ignacio</div>
          <div >Goyzueta, Alan</div>
          <div >Agregar a alguien mas para el sufrimiento</div>
          
        </div>
        
        <div className={stylesT.descripcionTareas}>
          descrpicion de la tarea 
          <div  className={stylesT.datos}>
          {task.description}
          </div>
          
            
          
        </div>
        <input
                type={"text"}
                value = {hours}
                onChange = {handleHoursChange}
                className={styles.input}
              />
        <button
                onClick={() => {
                  addInvertedHours(tid,);
                }}
            >Agregar Horas Invertidas
        </button>

        {/* <ProjectSelect
              placeHolder={setStateTask}
              options={clientsName}
              style={styles.selectEstado}
              setState={setClientSelected}
                
          
        
        />
             */}
      </div>
    </div>
   
   </div>);
}

export default Tarea;