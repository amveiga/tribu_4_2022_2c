import { HiCheck } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import styles from "./../../Styles/Proyectos/Project.module.css";
import ProjectSelect from "./ProjectSelect";
//import Filtros from "./../../Data/FiltrosProyectos.json";
import { useState } from "react";
import {KeyboardDatePicker} from '@material-ui/pickers'
import {postProject} from "./ProjectViewList" 

function CreateProject({ setCrearProject, listClient }) {
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

    // const getOptions = (dato) => {
    //     return Filtros.find((e) => e.Nombre === dato).Options;
    // };

    // const getDate = (fecha) => {
    //     return fecha.getDate() + "/" + fecha.getMonth() + "/" + fecha.getFullYear();
    // };

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
            <div className={styles.fechas}>
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
                {/* <div className="grupo">
                    <label>
                        Fecha de creación:
                    </label>
                    <DatePicker value={fechaSelect} onChange={setFechaSelect}/>
                </div> */}
            </div>
            </div>
            <div className={styles.sectionTwoEdit}>
            <div className={styles.item + " " + styles.item1}>
                LiderDeProyecto (api recursos)
                {/* <ProjectSelect
                placeHolder={"Seleccione un SLA"}
                options={getOptions("SLA")}
                style={styles.selectEstado}
                /> */}
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
                            "assignedClient" : clientSelected
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