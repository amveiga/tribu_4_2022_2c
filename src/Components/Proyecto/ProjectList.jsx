import styles from "../../Styles/Proyectos/Proyectos.module.css"
import ProjectViewList from "./ProjectViewList"
import ProjectSelector from "./ProjectSelector";
import { useEffect, useState } from "react";

function ProjectList() {
    const [projects, setProjects] = useState([]);
    return (
        <div className={styles.proyectosContainer}>
            <div className={styles.projects}>
                {useEffect(() => {
                    ProjectViewList(setProjects)
                }, [])}
                {projects.map((project) => {
                    return <ProjectSelector key={project._id} project={project}/>
                })}
            </div>
        </div>
    )
} 

export default ProjectList