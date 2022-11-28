import styles from "./../Styles/Proyecto.module.css";
import {useParams} from "react-router-dom";
import ProyectoHeader from "./../Components/Proyecto/ProyectoHeader"
import SeccionTareas from "./../Components/Proyecto/SeccionTareas"

function ProyectoPrueba() {
   let {id} = useParams();
   console.log(id);
   return( <div className={styles.proyectoContainer}>
 
      <ProyectoHeader id={id}/>
      
      <SeccionTareas/>

   </div>)
}

export default ProyectoPrueba;
