import styles from "./../../Styles/Proyectos/Tarea.module.css";
import {useEffect, useState} from 'react'
import {GetProjectId } from "../../Components/Proyecto/ProjectViewList"
import { useNavigate } from "react-router-dom"
import { BsArrowLeftCircleFill } from "react-icons/bs"

function ProyectoHeader({id, tareas }) {
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

   const navigate = useNavigate();

   return (
          <div className={styles.proyectoHeader}>
            <div className={styles.bloqueHeader}>
               {useEffect(() => {
                  GetProjectId(id, setProject)
                  // eslint-disable-next-line react-hooks/exhaustive-deps
               },[])}
               <div className={styles.titulo}>
                  <div className={styles.backButton} title="Volver" onClick={() => navigate(-1)}>
                     <BsArrowLeftCircleFill/>
                  </div>
                  {project.name}
               </div>
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
            </div>
               <div className={styles.linkRight}></div>
               <div className={styles.bloqueHeader}>
               <div >Informacion de proyecto</div>
               <div >Fecha de inicio ideal</div>
                <div className={styles.datos}>{parseDate(project.idealInitDate)}</div>
                <div >Fecha fin ideal</div>
                <div className={styles.datos}>{parseDate(project.idealEndDate)}</div>
                <div >Total de hs invertidas</div>
                <div className={styles.datos}>{project.invertedHours} hs</div>
               </div>
         </div>
    );
  }
  
  export default ProyectoHeader;
  