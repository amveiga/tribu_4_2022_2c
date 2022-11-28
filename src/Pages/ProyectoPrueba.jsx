import styles from "./../Styles/Home.module.css";
import {useParams} from "react-router-dom"

function ProyectoPrueba() {
   let {id} = useParams();
   console.log(id);
  return (
    <div className={styles.homeContainer}>
      proyecto individual
    </div>
  );
}

export default ProyectoPrueba;
