import { useState } from "react";
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
import { MdEdit, MdDelete } from "react-icons/md";
import styles from "./../../Styles/Soporte/Ticket.module.css";

function Ticket({ ticket, editSelected, setEditSelected }) {
  const [typeHovered, setTypeHovered] = useState(false);

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

  return (
    <div className={styles.container}>
      <div className={styles.ticketContainer}>
        <div className={styles.ticket}>
          <div className={styles.sectionOne}>
            <div className={styles.titleSection}>
              {ticket.titulo}
              {ticket.tipo === "Consulta" ? (
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
                      ticket.tipo === "Consulta"
                        ? "rgba(106, 176, 249, 1)"
                        : "red"
                    }
                  />
                  <div
                    className={
                      (ticket.tipo === "Consulta" ? styles.blue : styles.red) +
                      " " +
                      styles.showTypeText
                    }
                  >
                    {ticket.tipo}
                  </div>
                </div>
              )}
            </div>
            <div className={styles.descripcion}>{ticket.descripcion}</div>
            <div className={styles.footerSection}>
              {ticket.medio === "Telefono" ? (
                <HiPhone size={"1.2vw"} color={"rgba(0,53,108,1)"} />
              ) : (
                <HiMail size={"1.4vw"} color={"rgba(0,53,108,1)"} />
              )}
              <div className={styles.marginLeft}>{ticket.cliente}</div>
              <div className={styles.marginLeft}>-</div>
              <div className={styles.marginLeft}>
                Creado el {ticket.fechaCreacion}
              </div>
              <div className={styles.marginLeft}>-</div>
              <div className={styles.marginLeft}>
                Última modificación el {ticket.ultimaModificacion}
              </div>
            </div>
          </div>
          <div className={styles.sectionTwo}>
            <div className={styles.estado + " " + getState(ticket.estado)}>
              {ticket.estado}
            </div>
            <div className={styles.item}>
              {ticket.sla}
              <BsCircleFill size={"1.3vw"} color={getSLA(ticket.sla)} />
            </div>
            <div className={styles.item}>
              {ticket.usuario === "" ? "-" : ticket.usuario}
              <FiUser size={"1.5vw"} color={"rgba(0,53,108,1)"} />
            </div>
            <div className={styles.item}>
              {ticket.area === "" ? "-" : ticket.area}
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
          <div className={styles.delete}>
            <MdDelete size={"1.5vw"} color={"rgba(0,53,108,1)"} />
          </div>
        )}
      </div>
      {/* <div className={styles.comentarios}>Comentarios</div> */}
    </div>
  );
}

export default Ticket;
