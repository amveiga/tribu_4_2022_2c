import { useState } from "react";
import Ticket from "./Ticket";
import TicketEdit from "./TicketEdit";
import styles from "./../../../Styles/Soporte/Ticket.module.css";

function TicketSelector({ ticket, error, setError }) {
  const [editSelected, setEditSelected] = useState(false);

  return (
    <div className={styles.ticketSelector}>
      {editSelected ? (
        <TicketEdit
          ticket={ticket}
          setEditSelected={setEditSelected}
          error={error}
          setError={setError}
        />
      ) : (
        <Ticket
          ticket={ticket}
          editSelected={editSelected}
          setEditSelected={setEditSelected}
          error={error}
          setError={setError}
        />
      )}
    </div>
  );
}

export default TicketSelector;
