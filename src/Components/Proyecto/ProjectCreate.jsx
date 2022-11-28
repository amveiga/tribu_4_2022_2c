import { useState } from "react";
import {FaPlus} from "react-icons/fa"
import styles from "../../Styles/Proyectos/Proyectos.module.css"

function ProjectCreate() {
  const [addButtonClicked, setAddButtonClicked] = useState(false);
  const [rotateActivate, setRotateActivate] = useState(false);
  const [optionActivate, setOptionActivate] = useState(false);
  const [crearProject, setCrearProject] = useState(false);

  return (
    <div className="buttonContainer">
      <div
        className={
          addButtonClicked
            ? styles.amddButton + " " + styles.clicked
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
          <div className={styles.option} onClick={() => setCrearProject(true)}>
            Crear Proyecto (aca iria el post)
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectCreate;
