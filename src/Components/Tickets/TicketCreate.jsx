import { HiCheck } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import styles from "./../../Styles/Soporte/Ticket.module.css";
import TicketSelect from "./TicketSelect";
import Filtros from "./../../Data/Filtros.json";
import axios from "axios";
import { useState } from "react";

function TicketCreate({ setCrearTicket }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");
  const [origin, setOrigin] = useState("");
  const [sla, setSla] = useState("");
  const [clientId, setClientId] = useState("");
  const [clientProductId, setClientProductId] = useState("");
  var fechaCreacion = new Date();
  var ultimaModificacion = new Date();

  const getOptions = (dato) => {
    return Filtros.find((e) => e.Nombre === dato).Options;
  };

  const createTicket = () => {
    axios
      .post(
        "https://fiuba-memo1-api-soporte.azurewebsites.net/api/v1/tickets",
        {
          title: title,
          description: description,
          status: status,
          type: type,
          origin: origin,
          sla: sla,
          clientId: clientId,
          clientProductId: clientProductId,
          userId: "",
          areaId: "",
        }
      )
      .catch((error) => alert(error));
  };

  return (
    <div className={styles.ticketCreateContainer}>
      <div className={styles.ticketCreate}>
        <div className={styles.sectionOne}>
          <div
            className={
              styles.titleSection + " " + styles.growTitle + " " + styles.column
            }
          >
            <div className={styles.title}>Titulo</div>
            <input
              type={"text"}
              placeholder={"Ingrese un titulo"}
              className={styles.inputTitulo}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>
          <div className={styles.descripcion + " " + styles.marginTop}>
            <div className={styles.title}>Descripción</div>
            <textarea
              type={"text"}
              placeholder={"Ingrese una descripción del ticket"}
              className={styles.inputDescription}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>
          <div className={styles.fechas}>
            <div className={styles.fecha + " " + styles.start}>
              Fecha de creación:
              <div className={styles.fechaText}>
                {fechaCreacion.toLocaleDateString()}
              </div>
            </div>
            <div className={styles.fecha + " " + styles.end}>
              Última modificación:
              <div className={styles.fechaText}>
                {ultimaModificacion.toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.sectionTwoEdit}>
          <div className={styles.item + " " + styles.item1}>
            Estado
            <TicketSelect
              placeHolder={"Seleccione un estado"}
              options={getOptions("Estado")}
              style={styles.selectEstado}
              setter={setStatus}
              value={status}
            />
          </div>
          <div className={styles.item + " " + styles.item2}>
            SLA
            <TicketSelect
              placeHolder={"Seleccione un SLA"}
              options={getOptions("SLA")}
              style={styles.selectEstado}
              setter={setSla}
              value={sla}
            />
          </div>

          {/* Obtener clientId */}
          <div className={styles.item + " " + styles.item3}>
            Cliente
            <TicketSelect
              placeHolder={"Seleccione un cliente"}
              options={getOptions("Cliente")}
              style={styles.selectEstado}
              value={clientId}
            />
          </div>

          <div className={styles.item + " " + styles.item4}>
            Medio
            <TicketSelect
              placeHolder={"Seleccione un medio"}
              options={getOptions("Medio")}
              style={styles.selectEstado}
              setter={setOrigin}
              value={origin}
            />
          </div>
          <div className={styles.item + " " + styles.item5}>
            Tipo
            <TicketSelect
              placeHolder={"Seleccione un tipo"}
              options={getOptions("Tipo")}
              style={styles.selectEstado}
              setter={setType}
              value={type}
            />
          </div>
        </div>
      </div>
      <div className={styles.editSelected + " " + styles.createSelected}>
        <div
          onClick={() => {
            setCrearTicket(false);
          }}
          className={styles.editCancel}
        >
          <IoClose size={"2vw"} color={"white"} />
        </div>
        <div
          onClick={() => {
            createTicket();
            setCrearTicket(false);
          }}
          className={styles.editConfirm}
        >
          <HiCheck size={"2vw"} color={"white"} />
        </div>
      </div>
    </div>
  );
}

export default TicketCreate;
