import {
    BsQuestionCircleFill,
    BsFillExclamationCircleFill,
  } from "react-icons/bs";
  import { HiCheck } from "react-icons/hi";
  import { IoClose } from "react-icons/io5";
  import { MdEdit } from "react-icons/md";
  import styles from "./../../Styles/Proyectos/Project.module.css";
  import Filtros from "./../../Data/FiltrosProyectos.json";
  import ProjectSelect from "./ProjectSelect";
  import { useState, useEffect } from "react";
  import { GetClients} from "../../Components/Proyecto/ProjectViewList"
  
  function ProjectEdit({ project, setEditSelected }) {
    const getOptions = (dato) => {
      return Filtros.find((e) => e.Nombre === dato).Options;
    };
    
    const [clients, setClients] = useState([]);
    var clientsName = [];

    useEffect(() => {
      console.log("a")
      GetClients(setClients)
    }, [])

    clients.map((cliente) => {
      return  clientsName.push({"value": cliente["id"], 
          "label": cliente["razon social"]})}     
    )

    return (
      <div className={styles.projectContainerEdit}>
        <div className={styles.projectEdit}>
          <div className={styles.sectionOne}>
            <div className={styles.titleSection + " " + styles.growTitle}>
              <input
                type={"text"}
                defaultValue={project.name}
                className={styles.input}
              />
              {/* {ticket.tipo === "Consulta" ? (
                <BsQuestionCircleFill
                  className={styles.type}
                  size={"1.3vw"}
                  color={"rgba(106, 176, 249, 1)"}
                />
              ) : (
                <BsFillExclamationCircleFill
                  className={styles.type}
                  size={"1.3vw"}
                  color={"red"}
                />
              )} */}
              {/* <ProjectSelect
                placeHolder={"ticket.tipo"}
                options={getOptions("Tipo")}
                style={styles.select}
              /> */}
            </div>
            <div className={styles.descripcion}>
              <textarea
                type={"text"}
                defaultValue={project.description}
                className={styles.inputDescription}
              />
            </div>
          </div>
          <div className={styles.sectionTwoEdit}>
            <div className={styles.item + " " + styles.item1}>
              Estado
              <ProjectSelect
                placeHolder={project.status}
                options={getOptions("Estado")}
                style={styles.selectEstado}
              />
            </div>
            <div className={styles.item + " " + styles.item2}>
              SLA
              {/* <ProjectSelect
                placeHolder={"das"}
                options={getOptions("SLA")}
                style={styles.selectEstado}
              /> */}
            </div>
            <div className={styles.item + " " + styles.item3}>
              Cliente
              <ProjectSelect
                placeHolder={project.assignedClient}
                options={clientsName}
                style={styles.selectEstado}
              />
            </div>
            <div className={styles.item + " " + styles.item4}>
              Medio
              {/* <ProjectSelect
                placeHolder={"ticket.medio"}
                options={getOptions("Medio")}
                style={styles.selectEstado}
              /> */}
            </div>
          </div>
        </div>
        <div className={styles.edit + " " + styles.selected}>
          <MdEdit size={"1.5vw"} color={"white"} />
        </div>
        <div className={styles.editSelected}>
          <div
            className={styles.editCancel}
            onClick={() => setEditSelected(false)}
          >
            <IoClose size={"2vw"} color={"white"} />
          </div>
          <div className={styles.editConfirm}>
            <HiCheck size={"2vw"} color={"white"} />
          </div>
        </div>
      </div>
    );
  }
  
  export default ProjectEdit;
  