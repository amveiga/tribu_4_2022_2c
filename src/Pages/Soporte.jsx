import styles from "./../Styles/Soporte/Soporte.module.css";
import Filtros from "../Components/Soporte/Filtro/Filtros";
import { FaPlus } from "react-icons/fa";
import TicketSelector from "../Components/Soporte/Tickets/TicketSelector";
import { useEffect, useState } from "react";
import TicketCreate from "../Components/Soporte/Tickets/TicketCreate";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";
import ErrorPage from "../Components/Soporte/ErrorPage";
import { GetTickets } from "../Utils/SoporteApi";

function Soporte() {
  const [addButtonClicked, setAddButtonClicked] = useState(false);
  const [rotateActivate, setRotateActivate] = useState(false);
  const [optionActivate, setOptionActivate] = useState(false);
  const [crearTicket, setCrearTicket] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [filtros, setFiltros] = useState("");
  const [sortBy, setSortBy] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const sortMinToMax = (data) => {
    switch (sortBy[0]) {
      case "lastModifiedDate":
        setTickets(
          data.sort((a, b) =>
            a.lastModifiedDatetime > b.lastModifiedDatetime ? 1 : -1
          )
        );
        break;
      case "status":
        setTickets(data.sort((a, b) => (a.status > b.status ? 1 : -1)));
        break;
      case "sla":
        setTickets(data.sort((a, b) => (a.sla > b.sla ? 1 : -1)));
        break;
      case "type":
        setTickets(data.sort((a, b) => (a.type > b.type ? 1 : -1)));
        break;
      default:
        setTickets(
          data.sort((a, b) => (a.createdDatetime > b.createdDatetime ? 1 : -1))
        );
        break;
    }
  };

  const sortMaxToMin = (data) => {
    switch (sortBy[0]) {
      case "lastModifiedDate":
        setTickets(
          data.sort((a, b) =>
            a.lastModifiedDatetime > b.lastModifiedDatetime ? -1 : 1
          )
        );
        break;
      case "status":
        setTickets(data.sort((a, b) => (a.status > b.status ? -1 : 1)));
        break;
      case "sla":
        setTickets(data.sort((a, b) => (a.sla > b.sla ? -1 : 1)));
        break;
      case "type":
        setTickets(data.sort((a, b) => (a.type > b.type ? -1 : 1)));
        break;
      default:
        setTickets(
          data.sort((a, b) => (a.createdDatetime > b.createdDatetime ? -1 : 11))
        );
        break;
    }
  };

  const sort = (data) => {
    if (sortBy[1] === 1) {
      sortMinToMax(data);
    } else {
      sortMaxToMin(data);
    }
  };

  useEffect(() => {
    const getTicketsEffect = async () => {
      var response = await GetTickets(setLoading, setError, filtros);
      if (response.status !== 200) {
        setError(true);
      } else {
        setError(false);
        if (sortBy.length === 0) {
          setTickets(response.data);
        } else {
          sort(response.data);
        }
      }
    };
    getTicketsEffect();
  });

  var component;

  if (error) {
    component = <ErrorPage />;
  } else {
    component = (
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
            <Filtros
              setSortBy={setSortBy}
              setFiltros={setFiltros}
              error={error}
              setError={setError}
            />
            <div className={styles.tickets}>
              {tickets.length === 0 ? (
                <div className={styles.noTickets}>No hay tickets cargados</div>
              ) : (
                tickets.map((ticket) => {
                  return (
                    <TicketSelector
                      error={error}
                      setError={setError}
                      key={ticket.id}
                      ticket={ticket}
                    />
                  );
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
            {crearTicket && (
              <TicketCreate
                error={error}
                setError={setError}
                setCrearTicket={setCrearTicket}
              />
            )}
          </div>
        )}
      </div>
    );
  }

  return component;
}

export default Soporte;
