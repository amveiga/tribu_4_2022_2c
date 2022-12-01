import { HiCheck } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import styles from "./../../Styles/Proyectos/Project.module.css";
import ProjectSelect from "./ProjectSelect";
import { useState } from "react";
import {KeyboardDatePicker} from '@material-ui/pickers'
import {postProject} from "./ProjectViewList" 
import Filtros from "../../Data/FiltrosProyectos.json"


function CreateProject({ setCrearProject, listClient, listRecursos }) {
    const [clientSelected, setClientSelected] = useState("");
    
    const [description, setdescription] = useState("");
    const handleDescriptionChange = event => {
        setdescription(event.target.value);
    };
    
    const [name, setName] = useState("");
    const handleNameChange = event => {
      setName(event.target.value);
  };
    
    const [initFechaSelect, setInitFechaSelect] = useState(new Date());
    const [endFechaSelect, setEndFechaSelect] = useState(new Date());
    const [leaderSelected, setLeaderSelected] = useState(0);
    const [typeSelected, setTypeSelected]= useState("");

    const getOptions = (dato) => {
        return Filtros.find((e) => e.Nombre === dato).Options;
    };

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
                value={ description }
                onChange= { handleDescriptionChange }
                placeholder={"Ingrese una descripción del ticket"}
                className={styles.inputDescription}
                />
            </div>
            </div>
            <div className={styles.sectionTwoEdit}>
                <div className={styles.item + " " + styles.item1}>
                    Lider De Proyecto
                    <ProjectSelect
                        placeHolder={"Seleccione lider del proyecto"}
                        options={listRecursos}
                        style={styles.selectEstado}
                        setState={setLeaderSelected}
                    />
                </div>
                <div className={styles.item + " " + styles.item2}>
                    Cliente
                    <ProjectSelect
                        placeHolder={"Seleccione un cliente"}
                        options={listClient}
                        style={styles.selectEstado}
                        setState={setClientSelected}
                    />
                </div>
                <div className={styles.item + " " + styles.item3}>
                    Tipo
                    <ProjectSelect
                        placeHolder={"Seleccione un tipo"}
                        options={getOptions("Tipo")}
                        style={styles.selectEstado}
                        setState={setTypeSelected}
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
        <div className={styles.editSelected + " " + styles.createSelected}>
            <div
            onClick={() => {
                setCrearProject(false);
            }}
            className={styles.editCancel}
            >
            <IoClose size={"2vw"} color={"white"} />
            </div>
            <div className={styles.editConfirm}
                 onClick = {() => {
                    postProject(
                        {
                            "name" : name,
                            "description": description,
                            "idealInitDate" : initFechaSelect,
                            "idealEndDate" : endFechaSelect,
                            "assignedClient" : clientSelected,
                            "projectLeader" : leaderSelected,
                            "type" : typeSelected
                        }
                    )
                 }}
            >
                <HiCheck size={"2vw"} color={"white"} />
            </div>
        </div>
        </div>
    );
}

export default CreateProject;