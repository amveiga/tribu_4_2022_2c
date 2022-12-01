//import { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./../../Styles/Proyecto.module.css";


function TarjetaTarea({tarea}) {
  //const [editSelected, setEditSelected] = useState(false);
 

  let element = {
    textDecoration: "none",
    color: "rgba(0, 53, 108, 1)",
    margin: "5%"
    
  };
  return (
    
    <NavLink
        style={element}
        to={"/tarea/"+tarea._id}
        
      >
        <div className={styles.tarjetaTarea}>
           
            <div className={styles.tarjetaTareaHeader}>
                
                {tarea.name ? tarea.name : "Tarea"} 
            </div>
            <div className={styles.tarjetaTareaDescripcion}>
            
                {tarea.description}
                
            </div>
        </div>
    </NavLink> 
       
    
    
  );
}

export default TarjetaTarea;
