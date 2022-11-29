import ProjectList from "../Components/Proyecto/ProjectList"
import { useEffect, useState } from "react";
import { GetClients, GetRecursos } from "../Components/Proyecto/ProjectViewList"
import styles from "./../Styles/Proyectos/Proyectos.module.css"

function Proyectos() {
  const [clients, setClients] = useState([]);
  const [recursos, setRecursos] = useState([]);
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

  return (
    <div className={styles.proyectosContainer}>
      {useEffect(() => {
          GetClients(setClients);
          GetRecursos(setRecursos);
      }, [])}
      <ProjectList 
          listClient={clientsName}
          clientes={clients}
          listRecursos={recursosName}
          recursos={recursos}
      />
    </div>
  )
}

export default Proyectos;
