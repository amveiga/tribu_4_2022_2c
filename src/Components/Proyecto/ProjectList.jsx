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
    const [ordenActivado, setOrdenActivado] = useState(false);

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
            case "idealInitDate":
                setProjectsFilter(data.sort((a, b) => (a.idealInitDate > b.idealInitDate ? -1 : 1)))
                break;
            case "idealEndDate":
                setProjectsFilter(data.sort((a, b) => (a.idealEndDate > b.idealEndDate ? -1 : 1)))
                break;
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
        var ordenado = []
        switch (sortBy[0]) {
            case "idealInitDate":
                ordenado = data.sort((a, b) => (a.idealInitDate > b.idealInitDate ? 1 : -1));
                break;
            case "idealEndDate":
                ordenado = data.sort((a, b) => (a.idealEndDate > b.idealEndDate ? 1 : -1));
                break;
            case "status":
                ordenado = data.sort((a, b) => (a.status > b.status ? 1 : -1));
                break;
            case "type":
                ordenado = data.sort((a, b) => (a.type > b.type ? 1 : -1));
                break;
            default: return ""
        }
        setProjectsFilter(ordenado)
    };

    const sort = (data) => {
        if (sortBy[1] === 1) {
            sortMinToMax(data);
        } else {
            sortMaxToMin(data);
        }
        setOrdenActivado(false)
    };

    const filtrarProjectos = (projects) =>{
        var filtrado = [];
        if (filtros.length !== 0) {
            filtrado = filtradoInclusivo(filtros, projects, clientes);
            setProjectsFilter(filtrado)
        } else {
            setProjectsFilter(projects)
        }
        setFiltroActivado(false)
    }

    useEffect(() => {
        filtrarProjectos(projects)
        sort(projectsFilter)
    }, [filtradoActivado, ordenActivado])

    return (
        <div className={styles.proyectosContainer}>
            <Filtros 
                setFiltros={setFiltros}
                setSortBy={setSortBy}
                clients={clientesR}
                setFiltroActivado={setFiltroActivado}
                setOrdenActivado={setOrdenActivado}
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