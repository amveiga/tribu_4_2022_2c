import { HiCheck } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import styles from "./../../Styles/Proyectos/Project.module.css";
import Filtros from "./../../Data/FiltrosProyectos.json";
import ProjectSelect from "./ProjectSelect";
import { updateProject } from "./ProjectViewList";
import { useState } from "react";
import {KeyboardDatePicker} from '@material-ui/pickers'; 


function ProjectEdit({ project, setEditSelected, clientsName, setClient, listRecursos, setRecurso }) {
    const getOptions = (dato) => {
      return Filtros.find((e) => e.Nombre === dato).Options;
    };

    const [description, setdescription] = useState(project.description);
    const handleDescriptionChange = event => {
        setdescription(event.target.value);
    };
    
    const [name, setName] = useState(project.name);
    const handleNameChange = event => {
      setName(event.target.value);
  };

    const [statusSelected, setStatusSelected] = useState(project.status);
    const [clientSelected, setClientSelected] = useState(project.assignedClient)
    const [initFechaSelect, setInitFechaSelect] = useState(new Date())
    const [endFechaSelect, setEndFechaSelect] = useState(new Date())
    const [typeSelected, setTypeSelected] = useState(project.type)
    const [leaderSelected, setLeaderSelected] = useState(project.projectLeader);

    return (
      <div className={styles.projectContainerEdit}>
        <div className={styles.projectEdit}>
          <div className={styles.sectionOne}>
            <div className={styles.titleSection + " " + styles.growTitle}>
              <label>
                Nombre proyecto 
              </label>
              <input
                type={"text"}
                value = {name}
                onChange = {handleNameChange}
                className={styles.input}
              />
            </div>
            <div className={styles.descripcion}>
              <label className={styles.descriptionTitle}>
                Descripcion
              </label>
              <textarea
                type={"text"}
                value= {description}
                className={styles.inputDescription}
                onChange={handleDescriptionChange}
              />
            </div>
          </div>
          <div className={styles.sectionTwoEdit}>
            <div className={styles.item + " " + styles.item1}>
              Lider de proyecto
              <ProjectSelect
                placeHolder={setRecurso}
                options={listRecursos}
                style={styles.selectEstado}
                setState={setLeaderSelected}
              />
            </div>
            <div className={styles.item + " "+ styles.item2}>
              Tipo Proyecto
              <ProjectSelect
                placeHolder={"Desarrollo"}
                options={getOptions("Tipo")}
                style={styles.selectEstado}
                setState={setTypeSelected}
              />
            </div>
            <div className={styles.item + " " + styles.item3}>
              Estado
              <ProjectSelect
                placeHolder={project.status}
                options={getOptions("Estado")}
                style={styles.selectEstado}
                setState={setStatusSelected}  
              />
            </div>
            <div className={styles.item + " " + styles.item4}>
              Cliente
              <ProjectSelect
                placeHolder={setClient}
                options={clientsName}
                style={styles.selectEstado}
                setState={setClientSelected}
              />
            </div>
            <div className={styles.item}>
                  <KeyboardDatePicker
                    autoOk
                    variant="inline"
                    inputVariant="outlined"
                    label="Fecha Inicio Ideal"
                    format="dd/MM/yyyy"
                    value={initFechaSelect}
                    InputAdornmentProps={{ position: "start" }}
                    onChange={setInitFechaSelect}
                    inputProps={
                        {
                            style: {
                                fontSize: 14,
                                height: 14,
                                width:80,
                            }
                        }
                    }
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
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
                    inputProps={
                        {
                            style: {
                                fontSize: 14,
                                height: 14,
                                width:80,
                            }
                        }
                    }
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
            </div>
          </div>
        </div>
        <div className={styles.edit + " " + styles.selected}>
          <MdEdit size={"1.5vw"} color={"white"} />
        </div>
        <div className={styles.editSelected}>
          <div
            className={styles.editCancel}
            onClick={() => setEditSelected(false)}
          >
            <IoClose size={"2vw"} color={"white"} />
          </div>
          <div 
            className={styles.editConfirm}
            onClick = { () => {
                updateProject(project._id,
                  {
                    "name" : name,
                    "description" : description,
                    "status" : statusSelected,
                    "assignedClient" : clientSelected,
                    "idealInitDate" : initFechaSelect,
                    "idealEndDate" : endFechaSelect,
                    "type": typeSelected

                  })
              }
            }
          
          >
            <HiCheck size={"2vw"} color={"white"} />
          </div>
        </div>
      </div>
    );
  }
  
  export default ProjectEdit;
  