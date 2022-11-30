import { HiCheck } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import styles from "./../../Styles/Proyectos/Project.module.css";
import ProjectSelect from "./ProjectSelect";
import { useState } from "react";
import { KeyboardDatePicker } from "@material-ui/pickers";
import Filtros from "../../Data/FiltrosTarea.json";
import Select from "react-select";
import { updateTask, postTask } from "./ProjectViewList";

export function TaskController({ id, task, listRecursos, projectID, method }) {

  console.log(projectID);

  const [description, setdescription] = useState(
    task.description ? task.descripcion : ""
  );
  const handleDescriptionChange = (event) => {
    setdescription(event.target.value);
  };

  const [selectedResources, setSelectedResources] = useState([]);

  const [name, setName] = useState(task.name ? task.name : "");
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const [initFechaSelect, setInitFechaSelect] = useState(
    task.idealInitDate ? task.idealInitDate : Date.now()
  );
  const [endFechaSelect, setEndFechaSelect] = useState(
    task.idealEndDate ? task.idealEndDate : Date.now()
  );
  const [stateSelected, setStateSelected] = useState(
    task.status ? task.status : ""
  );
  const [showTask, setShowTask] = useState(false);

  const getOptions = (dato) => {
    return Filtros.find((e) => e.Nombre === dato).Options;
  };

  console.log(selectedResources.map((resource) => ({"id" : resource.value})))


  return (
    <div className={styles.projectCreateContainer}>
      <div className={styles.projectCreate}>
        <div className={styles.sectionOne}>
          <div
            className={
              styles.titleSection + " " + styles.growTitle + " " + styles.column
            }
          >
            <div className={styles.title}>Titulo</div>
            <input
              type={"text"}
              value={name}
              onChange={handleNameChange}
              placeholder={"Ingrese un titulo"}
              className={styles.inputTitulo}
            />
          </div>
          <div className={styles.descripcion + " " + styles.marginTop}>
            <div className={styles.title}>Descripción</div>
            <textarea
              type={"text"}
              value={description}
              onChange={handleDescriptionChange}
              placeholder={"Ingrese una descripción de la tarea"}
              className={styles.inputDescription}
            />
          </div>
        </div>
        <div className={styles.sectionTwoEdit}>
          <div className={styles.item + " " + styles.item1}
               style={{display: method==="Post" ? "none" : "flex"}}
            >
            Estado
            <ProjectSelect
              placeHolder={"Seleccione status del proyecto"}
              options={getOptions("Estado")}
              style={styles.selectEstado}
              setState={setStateSelected}
            />
          </div>
          <div className={styles.item + " " + styles.item3}>
            Recurso
            <Select
              className={styles.widthCompleto}
              placeholder={"Seleccionar recursos asignados"}
              options={listRecursos}
              isMulti={true}
              onChange={setSelectedResources}
            />
          </div>
          <div className={styles.item + " " + styles.item4}>
            <KeyboardDatePicker
              autoOk
              variant="inline"
              inputVariant="outlined"
              label="Fecha Inicio Ideal"
              format="dd/MM/yyyy"
              value={initFechaSelect}
              InputAdornmentProps={{ position: "start" }}
              onChange={setInitFechaSelect}
              inputProps={{
                style: {
                  fontSize: 14,
                  height: 14,
                  width: 80,
                },
              }}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />

            <KeyboardDatePicker
              autoOk
              variant="inline"
              inputVariant="outlined"
              label="Fecha Final Ideal"
              format="dd/MM/yyyy"
              value={endFechaSelect}
              InputAdornmentProps={{ position: "start" }}
              onChange={setEndFechaSelect}
              inputProps={{
                style: {
                  fontSize: 14,
                  height: 14,
                  width: 80,
                },
              }}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </div>
        </div>
      </div>
      <div className={styles.editSelected + " " + styles.createSelected}>
        <div
          onClick={() => {
            setShowTask(false);
            window.location.reload();
          }}
          className={styles.editCancel}
        >
          <IoClose size={"2vw"} color={"white"} />
        </div>
        <div
          className={styles.editConfirm}
          onClick={() => {
            setShowTask(true);
          }}
        >
          <HiCheck size={"2vw"} color={"white"} />
        </div>
        { method === "Put" &&
          showTask &&
          updateTask(id, {
            name: name,
            description: description,
            idealInitDate: initFechaSelect,
            idealEndDate: endFechaSelect,
            status: stateSelected,
            responsible: selectedResources.map((resource) => {
                return {"id" : resource.value}})
          })}

          {method==="Post" &&
           showTask &&
           postTask({
            "name": name,
            "description": description,
            "idealInitDate": initFechaSelect,
            "idealEndDate": endFechaSelect,
            "responsible": selectedResources.map( (resource) => {
                return {"id" : resource.value}
            }),
            "projectID" : projectID
           })  
          }
      </div>
    </div>
  );
}

export default TaskController;
