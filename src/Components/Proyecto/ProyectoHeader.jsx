import styles from "./../../Styles/Proyectos/Tarea.module.css";
import {useEffect, useState} from 'react'
import {GetProjectId} from "../../Components/Proyecto/ProjectViewList"

function ProyectoHeader({id}) {
    const [project, setProject] = useState([]);
  
   const parseDate = (fecha) => {
      return (fecha ? 
         ((new Date(fecha)).toLocaleDateString()) : (""))
   }

    return (

          <div className={styles.proyectoHeader}>
            <div className={styles.bloqueHeader}>
               {useEffect(() => {
                        GetProjectId(id, setProject)
               },[])}
             <div className={styles.titulo}>{project.name}</div>
             {/* <div className={styles.datos}>{"id"}</div> */}
             <div className={styles.column}>
                <div>Tipo: </div>
                <div className={styles.estado + " " + styles.analisis}>Desarrollo</div>
             </div>
             <div className={styles.column}>
                <div>Estado: </div>
                <div className={styles.estado + " " + styles.analisis}>{project.status}</div>
             </div>
            </div>

            <div className={styles.linkRight}></div>
            <div className={styles.bloqueHeader}>      
                <div >Descripcion</div>
                {/* <div className={styles.datos}>Migración del PSA Spring ERP a una plataforma en la nube</div> */}
                <div className={styles.datos}>{project.description}</div>
                <div >Fecha de inicio ideal</div>
                <div className={styles.datos}>{parseDate(project.idealInitDate)}</div>
                <div >Fecha fin ideal</div>
                <div className={styles.datos}>{parseDate(project.idealEndDate)}</div>
                <div >Product Owner</div>
                <div className={styles.datos}>Fernando Soluzzia</div>
                
            </div>
            
               <div className={styles.linkRight}></div>

               <div className={styles.bloqueHeader}>
                
               <div >Informacion de proyecto</div>
                
                <div >Horas estimadas</div>
                <div className={styles.datos}>120 hs</div>
                <div >Personal asignado</div>
                <div className={styles.datos}>15 </div>
                <div >Total de hs invertidas</div>
                <div className={styles.datos}>0 hs</div>
               </div>

               
              
          </div>

          
         
      
      
    );
  }
  
  export default ProyectoHeader;
  