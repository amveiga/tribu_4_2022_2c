import { useState } from "react";
import styles from "./../../Styles/Proyectos/Project.module.css";
import Project from "./Project";
import ProjectEdit from "./ProjectEdit";

function ProjectSelector({ project, listClient, client, idDelete }) {
    const [editSelected, setEditSelected] = useState(false);
    const [deletedSelected, setDeleteSelected] = useState(false);

    return (
        <div className={styles.projectSelector}>
            {(editSelected && !deletedSelected) ?  (
                <ProjectEdit 
                project={project} 
                setEditSelected={setEditSelected}  
                clientsName={listClient}
                setClient={client}/>
            ) : ( 
                <Project
                project={project}
                editSelected={editSelected}
                setEditSelected={setEditSelected}
                setClient={client}
                setDeleteSelected={setDeleteSelected}
                />
            )}
            { deletedSelected ? (idDelete(project._id)) : (idDelete(null))}
        </div>
    );
}

export default ProjectSelector;
