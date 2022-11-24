import styles from "./../Styles/Soporte/Soporte.module.css";
import Tickets from "./../Data/Tickets.json";
import Filtros from "../Components/Filtro/Filtros";
import { FaPlus } from "react-icons/fa";
import TicketSelector from "../Components/Tickets/TicketSelector";

function Soporte() {
  return (
    <div className={styles.soporteContainer}>
      <Filtros />
      <div className={styles.tickets}>
        {Tickets.map((ticket) => {
          return <TicketSelector key={ticket.id} ticket={ticket} />;
        })}
      </div>
      <div className={styles.addButton}>
        <FaPlus size={"2vw"} color={"white"} />

      </div>
    </div>
  );
}

export default Soporte;
