//import { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./../../Styles/Proyectos/Tarea.module.css";


function TarjetaTarea({titulo,informacion}) {
  //const [editSelected, setEditSelected] = useState(false);
  let element = {
    textDecoration: "none",
    color: "rgba(0, 53, 108, 1)",
    margin: "5%"
    
  };
  return (
    
    <NavLink
        style={element}
        to={"/tarea/63799488af3a51a62afb292b"}
        
      >
        <div className={styles.tarea}>
           
            <div className={styles.headerContainer}>
                
                {titulo ? titulo : "Tarea"} 
            </div>
            <div className={styles.descripcion}>
            
                {informacion}
                
            </div>
            
        </div>
    </NavLink> 
       
    
    
  );
}

export default TarjetaTarea;
