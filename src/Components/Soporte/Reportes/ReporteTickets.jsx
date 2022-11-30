import Filtros from "./../../../Data/Filtros.json";
import styles from "./../../../Styles/Soporte/Reportes.module.css";
import PieChart from "./PieChart";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ErrorPage from "../ErrorPage";
import ReactLoading from "react-loading";

function ReporteTickets() {
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const ticket = axios.create({
    baseURL: "https://fiuba-memo1-api-soporte.azurewebsites.net/api/v1/tickets",
  });

  useEffect(() => {
    const getTickets = async () => {
      const response = await ticket.get().catch((error) => setError(true));
      if (response.status === 200) {
        setError(false);
        setTickets(response.data);
        setLoading(false);
      } else {
        setError(true);
      }
    };
    getTickets();
  }, [ticket]);

  const getLabels = (label) => {
    var labels = Filtros.find((filter) => filter.Nombre === label).Options.map(
      (option) => {
        return getCantidad(label, option.value) === 0
          ? ""
          : option.value + ": " + getCantidad(label, option.value);
      }
    );
    return labels;
  };

  const getCantidad = (label, value) => {
    var cantidad;
    if (label === "Estado") {
      cantidad = tickets.filter((ticket) => ticket.status === value).length;
    } else if (label === "SLA") {
      cantidad = tickets.filter((ticket) => ticket.sla === value).length;
    } else if (label === "Tipo") {
      cantidad = tickets.filter((ticket) => ticket.type === value).length;
    } else {
      cantidad = tickets.filter((ticket) => ticket.origin === value).length;
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

  var component;

  if (error) {
    component = <ErrorPage />;
  } else if (loading) {
    component = (
      <div className={styles.loading}>
        <ReactLoading
          type={"bars"}
          color={"rgba(0,53,108,1"}
          height={"10%"}
          width={"10%"}
        />
      </div>
    );
  } else {
    component = (
      <div className={styles.reporteContainer}>
        <div className={styles.totalTicketsContainer}>
          <div className={styles.back}>
            <Link className={styles.backlink} to={"/soporte"}>
              <IoIosArrowBack size={"1.5vw"} color={"rgba(0,53,108,1)"} />
              Back
            </Link>
          </div>
          <div className={styles.totalTickets}>
            Total tickets: {tickets.length}
          </div>
        </div>
        {tickets.length === 0 ? (
          <div className={styles.noTickets}>No hay tickets cargados</div>
        ) : (
          <div className={styles.showCharts}>
            <div className={styles.chartSection}>
              <PieChart
                label={"Estado"}
                data={getData("Estado")}
                labels={getLabels("Estado")}
                colorScale={[
                  "#ff9900",
                  "#0085ff",
                  "#ad00ff",
                  "#1dcc2e",
                  "#ff0000",
                ]}
              />
              <PieChart
                label={"SLA"}
                data={getData("SLA")}
                labels={getLabels("SLA")}
                colorScale={["#A8FF64", "#FFED47", "#FFB155", "#FF6262"]}
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
        )}
      </div>
    );
  }

  return component;
}

export default ReporteTickets;
