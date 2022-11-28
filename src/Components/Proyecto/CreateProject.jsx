import { HiCheck } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import styles from "./../../Styles/Proyectos/Project.module.css";
import ProjectSelect from "./ProjectSelect";
import Filtros from "./../../Data/FiltrosProyectos.json";
import { useState } from "react";
import {KeyboardDatePicker} from '@material-ui/pickers'

function CreateProject({ setCrearProject, listClient }) {
    const [statusSelected, setStatusSelected] = useState("");
    const [clientSelected, setClientSelected] = useState("");

    var fechaCreacion = new Date();
    var ultimaModificacion = new Date();
    const [fechaSelect, setFechaSelect] = useState(new Date());

    const getOptions = (dato) => {
        return Filtros.find((e) => e.Nombre === dato).Options;
    };

    const getDate = (fecha) => {
        return fecha.getDate() + "/" + fecha.getMonth() + "/" + fecha.getFullYear();
    };

    console.log(fechaSelect)

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
                placeholder={"Ingrese un titulo"}
                className={styles.inputTitulo}
                />
            </div>
            <div className={styles.descripcion + " " + styles.marginTop}>
                <div className={styles.title}>Descripción</div>
                <textarea
                type={"text"}
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
                    value={fechaSelect}
                    InputAdornmentProps={{ position: "start" }}
                    onChange={setFechaSelect}
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
                <div className={styles.fecha + " " + styles.end}>
                    Última modificación:
                    <div className={styles.fechaText}>
                        {getDate(ultimaModificacion)}
                    </div>
                </div>
            </div>
            </div>
            <div className={styles.sectionTwoEdit}>
            <div className={styles.item + " " + styles.item1}>
                SLA
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
            <div className={styles.item + " " + styles.item3}>
                Medio
                {/* <TicketSelect
                placeHolder={"Seleccione un medio"}
                options={getOptions("Medio")}
                style={styles.selectEstado}
                /> */}
            </div>
            <div className={styles.item + " " + styles.item4}>
                Tipo
                {/* <TicketSelect
                placeHolder={"Seleccione un tipo"}
                options={getOptions("Tipo")}
                style={styles.selectEstado}
                /> */}
            </div>
            </div>
        </div>
        <div className={styles.editSelected + " " + styles.createSelected}>
            <div
            onClick={() => {
                setCrearProject(false);
                // createTicket();
            }}
            className={styles.editCancel}
            >
            <IoClose size={"2vw"} color={"white"} />
            </div>
            <div className={styles.editConfirm}>
            <HiCheck size={"2vw"} color={"white"} />
            </div>
        </div>
        </div>
    );
}

export default CreateProject;