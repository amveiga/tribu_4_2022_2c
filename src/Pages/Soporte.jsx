import styles from "./../Styles/Soporte/Soporte.module.css";
import Filtros from "../Components/Soporte/Filtro/Filtros";
import { FaPlus } from "react-icons/fa";
import TicketSelector from "../Components/Soporte/Tickets/TicketSelector";
import { useEffect, useState } from "react";
import TicketCreate from "../Components/Soporte/Tickets/TicketCreate";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactLoading from "react-loading";
import ErrorPage from "../Components/Soporte/ErrorPage";

function Soporte() {
  const [addButtonClicked, setAddButtonClicked] = useState(false);
  const [rotateActivate, setRotateActivate] = useState(false);
  const [optionActivate, setOptionActivate] = useState(false);
  const [crearTicket, setCrearTicket] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [filtros, setFiltros] = useState("");
  const [sortBy, setSortBy] = useState([]);
  const [loading, setLoading] = useState(true);

  const ticket = axios.create({
    baseURL: "https://fiuba-memo1-api-soporte.azurewebsites.net/api/v1/tickets",
  });

  useEffect(() => {
    const sort = (data) => {
      switch (sortBy[0]) {
        case "lastModifiedDate":
          if (sortBy[1] === 1) {
            setTickets(
              data.sort((a, b) =>
                a.lastModifiedDate > b.lastModifiedDate ? 1 : -1
              )
            );
          } else if (sortBy[1] === 2) {
            setTickets(
              data.sort((a, b) =>
                a.lastModifiedDate < b.lastModifiedDate ? 1 : -1
              )
            );
          } else {
            setTickets(data);
          }
          break;
        case "status":
          if (sortBy[1] === 1) {
            setTickets(data.sort((a, b) => (a.status > b.status ? 1 : -1)));
          } else if (sortBy[1] === 2) {
            setTickets(data.sort((a, b) => (a.status < b.status ? 1 : -1)));
          } else {
            setTickets(data);
          }
          break;
        case "sla":
          if (sortBy[1] === 1) {
            setTickets(data.sort((a, b) => (a.sla > b.sla ? 1 : -1)));
          } else if (sortBy[1] === 2) {
            setTickets(data.sort((a, b) => (a.sla < b.sla ? 1 : -1)));
          } else {
            setTickets(data);
          }
          break;
        case "type":
          if (sortBy[1] === 1) {
            setTickets(data.sort((a, b) => (a.type > b.type ? 1 : -1)));
          } else if (sortBy[1] === 2) {
            setTickets(data.sort((a, b) => (a.type < b.type ? 1 : -1)));
          } else {
            setTickets(data);
          }
          break;
        default:
          if (sortBy[1] === 1) {
            setTickets(
              data.sort((a, b) => (a.createdDate > b.createdDate ? 1 : -1))
            );
          } else if (sortBy[1] === 2) {
            setTickets(
              data.sort((a, b) => (a.createdDate < b.createdDate ? 1 : -1))
            );
          } else {
            setTickets(data);
          }
          break;
      }
    };

    const getTickets = async () => {
      var response;
      if (filtros !== "") {
        response = await axios
          .get(
            "https://fiuba-memo1-api-soporte.azurewebsites.net/api/v1/tickets?" +
              filtros
          )
          .then(
            setTimeout(() => {
              setLoading(false);
            }, 2000)
          )
          .catch((error) => {
            return <ErrorPage />;
          });
      } else {
        response = await ticket
          .get()
          .then(
            setTimeout(() => {
              setLoading(false);
            }, 2000)
          )
          .catch((error) => {
            return <ErrorPage />;
          });
      }
      if (sortBy.length > 1) {
        sort(response.data);
      } else {
        setTickets(response.data);
      }
    };
    getTickets();
  }, [ticket, filtros, sortBy.length, sortBy]);

  return (
    <div className={styles.container}>
      {loading ? (
        <div className={styles.loading}>
          <ReactLoading
            type={"bars"}
            color={"rgba(0,53,108,1"}
            height={"10%"}
            width={"10%"}
          />
        </div>
      ) : (
        <div className={styles.soporteContainer}>
          <Filtros setSortBy={setSortBy} setFiltros={setFiltros} />
          <div className={styles.tickets}>
            {tickets.length === 0 ? (
              <div className={styles.noTickets}>No hay tickets cargados</div>
            ) : (
              tickets.map((ticket) => {
                return <TicketSelector key={ticket.id} ticket={ticket} />;
              })
            )}
          </div>
          <div
            className={
              addButtonClicked
                ? styles.addButton + " " + styles.clicked
                : rotateActivate
                ? styles.addButton + " " + styles.rotate
                : styles.addButton
            }
            onClick={() => {
              setAddButtonClicked(!addButtonClicked);
              setRotateActivate(true);
              setOptionActivate(!optionActivate);
            }}
          >
            <FaPlus
              size={"2vw"}
              color={addButtonClicked ? "rgba(0,53,108,1)" : "white"}
            />
          </div>
          {addButtonClicked && (
            <div className={styles.options}>
              <div className={styles.option}>
                <Link className={styles.link} to={"/soporte/reporteTickets"}>
                  Reporte de tickets
                </Link>
              </div>
              <div
                className={styles.option}
                onClick={() => setCrearTicket(true)}
              >
                Crear ticket
              </div>
            </div>
          )}
          {crearTicket && <TicketCreate setCrearTicket={setCrearTicket} />}
        </div>
      )}
    </div>
  );
}

export default Soporte;
