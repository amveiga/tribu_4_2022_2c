import styles from "../../Styles/Proyectos/Proyectos.module.css"
// import { ProjectViewAPI } from "./ProjectViewList"
import ProjectSelector from "./ProjectSelector";
import { useEffect, useState } from "react";
import ButtonCreate from "./ButtonCreate"
// import Filtros from "./Filtro/Filtros"

function ProjectList({ projects, listClient, clientes, listRecursos, recursos, clientesR }) {
    const [projectsFilter, setProjectsFilter] = useState([]);
    // const [sortBy, setSortBy] = useState([]);
    // const [filtros, setFiltros] = useState("");
    // const [idClient, setIdClient] = useState("");
    // const [type, setType] = useState("");
    // const [status, setStatus] = useState("");
    // eslint-disable-next-line
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

    // const sortMaxToMin = (data) => {
    //     switch (sortBy[0]) {
    //         case "status":
    //             setProjectsFilter(data.sort((a, b) => (a.status > b.status ? -1 : 1)));
    //             break;
    //         case "type":
    //             setProjectsFilter(data.sort((a, b) => (a.type > b.type ? -1 : 1)));
    //             break;
    //       default: return "asdasd"
    //     }
    //   };

    // const sortMinToMax = (data) => {
    //     switch (sortBy[0]) {
    //         case "status":
    //             setProjectsFilter(data.sort((a, b) => (a.status > b.status ? 1 : -1)));
    //             break;
    //         case "type":
    //             setProjectsFilter(data.sort((a, b) => (a.type > b.type ? 1 : -1)));
    //             break;
    //         default: return ""
    //     }
    // };

    // const sort = (data) => {
    //     if (sortBy[1] === 1) {
    //         sortMinToMax(data);
    //     } else {
    //         sortMaxToMin(data);
    //     }
    // };

    const filtarProjectos = (projects) =>{
        // if(filtros !== "") {
        //     if (idClient !== "") {
        //     const clientProjects = projects.map((project) => (project.assignedClient === idClient))
        //     setProjectsFilter(clientProjects)
        //     }
        //     if (type !== ""){
        //         const clientProjects = projects.map((project) => (project.type === type))
        //         console.log("dsaukdghsajkdh")
        //         setProjectsFilter(clientProjects)
        //     }
        // } else {
            setProjectsFilter(projects) 
        // }
    }
    
    useEffect(() => {
        filtarProjectos(projects)
    })

    return (
        <div className={styles.proyectosContainer}>
            {/* <Filtros 
                setFiltros={setFiltros}
                client={cliente}
                idClient={idClient}
                type={type}
                status={status}
                setIdClient={setIdClient}
                setType={setType}
                setStatus={setStatus}
            /> */}
            <div className={styles.projects}>
                {projectsFilter.map((project) => {
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