import { useState } from "react";
import {FaPlus} from "react-icons/fa"
import styles from "../../Styles/Proyectos/Proyectos.module.css"
import CreateProject from "./CreateProject";

function ButtonCreateTask({id, data}) {
  const [addButtonClicked, setAddButtonClicked] = useState(false);
  const [rotateActivate, setRotateActivate] = useState(false);
  const [optionActivate, setOptionActivate] = useState(false);
  const [crearTask, setCrearTask] = useState(false);

  return (
    <div className={styles.proyectosContainer}>
      <div
        className={
          addButtonClicked
            ? styles.addButton + " " + styles.clicked
            : rotateActivate
            ? styles.addButton + " " + styles.rotate
            : styles.addButton
        }
        onClick={() => {
          setAddButtonClicked(!addButtonClicked);
          setRotateActivate(true);
          setOptionActivate(!optionActivate);
        }}
      >
        <FaPlus
          size={"2vw"}
          color={addButtonClicked ? "rgba(0,53,108,1)" : "white"}
        />
      </div>
      {addButtonClicked && (
        <div className={styles.options}>
          <div className={styles.option}
               onClick={ () => {
                  // postTask(id, {

                  // })
               }}
            >
            Crear Tarea
          </div>
        </div>
      )}
      {crearTask}
    </div>
  );
}

export default ButtonCreateTask;
