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
  DeleteTarea,
  DeleteTicket,
  GetComentarios,
  GetRecurso,
  GetRecursos,
  GetTarea,
  UpdateTicket,
} from "../../../Utils/SoporteApi";
import CrearTarea from "../CreateTarea";

function Ticket({
  ticket,
  editSelected,
  setEditSelected,
  setError,
  setUpdate,
}) {
  const [typeHovered, setTypeHovered] = useState(false);
  const [escalarSelected, setEscalarSelected] = useState(false);
  const [recurso, setRecurso] = useState("");
  const [recursoAux, setRecursoAux] = useState("");
  const [userId, setUserId] = useState(ticket.userId);
  const [tarea, setTarea] = useState("");
  const [tareaId, setTareaId] = useState(ticket.taskId);
  const [tareaSelected, setTareaSelected] = useState(false);
  const [comentarios, setComentarios] = useState([]);
  const [recursos, setRecursos] = useState([]);
  const [updateComentarios, setUpdateComentarios] = useState(true);
  const [updateTarea, setUpdateTarea] = useState(false);

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
    setUpdate(true);
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
      userId: userId.toString(),
      taskId: ticket.taskId,
    };
    await UpdateTicket(ticket.id, body);
    setRecurso(recursoAux);
    setUpdate(true);
  };

  const getRecursos = async () => {
    var rec = await GetRecursos();
    if (rec.status === 200) {
      setError(false);
      setRecursos(
        rec.data.map((t) => {
          return { label: t.legajo, value: t.Nombre + " " + t.Apellido };
        })
      );
      if (ticket.userId === "") {
        setRecurso("");
      } else {
        var recurso = rec.data.find((r) => {
          return r.legajo.toString() === ticket.userId;
        });
        setRecursoAux(recurso.Nombre + " " + recurso.Apellido);
      }
    } else {
      setError(true);
    }
  };

  const deleteTarea = async () => {
    await DeleteTarea(tareaId, setError);
  };

  const handleTareaClick = () => {
    if (tareaId === "") {
      getRecursos();
      setTareaSelected(true);
    } else {
      deleteTarea();
      setTarea("");
      setTareaId("");
      setUpdateTarea(true);
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

    const getRecurso = async () => {
      var recurso = await GetRecurso(ticket.userId, setError);
      if (recurso.status === 200) {
        setError(false);
        setRecurso(recurso.data.Nombre + " " + recurso.data.Apellido);
      }
      return;
    };

    const getTarea = async () => {
      var tarea = await GetTarea(ticket.taskId, setError);
      if (tarea.status === 200) {
        setError(false);
        setTarea(tarea.data.name);
      }
      return;
    };

    const agregarTarea = async () => {
      var body = {
        title: ticket.title,
        description: ticket.description,
        status: ticket.status,
        type: ticket.type,
        origin: ticket.origin,
        sla: ticket.sla,
        clientId: ticket.clientId,
        userId: userId.toString(),
        taskId: tareaId,
      };
      await UpdateTicket(ticket.id, body);
      setRecurso(recursoAux);
      setUpdateTarea(false);
      setUpdate(true);
    };

    if (updateComentarios) {
      setUpdateComentarios(false);
    }

    if (ticket.userId !== "") {
      getRecurso();
    }

    if (updateTarea) {
      agregarTarea();
    }

    if (ticket.taskId !== "" && tareaId !== "") {
      getTarea();
    }

    getComentarios();
  }, [
    recursoAux,
    setError,
    setUpdate,
    tareaId,
    ticket.clientId,
    ticket.description,
    ticket.id,
    ticket.origin,
    ticket.sla,
    ticket.status,
    ticket.taskId,
    ticket.title,
    ticket.type,
    ticket.userId,
    updateComentarios,
    updateTarea,
    userId,
  ]);

  return (
    <div className={styles.container}>
      <div className={styles.ticketContainer}>
        <div className={styles.ticket}>
          <div className={styles.sectionOne}>
            <div className={styles.headerSection}>
              <div className={styles.titleSection}>
                <div className={styles.titleTicket}>{ticket.title}</div>
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
                handleTareaClick();
              }}
              className={styles.tarea}
            >
              <div className={styles.showTarea}>
                {tarea === "" ? "Agregar tarea" : tarea}
              </div>
              {tareaId === "" ? (
                <FaPlus size={"1.5vw"} color={"white"} />
              ) : (
                <IoClose size={"1.8vw"} color={"white"} />
              )}
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
        setUpdateComentarios={setUpdateComentarios}
        comentarios={comentarios.length === 0 ? [] : comentarios}
        id={ticket.id}
      />
      {tareaSelected && (
        <CrearTarea
          recursos={recursos}
          recursoAux={recursoAux}
          setRecursoAux={setRecursoAux}
          setUserId={setUserId}
          setTareaSelected={setTareaSelected}
          setTareaId={setTareaId}
          recurso={recurso}
          userId={userId}
          setError={setError}
          setUpdateTarea={setUpdateTarea}
        />
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
                setter={setRecursoAux}
                setterId={setUserId}
                value={recursoAux}
              />
            </div>
          </div>
          <div className={styles.escalarHeight}>
            <div
              onClick={() => {
                setEscalarSelected(false);
                setRecurso(recurso);
                setRecursoAux(recurso);
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
