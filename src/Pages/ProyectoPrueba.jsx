import styles from "./../Styles/Proyecto.module.css";
import {useParams} from "react-router-dom";
import { useState, useEffect } from "react";
import ProyectoHeader from "./../Components/Proyecto/ProyectoHeader"
import SeccionTareas from "./../Components/Proyecto/SeccionTareas"
import { GetRecursos } from "../Components/Proyecto/ProjectViewList";
import ButtonCreateTask from "../Components/Proyecto/ButtonCreateTask";

function ProyectoPrueba() {
   let {id} = useParams();

       
   const recursosName = []
   const [listRecursos, setListRecursos] = useState([]);
   listRecursos.map((recurso) => {
       return recursosName.push({"value": recurso["legajo"],
           "label" : `${recurso["Nombre"]}, ${recurso["Apellido"]}`})
     })
   

   console.log(id);
   return( <div className={styles.proyectoContainer}>
            {useEffect(() => {
               GetRecursos(setListRecursos);        
                },[])}
 
      <ProyectoHeader id={id}/>
      
      <SeccionTareas projectID={id}/>

      <ButtonCreateTask
                projectID={id}
                listRecursos={recursosName}    
            />

   </div>)
}

export default ProyectoPrueba;
