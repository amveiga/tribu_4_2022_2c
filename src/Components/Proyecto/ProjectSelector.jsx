import { useState } from "react";
import styles from "./../../Styles/Proyectos/Project.module.css";
import Project from "./Project";
import ProjectEdit from "./ProjectEdit";

function ProjectSelector({ project }) {
    const [editSelected, setEditSelected] = useState(false);
    return (
        <div className={styles.projectSelector}>
            {editSelected ?  (
                <ProjectEdit project={project} setEditSelected={setEditSelected}/>
            ) : ( 
            <Project
                project={project}
                editSelected={editSelected}
                setEditSelected={setEditSelected}
                />
            )}
        </div>
    );
}

export default ProjectSelector;
