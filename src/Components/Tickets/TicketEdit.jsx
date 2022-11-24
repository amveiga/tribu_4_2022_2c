import {
  BsQuestionCircleFill,
  BsFillExclamationCircleFill,
} from "react-icons/bs";
import { HiCheck } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import styles from "./../../Styles/Soporte/Ticket.module.css";
import Filtros from "./../../Data/Filtros.json";
import TicketSelect from "./TicketSelect";

function TicketEdit({ ticket, setEditSelected }) {
  const getOptions = (dato) => {
    return Filtros.find((e) => e.Nombre === dato).Options;
  };

  return (
    <div className={styles.ticketContainerEdit}>
      <div className={styles.ticketEdit}>
        <div className={styles.sectionOne}>
          <div className={styles.titleSection}>
            <input
              type={"text"}
              defaultValue={ticket.titulo}
              className={styles.input}
            />
            {ticket.tipo === "Consulta" ? (
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
            )}
            <TicketSelect
              placeHolder={ticket.tipo}
              options={getOptions("Tipo")}
              style={styles.select}
            />
          </div>
          <div className={styles.descripcion}>
            <textarea
              type={"text"}
              defaultValue={ticket.descripcion}
              className={styles.inputDescription}
            />
          </div>
        </div>
        <div className={styles.sectionTwoEdit}>
          <div className={styles.item + " " + styles.item1}>
            Estado
            <TicketSelect
              placeHolder={ticket.estado}
              options={getOptions("Estado")}
              style={styles.selectEstado}
            />
          </div>
          <div className={styles.item + " " + styles.item2}>
            SLA
            <TicketSelect
              placeHolder={ticket.sla}
              options={getOptions("SLA")}
              style={styles.selectEstado}
            />
          </div>
          <div className={styles.item + " " + styles.item3}>
            Cliente
            <TicketSelect
              placeHolder={ticket.cliente}
              options={getOptions("Cliente")}
              style={styles.selectEstado}
            />
          </div>
          <div className={styles.item + " " + styles.item4}>
            Medio
            <TicketSelect
              placeHolder={ticket.medio}
              options={getOptions("Medio")}
              style={styles.selectEstado}
            />
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

export default TicketEdit;
