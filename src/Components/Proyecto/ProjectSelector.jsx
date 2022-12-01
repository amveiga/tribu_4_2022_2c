import { useState } from "react";
import styles from "./../../Styles/Proyectos/Project.module.css";
import Project from "./Project";
import ProjectEdit from "./ProjectEdit";

function ProjectSelector({ project, listClient, client, listRecursos, recurso }) {
    const [editSelected, setEditSelected] = useState(false);
    
    return (
        <div className={styles.projectSelector}>
            {(editSelected) ?  (
                <ProjectEdit 
                    project={project} 
                    setEditSelected={setEditSelected}  
                    clientsName={listClient}
                    setClient={client}
                    listRecursos={listRecursos}
                    setRecurso={recurso}
                />
            ) : ( 
                <Project
                    project={project}
                    editSelected={editSelected}
                    setEditSelected={setEditSelected}
                    setClient={client}
                    listRecursos={listRecursos}
                    setRecurso={recurso}
                />
            )}
        </div>
    );
}

export default ProjectSelector;
