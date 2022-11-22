import styles from "./../Styles/Soporte/Soporte.module.css";
import Ticket from "../Components/Tickets/Ticket";
import Tickets from "./../Data/Tickets.json";
import Filtros from "../Components/Filtro/Filtros";
import { FaPlus } from "react-icons/fa";

function Soporte() {
  return (
    <div className={styles.soporteContainer}>
      <Filtros />
      <div className={styles.tickets}>
        {Tickets.map((ticket) => {
          return <Ticket ticket={ticket} />;
        })}
      </div>
      <div className={styles.addButton}>
        <FaPlus size={"2vw"} color={"white"} />
      </div>
    </div>
  );
}

export default Soporte;
