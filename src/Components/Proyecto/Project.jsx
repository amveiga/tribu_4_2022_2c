import { useState } from "react";
// import {
//   BsQuestionCircleFill,
//   BsFillExclamationCircleFill,
//   BsFillCaretLeftFill,
//   BsCircleFill,
// } from "react-icons/bs";
import { FiUser, FiClock } from "react-icons/fi";
import { HiCheck } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { ImMoveUp } from "react-icons/im";
import { MdEdit, MdDelete } from "react-icons/md";
import styles from "./../../Styles/Proyectos/Project.module.css";
import ProjectSelect from "./ProjectSelect";

function Project({ project, editSelected, setEditSelected }) {
    const parseDate = (fecha) => {
        const parse = new Date(fecha)
        return parse.toLocaleDateString();
    }

    const getState = (estado) => {
        var style;
        if (estado === "notStarted") {
          style = styles.notStarted;
        } else if (estado === "initiated") {
          style = styles.initiated;
        } else if (estado === "finished") {
          style = styles.finished;
        } else if (estado === "canceled") {
          style = styles.canceled;
        }
        return style;
    };
    // const [typeHovered, setTypeHovered] = useState(false);
    const [escalarSelected, setEscalarSelected] = useState(false);
    
    return (
        <div className={styles.container}>
            <div className={styles.projectContainer}>
                <div className={styles.project}>
                    <div className={styles.sectionOne}>
                        <div className={styles.headerSection}>
                            <div className={styles.titleSection}>
                                {project.name}
                            </div>
                        </div>
                        <div className={styles.descripcion}>
                            {project.description}
                        </div>
                        <div className={styles.footerSection}>
                        <div className={styles.marginLeft}>"{project.assignedClient}"</div>
                            <div className={styles.marginLeft}>-</div>
                            <div className={styles.marginLeft}>
                                Inicia {parseDate(project.idealInitDate)}
                            </div>
                            <div className={styles.marginLeft}>-</div>
                            <div className={styles.marginLeft}>
                                Finaliza {parseDate(project.idealEndDate)}
                            </div>
                        </div>
                    </div>
                    <div className={styles.sectionTwo}>
                        <div className={styles.estado + " " + getState(project.status)}>
                            {project.status}
                        </div>
                        <div className={styles.item}>
                            <FiUser size={"1.5vw"} color={"rgba(0,53,108,1)"} />
                            Agregar lider proyecto
                        </div>
                        <div className={styles.item}>
                            <FiClock size={"1.5vw"} color={"rgba(0,53,108,1)"} />
                            {project.invertedHours}
                        </div>
                    </div>
                </div>
                <div onClick={() => {
                    setEditSelected(true);
                    }}
                    className={
                        editSelected ? styles.edit + " " + styles.selected : styles.edit
                    }
                >
                    <MdEdit
                        size={"1.5vw"}
                        color={editSelected ? "white" : "rgba(0,53,108,1)"}
                    />
                </div>
                {editSelected ? (
                    <div className={styles.editSelected}>
                        <div
                        className={styles.editCancel}
                        onClick={() => setEditSelected(false)}
                        >
                            <IoClose size={"2vw"} color={"white"} />
                        </div>
                        <div className={styles.editConfirm}>
                        <HiCheck size={"2vw"} color={"white"} />
                        </div>
                    </div>
                ) : (
                    <div className={styles.delete}>
                        <MdDelete size={"1.5vw"} color={"rgba(0,53,108,1)"} />
                    </div>
                )}
            </div>
            {escalarSelected && (
                <div className={styles.escalarSelectedContainer}>
                    <div className={styles.escalarSelected}>
                        <div className={styles.selection + " " + styles.item1}>
                            <div className={styles.marginLeftEscalar}>Área</div>
                            <ProjectSelect
                                placeHolder={"Seleccione un área"}
                                options={[
                                { value: "Marketing", label: "Marketing" },
                                { value: "Desarollo", label: "Desarollo" },
                                { value: "Recursos Humanos", label: "Recursos Humanos" },
                                { value: "Administración", label: "Administración" },
                                ]}
                                style={styles.selectItem}
                            />
                        </div>
                    <div className={styles.selection + " " + styles.item2}>
                        <div className={styles.marginLeftEscalar}>Recurso</div>
                        <ProjectSelect
                            placeHolder={"Seleccione un recurso"}
                            options={[
                            { value: "Recurso 1", label: "Recurso 1" },
                            { value: "Recurso 2", label: "Recurso 2" },
                            { value: "Recurso 3", label: "Recurso 3" },
                            ]}
                            style={styles.selectItem}
                        />
                        </div>
                    </div>
                    <div className={styles.editSelected + " " + styles.escalarHeight}>
                        <div
                            onClick={() => setEscalarSelected(false)}
                            className={styles.editCancel}
                        >
                            <IoClose size={"2vw"} color={"white"} />
                        </div>
                        <div className={styles.editConfirm}>
                            <HiCheck size={"2vw"} color={"white"} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Project;
