import styles from "../../Styles/Proyectos/Proyectos.module.css"
import ProjectSelector from "./ProjectSelector";
import { useEffect, useState } from "react";
import ButtonCreate from "./ButtonCreate"
import Filtros from "./Filtro/Filtros"
import { filtradoInclusivo } from "./Filtro/utils";

function ProjectList({ projects, listClient, clientes, listRecursos, recursos, clientesR }) {
    const [projectsFilter, setProjectsFilter] = useState([]);
    const [sortBy, setSortBy] = useState([]);
    const [filtros, setFiltros] = useState("");
    const [filtradoActivado, setFiltroActivado] = useState(false);

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
                setProjectsFilter(data.sort((a, b) => (a.status > b.status ? -1 : 1)));
                break;
            case "type":
                setProjectsFilter(data.sort((a, b) => (a.type > b.type ? -1 : 1)));
                break;
          default: return "asdasd"
        }
      };

    const sortMinToMax = (data) => {
        switch (sortBy[0]) {
            case "status":
                setProjectsFilter(data.sort((a, b) => (a.status > b.status ? 1 : -1)));
                break;
            case "type":
                setProjectsFilter(data.sort((a, b) => (a.type > b.type ? 1 : -1)));
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

    const filtrarProjectos = (projects) =>{
        var filtrado = [];
        if (filtros.length !== 0) {
            console.log("filtros multiples")
            filtrado = filtradoInclusivo(filtros, projects, clientes);
            setProjectsFilter(filtrado)
        } else {
            console.log("proyectos originales")
            setProjectsFilter(projects)
        }
        setFiltroActivado(false);
    }

    useEffect(() => {
        filtrarProjectos(projects)
    }, [filtradoActivado])

    return (
        <div className={styles.proyectosContainer}>
            <Filtros 
                setFiltros={setFiltros}
                setSortBy={setSortBy}
                clients={clientesR}
                setFiltroActivado={setFiltroActivado}
            />
            
            <div className={styles.projects}>
                {projectsFilter.length === 0 ? 
                
                (<div className={styles.noProjects}> No hay proyectos disponibles</div>)
                
                :( projectsFilter.map((project) => {
                    return <ProjectSelector 
                                key={project._id} 
                                project={project} 
                                listClient={listClient}
                                client={getRazonSocial(project.assignedClient)}
                                listRecursos={listRecursos}
                                recurso={getRecurso(project.projectLeader)}
                            />
                }))}
            </div>
            <ButtonCreate listClient={listClient} listRecursos={listRecursos}/>
        </div>
    )
} 

export default ProjectList