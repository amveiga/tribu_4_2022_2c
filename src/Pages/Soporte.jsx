import styles from "./../Styles/Soporte/Soporte.module.css";
import Tickets from "./../Data/Tickets.json";
import Filtros from "../Components/Filtro/Filtros";
import { FaPlus } from "react-icons/fa";
import TicketSelector from "../Components/Tickets/TicketSelector";
import { useState } from "react";
import TicketCreate from "../Components/Tickets/TicketCreate";
import { Link } from "react-router-dom";

function Soporte() {
  const [addButtonClicked, setAddButtonClicked] = useState(false);
  const [rotateActivate, setRotateActivate] = useState(false);
  const [optionActivate, setOptionActivate] = useState(false);
  const [crearTicket, setCrearTicket] = useState(false);

  return (
    <div className={styles.soporteContainer}>
      <Filtros />
      <div className={styles.tickets}>
        {Tickets.map((ticket) => {
          return <TicketSelector key={ticket.id} ticket={ticket} />;
        })}
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
          <div className={styles.option}>
            <Link className={styles.link} to={"/soporte/reporteModificaciones"}>
              Reporte de modificaciones
            </Link>
          </div>
          <div className={styles.option} onClick={() => setCrearTicket(true)}>
            Crear ticket
          </div>
        </div>
      )}
      {crearTicket && <TicketCreate setCrearTicket={setCrearTicket} />}
    </div>
  );
}

export default Soporte;
