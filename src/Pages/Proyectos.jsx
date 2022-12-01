import ProjectList from "../Components/Proyecto/ProjectList"
import { useEffect, useState } from "react";
import { GetClients, GetRecursos } from "../Components/Proyecto/ProjectViewList"
import styles from "./../Styles/Proyectos/Proyectos.module.css"
import ReactLoading from "react-loading";

function Proyectos() {
    const [clients, setClients] = useState([]);
    const [recursos, setRecursos] = useState([]);
    const [loading, setLoading] = useState(true);

    const clientsName = [];
    const recursosName = [];
    clients.map((cliente) => {
        return  clientsName.push({"value": cliente["id"], 
            "label": cliente["razon social"]})}     
    )

    recursos.map((recurso) => {
        return recursosName.push({"value": recurso["legajo"],
            "label" : `${recurso["Nombre"]}, ${recurso["Apellido"]}`})
    })
  
    useEffect(() => {
      GetClients(setClients, setLoading);
      if(!setLoading) {
        setLoading(true)
        GetRecursos(setRecursos, setLoading);
      }
    }, [])
  
  return (
        <div className={styles.proyectosContainer}>
            {loading ? (
                <div className={styles.loading}>
                    <ReactLoading
                        type={"bars"}
                        color={"rgba(0,53,108,1"}
                        height={"10%"}
                        width={"10%"}
                    />
                </div>
            ) : (
                <ProjectList 
                    listClient={clientsName}
                    clientes={clients}
                    listRecursos={recursosName}
                    recursos={recursos}
                />)}
    </div>
  )
}

export default Proyectos;
