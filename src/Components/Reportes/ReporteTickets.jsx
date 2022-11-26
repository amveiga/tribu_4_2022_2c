import Tickets from "./../../Data/Tickets.json";
import Filtros from "./../../Data/Filtros.json";
import styles from "./../../Styles/Soporte/Reportes.module.css";
import PieChart from "./PieChart";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";

function ReporteTickets() {
  const getLabels = (label) => {
    var labels = Filtros.find((filter) => filter.Nombre === label).Options.map(
      (option) => {
        return option.value + ": " + getCantidad(label, option.value);
      }
    );
    return labels;
  };

  const getCantidad = (label, value) => {
    var cantidad;
    if (label === "Estado") {
      cantidad = Tickets.filter((ticket) => ticket.estado === value).length;
    } else if (label === "SLA") {
      cantidad = Tickets.filter((ticket) => ticket.sla === value).length;
    } else if (label === "Tipo") {
      cantidad = Tickets.filter((ticket) => ticket.tipo === value).length;
    } else {
      cantidad = Tickets.filter((ticket) => ticket.medio === value).length;
    }

    return cantidad;
  };

  const getData = (label) => {
    var cantidades;
    if (label === "Estado") {
      cantidades = [
        getCantidad(label, "Abierto"),
        getCantidad(label, "Análisis"),
        getCantidad(label, "Derivado"),
        getCantidad(label, "Resuelto"),
        getCantidad(label, "Cancelado"),
      ];
    } else if (label === "SLA") {
      cantidades = [
        getCantidad(label, "Bajo"),
        getCantidad(label, "Medio"),
        getCantidad(label, "Alto"),
        getCantidad(label, "Crítico"),
      ];
    } else if (label === "Tipo") {
      cantidades = [
        getCantidad(label, "Consulta"),
        getCantidad(label, "Reclamo"),
      ];
    } else {
      cantidades = [getCantidad(label, "Teléfono"), getCantidad(label, "Mail")];
    }

    return cantidades;
  };

  return (
    <div className={styles.reporteContainer}>
      <div className={styles.totalTicketsContainer}>
        <div className={styles.back}>
          <Link className={styles.backlink} to={"/soporte"}>
            <IoIosArrowBack size={"1.5vw"} color={"rgba(0,53,108,1)"} />
            Back
          </Link>
        </div>
        <div className={styles.totalTickets}>
          Total tickets: {Tickets.length}
        </div>
      </div>
      <div className={styles.chartSection}>
        <PieChart
          label={"Estado"}
          data={getData("Estado")}
          labels={getLabels("Estado")}
        />
        <PieChart
          label={"SLA"}
          data={getData("SLA")}
          labels={getLabels("SLA")}
        />
      </div>
      <div className={styles.chartSection}>
        <PieChart
          label={"Tipo"}
          data={getData("Tipo")}
          labels={getLabels("Tipo")}
        />
        <PieChart
          label={"Medio"}
          data={getData("Medio")}
          labels={getLabels("Medio")}
        />
      </div>
    </div>
  );
}

export default ReporteTickets;
