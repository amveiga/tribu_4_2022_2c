import { useState } from "react";
import styles from "./../../Styles/Proyectos/Project.module.css";
import Project from "./Project";
import ProjectEdit from "./ProjectEdit";

function ProjectSelector({ project, listClient, client }) {
    const [editSelected, setEditSelected] = useState(false);
    const [deletedSelected, setDeleteSelected] = useState(false);
    
    return (
        <div className={styles.projectSelector}>
            {editSelected ?  (
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
            
        </div>
    );
}

export default ProjectSelector;
