import styles from "./../Styles/Soporte/Soporte.module.css";
import Ticket from "../Components/Ticket";
import Tickets from "./../Data/Tickets.json";
import Filtros from "../Components/Filtro/Filtros";

function Soporte() {
  return (
    <div className={styles.soporteContainer}>
      <Filtros />
      <div className={styles.tickets}>
        {Tickets.map((ticket) => {
          return <Ticket ticket={ticket} />;
        })}
      </div>
      <div></div>
    </div>
  );
}

export default Soporte;
