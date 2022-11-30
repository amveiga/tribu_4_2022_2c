import { useEffect, useState } from "react";
import {
  BsQuestionCircleFill,
  BsFillExclamationCircleFill,
  BsFillCaretLeftFill,
  BsCircleFill,
} from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { HiPhone, HiMail, HiCheck } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { ImMoveUp } from "react-icons/im";
import { MdEdit, MdDelete } from "react-icons/md";
import styles from "./../../../Styles/Soporte/Ticket.module.css";
import TicketSelect from "./TicketSelect";
import Comentarios from "../Comentarios/Comentarios";
import {
  DeleteTicket,
  GetComentarios,
  GetRecursos,
  GetTareas,
  UpdateTicket,
} from "../../../Utils/SoporteApi";

function Ticket({ ticket, editSelected, setEditSelected, error, setError }) {
  const [typeHovered, setTypeHovered] = useState(false);
  const [escalarSelected, setEscalarSelected] = useState(false);
  const [recurso, setRecurso] = useState("");
  const [userId, setUserId] = useState(ticket.userId);
  const [tarea, setTarea] = useState("");
  const [tareaId, setTareaId] = useState(ticket.taskId);
  const [tareas, setTareas] = useState([]);
  const [tareaSelected, setTareaSelected] = useState(false);
  const [comentarios, setComentarios] = useState([]);
  const [recursos, setRecursos] = useState([]);

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
    await DeleteTicket(ticket.id);
  };

  const updateTicket = async () => {
    var body = {
      title: ticket.title,
      description: ticket.description,
      status: ticket.status,
      type: ticket.type,
      origin: ticket.origin,
      sla: ticket.sla,
      clientId: ticket.clientId,
      userId: userId,
      taskId: tareaId,
    };
    await UpdateTicket(ticket.id, body);
  };

  const getTareas = async () => {
    var tareas = await GetTareas(setError);
    if (tareas.status === 200) {
      setError(false);
      setTareas(
        tareas.data.map((t) => {
          return { label: t._id, value: t.name };
        })
      );
    } else {
      setError(true);
    }
  };

  const getRecursos = async () => {
    var recursos = await GetRecursos();
    if (recursos.status === 200) {
      setError(false);
      setRecursos(
        recursos.data.map((t) => {
          return { label: t.legajo, value: t.Nombre };
        })
      );
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    const getComentarios = async () => {
      var response = await GetComentarios(setError, ticket.id);
      if (response.status === 200) {
        setError(false);
        setComentarios(
          response.data?.sort((a, b) =>
            a.lastModifiedDatetime < b.lastModifiedDatetime ? 1 : -1
          )
        );
      } else {
        setError(true);
      }
    };

    getComentarios();
  });

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
                onClick={() => {
                  getRecursos();
                  setEscalarSelected(true);
                }}
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
              <div className={styles.marginLeft}>{ticket.clientId}</div>
              <div className={styles.marginLeft}>-</div>
              <div className={styles.marginLeft}>
                Emitido: {ticket.createdDatetime}
              </div>
              <div className={styles.marginLeft}>-</div>
              <div className={styles.marginLeft}>
                Modificado: {ticket.lastModifiedDatetime}
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
              {recurso === "" ? "-" : recurso}
              <FiUser size={"1.5vw"} color={"rgba(0,53,108,1)"} />
            </div>
            <div
              onClick={() => {
                getTareas();
                setTareaSelected(true);
              }}
              className={styles.tarea}
            >
              {tarea === "" ? "Asociar tarea" : tarea}
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
      <Comentarios
        error={error}
        setError={setError}
        comentarios={comentarios}
        id={ticket.id}
      />
      {tareaSelected && (
        <div className={styles.escalarSelectedContainer}>
          <div className={styles.escalarSelected}>
            <div className={styles.selection + " " + styles.item1}>
              <div className={styles.marginLeftEscalar}>Tarea</div>
              <TicketSelect
                placeHolder={"Seleccione una tarea"}
                options={tareas}
                style={styles.selectItem}
                setter={setTarea}
                setterId={setTareaId}
                value={tarea}
              />
            </div>
          </div>
          <div className={styles.escalarHeight}>
            <div
              onClick={() => {
                setTareaSelected(false);
                setTarea("");
                setTareaId(ticket.taskId);
              }}
              className={styles.editEscalarCancel}
            >
              <IoClose size={"2vw"} color={"white"} />
            </div>
            <div
              onClick={() => {
                updateTicket();
                setTareaSelected(false);
              }}
              className={styles.editEscalarConfirm}
            >
              <HiCheck size={"2vw"} color={"white"} />
            </div>
          </div>
        </div>
      )}
      {escalarSelected && (
        <div className={styles.escalarSelectedContainer}>
          <div className={styles.escalarSelected}>
            <div className={styles.selection + " " + styles.item2}>
              <div className={styles.marginLeftEscalar}>Recurso</div>
              <TicketSelect
                placeHolder={"Seleccione un recurso"}
                options={recursos}
                style={styles.selectItem}
                setter={setRecurso}
                setterId={setUserId}
                value={recurso}
              />
            </div>
          </div>
          <div className={styles.escalarHeight}>
            <div
              onClick={() => {
                setEscalarSelected(false);
                setRecurso("");
              }}
              className={styles.editEscalarCancel}
            >
              <IoClose size={"2vw"} color={"white"} />
            </div>
            <div
              onClick={() => {
                updateTicket();
                setEscalarSelected(false);
              }}
              className={styles.editEscalarConfirm}
            >
              <HiCheck size={"2vw"} color={"white"} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Ticket;
