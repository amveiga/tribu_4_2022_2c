import { useEffect, useState } from "react";
import {
  BsQuestionCircleFill,
  BsFillExclamationCircleFill,
  BsFillCaretLeftFill,
  BsCircleFill,
} from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { HiPhone, HiMail, HiOutlineUserGroup, HiCheck } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { ImMoveUp } from "react-icons/im";
import { MdEdit, MdDelete } from "react-icons/md";
import Comentarios from "../Comentarios";
import styles from "./../../Styles/Soporte/Ticket.module.css";
import TicketSelect from "./TicketSelect";
import axios from "axios";

function Ticket({ ticket, editSelected, setEditSelected }) {
  const [typeHovered, setTypeHovered] = useState(false);
  const [escalarSelected, setEscalarSelected] = useState(false);
  const [areaId, setAreaId] = useState("");
  const [userId, setUserId] = useState("");

  const getState = (estado) => {
    var style;
    if (estado === "Abierto") {
      style = styles.abierto;
    } else if (estado === "Análisis") {
      style = styles.analisis;
    } else if (estado === "Derivado") {
      style = styles.derivado;
    } else if (estado === "Resuelto") {
      style = styles.resuelto;
    } else {
      style = styles.cancelado;
    }
    return style;
  };

  const getSLA = (sla) => {
    var color;
    if (sla === "Bajo") {
      color = "#A8FF64";
    } else if (sla === "Medio") {
      color = "#FFED47";
    } else if (sla === "Alto") {
      color = "#FFB155";
    } else {
      color = "#FF6262";
    }
    return color;
  };

  const deleteTicket = async () => {
    await axios
      .delete(
        `https://fiuba-memo1-api-soporte.azurewebsites.net/api/v1/tickets/${ticket.id}`
      )
      .catch((error) => alert(error));
  };

  const updateTicket = async () => {
    await axios
      .put(
        `https://fiuba-memo1-api-soporte.azurewebsites.net/api/v1/tickets/${ticket.id}`,
        {
          title: ticket.title,
          description: ticket.description,
          status: ticket.status,
          type: ticket.type,
          origin: ticket.origin,
          sla: ticket.sla,
          clientId: ticket.clientId,
          clientProductId: ticket.clientProductId,
          userId: userId,
          areaId: areaId,
        }
      )
      .then(setEscalarSelected(false))
      .catch((error) => alert(error));
  };

  const [clients, setClients] = useState([]);

  useEffect(() => {
    const getClients = async () => {
      var response = await axios.get(
        "https://anypoint.mulesoft.com/mocking/api/v1/sources/exchange/assets/754f50e8-20d8-4223-bbdc-56d50131d0ae/clientes-psa/1.0.0/m/api/clientes"
      );
      setClients(response.data);
    };
    getClients();
  }, []);

  const getClient = () => {
    var client;
    if (ticket.clientId !== "") {
      client = clients.find((c) => c.id.toString() === ticket.clientId)?.CUIT;
    } else {
      client = "";
    }
    return client;
  };

  return (
    <div className={styles.container}>
      <div className={styles.ticketContainer}>
        <div className={styles.ticket}>
          <div className={styles.sectionOne}>
            <div className={styles.headerSection}>
              <div className={styles.titleSection}>
                {ticket.title}
                {ticket.type === "Consulta" ? (
                  <BsQuestionCircleFill
                    onMouseEnter={() => setTypeHovered(true)}
                    onMouseLeave={() => setTypeHovered(false)}
                    className={styles.type}
                    size={"1.3vw"}
                    color={"rgba(106, 176, 249, 1)"}
                  />
                ) : (
                  <BsFillExclamationCircleFill
                    onMouseEnter={() => setTypeHovered(true)}
                    onMouseLeave={() => setTypeHovered(false)}
                    className={styles.type}
                    size={"1.3vw"}
                    color={"red"}
                  />
                )}
                {typeHovered && (
                  <div className={styles.showType}>
                    <BsFillCaretLeftFill
                      className={styles.arrow}
                      size={"1.5vw"}
                      color={
                        ticket.type === "Consulta"
                          ? "rgba(106, 176, 249, 1)"
                          : "red"
                      }
                    />
                    <div
                      className={
                        (ticket.type === "Consulta"
                          ? styles.blue
                          : styles.red) +
                        " " +
                        styles.showTypeText
                      }
                    >
                      {ticket.type}
                    </div>
                  </div>
                )}
              </div>
              <div
                onClick={() => setEscalarSelected(true)}
                className={styles.escalar}
              >
                Escalar ticket
                <ImMoveUp size={"1.5vw"} color={"white"} />
              </div>
            </div>
            <div className={styles.descripcion}>{ticket.description}</div>
            <div className={styles.footerSection}>
              {ticket.origin === "Teléfono" ? (
                <HiPhone size={"1.2vw"} color={"rgba(0,53,108,1)"} />
              ) : (
                <HiMail size={"1.4vw"} color={"rgba(0,53,108,1)"} />
              )}
              <div className={styles.marginLeft}>{getClient()}</div>
              <div className={styles.marginLeft}>-</div>
              <div className={styles.marginLeft}>
                Emitido: {ticket.createdDate}
              </div>
              <div className={styles.marginLeft}>-</div>
              <div className={styles.marginLeft}>
                Modificado: {ticket.lastModifiedDate}
              </div>
            </div>
          </div>
          <div className={styles.sectionTwo}>
            <div className={styles.estado + " " + getState(ticket.status)}>
              {ticket.status}
            </div>
            <div className={styles.item}>
              {ticket.sla}
              <BsCircleFill size={"1.3vw"} color={getSLA(ticket.sla)} />
            </div>
            <div className={styles.item}>
              {ticket.userId === "" ? "-" : ticket.userId}
              <FiUser size={"1.5vw"} color={"rgba(0,53,108,1)"} />
            </div>
            <div className={styles.item}>
              {ticket.areaId === "" ? "-" : ticket.areaId}
              <HiOutlineUserGroup size={"1.5vw"} color={"rgba(0,53,108,1)"} />
            </div>
            <div className={styles.tarea}>
              Agregar tarea
              <FaPlus size={"1.5vw"} color={"white"} />
            </div>
          </div>
        </div>
        <div
          onClick={() => {
            setEditSelected(true);
          }}
          className={
            editSelected ? styles.edit + " " + styles.selected : styles.edit
          }
        >
          <MdEdit
            size={"1.5vw"}
            color={editSelected ? "white" : "rgba(0,53,108,1)"}
          />
        </div>
        {editSelected ? (
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
        ) : (
          <div className={styles.delete} onClick={() => deleteTicket()}>
            <MdDelete size={"1.5vw"} color={"rgba(0,53,108,1)"} />
          </div>
        )}
      </div>
      <Comentarios id={ticket.id} />
      {escalarSelected && (
        <div className={styles.escalarSelectedContainer}>
          <div className={styles.escalarSelected}>
            <div className={styles.selection + " " + styles.item1}>
              <div className={styles.marginLeftEscalar}>Área</div>
              <TicketSelect
                placeHolder={"Seleccione un área"}
                options={[
                  { value: "Marketing", label: "Marketing" },
                  { value: "Desarollo", label: "Desarollo" },
                  { value: "Recursos Humanos", label: "Recursos Humanos" },
                  { value: "Administración", label: "Administración" },
                ]}
                style={styles.selectItem}
                setter={setAreaId}
                value={areaId}
              />
            </div>
            <div className={styles.selection + " " + styles.item2}>
              <div className={styles.marginLeftEscalar}>Recurso</div>
              <TicketSelect
                placeHolder={"Seleccione un recurso"}
                options={[
                  { value: "Recurso 1", label: "Recurso 1" },
                  { value: "Recurso 2", label: "Recurso 2" },
                  { value: "Recurso 3", label: "Recurso 3" },
                ]}
                style={styles.selectItem}
                setter={setUserId}
                value={userId}
              />
            </div>
          </div>
          <div className={styles.editSelected + " " + styles.escalarHeight}>
            <div
              onClick={() => setEscalarSelected(false)}
              className={styles.editCancel}
            >
              <IoClose size={"2vw"} color={"white"} />
            </div>
            <div onClick={() => updateTicket()} className={styles.editConfirm}>
              <HiCheck size={"2vw"} color={"white"} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Ticket;
