import styles from "../../Styles/Proyectos/Proyectos.module.css"
import ProjectViewAPI, { DeleteProject, GetClients } from "./ProjectViewList"
import ProjectSelector from "./ProjectSelector";
import { useEffect, useState } from "react";
import ProjectCreate from "./ProjectCreate"

function ProjectList() {
    const [projects, setProjects] = useState([]);
    const [clients, setClients] = useState([]);
    const [idDelete, setIdDeleteSelected] = useState(null);
    const clientsName = []

    clients.map((cliente) => {
      return  clientsName.push({"value": cliente["id"], 
          "label": cliente["razon social"]})}     
    )

    const getRazonSocial = (id) => {
        return (clients.find((cliente) => (cliente.id === id)))['razon social']
    }

    return (
        <div className={styles.proyectosContainer}>
            <div className={styles.projects}>
                {useEffect(() => {
                    ProjectViewAPI(setProjects)
                    GetClients(setClients)
                }, [])}
                {idDelete ? DeleteProject(idDelete) : console.log("No se puede")}
                {projects.map((project) => {
                    return <ProjectSelector 
                                key={project._id} 
                                project={project} 
                                listClient={clientsName}
                                client={getRazonSocial(project.assignedClient)}
                                idDelete={setIdDeleteSelected}
                            />
                })}


            </div>

            <ProjectCreate/>
        </div>
    )
} 

export default ProjectList