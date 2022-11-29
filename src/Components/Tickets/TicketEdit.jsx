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
import { useEffect, useState } from "react";
import axios from "axios";

function TicketEdit({ ticket, setEditSelected }) {
  const [title, setTitle] = useState(ticket.title);
  const [description, setDescription] = useState(ticket.description);
  const [status, setStatus] = useState(ticket.status);
  const [type, setType] = useState(ticket.type);
  const [origin, setOrigin] = useState(ticket.origin);
  const [sla, setSla] = useState(ticket.sla);
  const [clients, setClients] = useState([]);
  const [client, setClient] = useState(ticket.clientId);

  useEffect(() => {
    const getClients = async () => {
      var response = await axios.get(
        "https://anypoint.mulesoft.com/mocking/api/v1/sources/exchange/assets/754f50e8-20d8-4223-bbdc-56d50131d0ae/clientes-psa/1.0.0/m/api/clientes"
      );
      setClients(
        response.data.map((client) => {
          return { label: client.CUIT, value: client.CUIT };
        })
      );
    };
    getClients();
  }, []);

  const getOptions = (dato) => {
    return Filtros.find((e) => e.Nombre === dato).Options;
  };

  const updateTicket = async () => {
    await axios
      .put(
        `https://fiuba-memo1-api-soporte.azurewebsites.net/api/v1/tickets/${ticket.id}`,
        {
          title: title,
          description: description,
          status: status,
          type: type,
          origin: origin,
          sla: sla,
          clientId: client,
          userId: ticket.userId,
          areaId: ticket.areaId,
          taskId: ticket.taskId,
        }
      )
      .then(setEditSelected(false))
      .catch((error) => console.log(error));
  };

  return (
    <div className={styles.ticketContainerEdit}>
      <div className={styles.ticketEdit}>
        <div className={styles.sectionOne}>
          <div className={styles.titleSection + " " + styles.growTitle}>
            <input
              type={"text"}
              defaultValue={title}
              className={styles.input}
              onChange={(event) => setTitle(event.target.value)}
            />
            {type === "Consulta" ? (
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
              placeHolder={"Seleccione un tipo"}
              options={getOptions("Tipo")}
              style={styles.select}
              setter={setType}
              value={type}
            />
          </div>
          <div className={styles.descripcion}>
            <textarea
              type={"text"}
              defaultValue={description}
              className={styles.inputDescription}
              onChange={(event) => setDescription(event.target.value)}
            />
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
          <div className={styles.item + " " + styles.item3}>
            Cliente
            <TicketSelect
              placeHolder={"Seleccione un cliente"}
              options={clients}
              style={styles.selectEstado}
              setter={setClient}
              value={client}
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
        <div onClick={() => updateTicket()} className={styles.editConfirm}>
          <HiCheck size={"2vw"} color={"white"} />
        </div>
      </div>
    </div>
  );
}

export default TicketEdit;
