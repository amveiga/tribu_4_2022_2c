import { HiCheck } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import styles from "./../../../Styles/Soporte/Ticket.module.css";
import TicketSelect from "./TicketSelect";
import Filtros from "./../../../Data/Filtros.json";
import axios from "axios";
import { useEffect, useState } from "react";
import ErrorPage from "../ErrorPage";

function TicketCreate({ setCrearTicket }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");
  const [origin, setOrigin] = useState("");
  const [sla, setSla] = useState("");
  const [client, setClient] = useState("");
  const [clients, setClients] = useState([]);
  const [error, setError] = useState(false);
  var fechaCreacion = new Date();
  var ultimaModificacion = new Date();

  const getOptions = (dato) => {
    return Filtros.find((e) => e.Nombre === dato).Options;
  };

  useEffect(() => {
    const getClients = async () => {
      var response = await axios
        .get(
          "https://anypoint.mulesoft.com/mocking/api/v1/sources/exchange/assets/754f50e8-20d8-4223-bbdc-56d50131d0ae/clientes-psa/1.0.0/m/api/clientes"
        )
        .catch((error) => setError(true));

      if (response.status === 200) {
        setError(false);
        setClients(
          response.data.map((client) => {
            return { label: client.CUIT, value: client.CUIT };
          })
        );
      } else {
        setError(true);
      }
    };
    getClients();
  }, []);

  const createTicket = () => {
    axios.post(
      "https://fiuba-memo1-api-soporte.azurewebsites.net/api/v1/tickets",
      {
        title: title,
        description: description,
        status: status,
        type: type,
        origin: origin,
        sla: sla,
        clientId: client,
        userId: "",
        taskId: "",
      }
    );
  };

  var component;

  if (error) {
    component = <ErrorPage />;
  } else {
    component = (
      <div className={styles.ticketCreateContainer}>
        <div className={styles.ticketCreate}>
          <div className={styles.sectionOne}>
            <div
              className={
                styles.titleSection +
                " " +
                styles.growTitle +
                " " +
                styles.column
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

  return component;
}

export default TicketCreate;
