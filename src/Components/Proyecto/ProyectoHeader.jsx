import styles from "./../../Styles/Proyectos/Tarea.module.css";
import {useEffect, useState} from 'react'
import {GetProjectId} from "../../Components/Proyecto/ProjectViewList"

function ProyectoHeader({id}) {
    const [project, setProject] = useState([]);
  
   const parseDate = (fecha) => {
      return (fecha ? 
         ((new Date(fecha)).toLocaleDateString()) : (""))
   }

   const getState = (estado) => {
      switch (estado) {
          case "No Iniciado": return styles.notStarted;
          case "Iniciado" : return styles.initiated;
          case "Analisis" : return styles.analisys;
          case "Desarrollo" : return styles.developed;
          case "Pruebas" : return styles.tested;
          case "Produccion" : return styles.production;
          case "Post-Produccion" : return styles.pproduction;
          case "Cancelado" : return styles.canceled;
          default : return styles.notStarted;
      }
   }

   const getType = (type) => {
      switch (type) {
          case "Desarrollo": return styles.dev;
          case "Implementacion" : return styles.implementation;
          default : return styles.developed;
      }
   }

   return (

          <div className={styles.proyectoHeader}>
            <div className={styles.bloqueHeader}>
               {useEffect(() => {
                        GetProjectId(id, setProject)
               },[])}
             <div className={styles.titulo}>{project.name}</div>
             <div className={styles.datos}>{project._id}</div>
             <div className={styles.column}>
                <div>Tipo: </div>
                <div className={styles.estado + " " + getType(project.type)}>{project.type}</div>
             </div>
             <div className={styles.column}>
                <div>Estado: </div>
                <div className={styles.estado + " " + getState(project.status)}>{project.status}</div>
             </div>
            </div>

            <div className={styles.linkRight}></div>
            <div className={styles.bloqueHeader}>      
                <div >Descripcion</div>
                <div className={styles.datos}>{project.description}</div>
                <div >Fecha de inicio ideal</div>
                <div className={styles.datos}>{parseDate(project.idealInitDate)}</div>
                <div >Fecha fin ideal</div>
                <div className={styles.datos}>{parseDate(project.idealEndDate)}</div>
                <div >Product Owner</div>
                <div className={styles.datos}>{"Fernando Soluzzia"}</div>
            </div>
               <div className={styles.linkRight}></div>
               <div className={styles.bloqueHeader}>
               <div >Informacion de proyecto</div>
                <div >Horas estimadas</div>
                <div className={styles.datos}>120 hs</div>
                <div >Personal asignado</div>
                <div className={styles.datos}>15 </div>
                <div >Total de hs invertidas</div>
                <div className={styles.datos}>{project.invertedHours} hs</div>
               </div>
         </div>
    );
  }
  
  export default ProyectoHeader;
  