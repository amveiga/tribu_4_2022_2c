import styles from "./../Styles/Proyectos.module.css";
import {useParams} from "react-router-dom"


function Tarea() {
  let { id } = useParams();
  console.log(id);
  
  return <div className={styles.proyectosContainer}>
    <div >
      
      la tarea brother
    </div>
   
   </div>;
}

export default Tarea;