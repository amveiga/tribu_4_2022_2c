import styles from "../../Styles/Proyectos/Proyectos.module.css"
import { ProjectViewAPI } from "./ProjectViewList"
import ProjectSelector from "./ProjectSelector";
import { useEffect, useState } from "react";
import ButtonCreate from "./ButtonCreate"
import Filtros from "./Filtro/Filtros"

function ProjectList({ listClient, clientes, listRecursos, recursos, clientesR }) {
    const [projects, setProjects] = useState([]);
    const [sortBy, setSortBy] = useState([]);
    const [error, setError] = useState(false);
    const [filtros, setFiltros] = useState("");
    const cliente = clientesR

    const getRazonSocial = (id) => {
        const cliente = (clientes.find((cliente) => (cliente.id === id)))
        return (cliente["razon social"]);
    }

    const getRecurso = (id) => {
        const recurso =  (recursos.find((recurso) => (
            (recurso['legajo']=== id) )
        ))
        return (`${recurso.Nombre}, ${recurso.Apellido}`)
    }

    const sortMaxToMin = (data) => {
        switch (sortBy[0]) {
            case "status":
                setProjects(data.sort((a, b) => (a.status > b.status ? -1 : 1)));
                break;
            case "type":
                setProjects(data.sort((a, b) => (a.type > b.type ? -1 : 1)));
                break;
          default: return "asdasd"
        }
      };

    const sortMinToMax = (data) => {
        switch (sortBy[0]) {
            
            case "status":
                setProjects(data.sort((a, b) => (a.status > b.status ? 1 : -1)));
                break;
            case "type":
                setProjects(data.sort((a, b) => (a.type > b.type ? 1 : -1)));
                break;
            default: return ""
        }
    };

    const sort = (data) => {
        if (sortBy[1] === 1) {
            sortMinToMax(data);
        } else {
            sortMaxToMin(data);
        }
    };
    
    useEffect(() => {
        ProjectViewAPI(setProjects)
        if (sortBy.length !== 0) {
            sort(projects);
        }
    }, [])

    return (
        <div className={styles.proyectosContainer}>
            <Filtros 
                        setSortBy={setSortBy}
                        setFiltros={setFiltros}
                        error={error}
                        setError={setError}
                        client={cliente}
            />
            <div className={styles.projects}>
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