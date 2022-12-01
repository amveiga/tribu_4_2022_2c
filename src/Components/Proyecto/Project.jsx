import { FiUser, FiClock } from "react-icons/fi";
import { HiCheck } from "react-icons/hi";
import { BsFillPersonFill, BsCalendarEventFill } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import styles from "./../../Styles/Proyectos/Project.module.css";
import PopUpProject from "./PopUp";
import { useState } from "react";

function Project({ project, editSelected, setEditSelected, setClient, setRecurso }) {
    // eslint-disable-next-line
    const [deleteSelected, setDeleteSelected] = useState(false);
    
    const parseDate = (fecha) => {
        const parse = new Date(fecha)
        return parse.toLocaleDateString();
    }
    
    const getState = (estado) => {
        switch (estado) {
            case "No Iniciado": return styles.notStarted;
            case "Iniciado" : return styles.initiated;
            case "Analisis" : return styles.analisys;
            case "Desarrollo" : return styles.developed;
            case "Pruebas" : return styles.tested;
            case "Produccion" : return styles.production;
            case "Post-Produccion" : return styles.pproduction;
            case "Cancelado" : return styles.canceled;
            default : return styles.notStarted;
        }
    }
    
    const getType = (type) => {
        switch (type) {
            case "Desarrollo": return styles.dev;
            case "Implementacion" : return styles.implementation;
            default : return styles.developed;
        }
    }
    
    return (
        <div className={styles.container}>
            <div className={styles.projectContainer}>
                <div className={styles.project}>
                    <div className={styles.sectionOne}>
                        <div className={styles.headerSection}>
                            <div className={styles.titleSection} >
                                <a href={"/proyectos/" + project._id}>    
                                    {project.name}
                                </a>
                            </div>
                        </div>
                        <div className={styles.descripcion}>
                            {project.description}
                        </div>
                        <div className={styles.footerSection}>
                        <div className={styles.marginLeft}>
                            <div className={styles.iconoCliente} title="Cliente Asignado" ><BsFillPersonFill/>
                                {` ${setClient}`}
                            </div> 
                        </div>
                            <div className={styles.marginLeft} title="Fechas ideales inicio/fin"> - <BsCalendarEventFill/></div>
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
                        <div className={styles.estado + " " + getType(project.type)} title="Tipo de proyecto">
                            {project.type}
                        </div>
                        <div className={styles.estado + " " + getState(project.status)} title="Estado actual del proyecto">
                            {project.status}
                        </div>
                        <div className={styles.item + " " + styles.item3} title="Lider del proyecto">
                            <FiUser size={"1.5vw"} color={"rgba(0,53,108,1)"} />
                            {`${setRecurso}`}
                        </div>
                        <div className={styles.item}>
                            <FiClock size={"1.5vw"} color={"rgba(0,53,108,1)"} title="Horas invertidas del proyecto" />
                            {project.invertedHours} h
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
                        color={editSelected ? "white" : "rgba(0,53,108,1)"} title = "Editar proyecto"
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
                    <div className={styles.delete} title = "Eliminar proyecto"
                        onClick={() => {
                            setDeleteSelected(true)
                        }}>
                            <PopUpProject 
                                message={"¿Desea eliminar el proyecto?"}
                                setDeleteSelected={setDeleteSelected}
                                id={project._id}
                            />
                    </div>
                )}
            </div>
        </div>
    )
}

export default Project;