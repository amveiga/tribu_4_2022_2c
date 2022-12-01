import styles from "../../Styles/Proyectos/Proyectos.module.css"
import { ProjectViewAPI } from "./ProjectViewList"
import ProjectSelector from "./ProjectSelector";
import { useEffect, useState } from "react";
import ButtonCreate from "./ButtonCreate"

function ProjectList({ listClient, clientes, listRecursos, recursos }) {
    const [projects, setProjects] = useState([]);

    const getRazonSocial = (id) => {
        const a = (clientes.find((cliente) => (cliente.id === id)))
        return (a["razon social"]);
    }

    const getRecurso = (id) => {
        const a = (recursos.find((recurso) => (
            recurso['legajo'] === id
        )))
        console.log(a)
        return (`${a.Nombre}, ${a.Apellido}`);
    }

    return (
        <div className={styles.proyectosContainer}>
            <div className={styles.projects}>
                {useEffect(() => {
                    ProjectViewAPI(setProjects)
                }, [])}
                {projects.map((project) => {
                    return <ProjectSelector 
                                key={project._id} 
                                project={project} 
                                listClient={listClient}
                                client={getRazonSocial(project.assignedClient)}
                                listRecursos={listRecursos}
                                recurso={getRecurso(project.projectLeader)}
                            />
                })}
            </div>
            <ButtonCreate listClient={listClient} listRecursos={listRecursos}/>
        </div>
    )
} 

export default ProjectList