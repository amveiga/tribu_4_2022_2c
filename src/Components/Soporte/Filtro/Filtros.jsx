import { useState } from "react";
import styles from "./../../../Styles/Soporte/Filtros.module.css";
import { BiSort } from "react-icons/bi";
import { HiFilter, HiOutlineFilter } from "react-icons/hi";
import MenuFiltro from "./MenuFiltro";
import MenuOrden from "../Orden/MenuOrder";
import axios from "axios";
import ErrorPage from "../ErrorPage";

function Filtros({ setFiltros, setSortBy }) {
  const [filtroAbierto, setFiltroAbierto] = useState(false);
  const [ordenAbierto, setOrdenAbierto] = useState(false);
  const [clientId, setClientId] = useState("");
  const [status, setStatus] = useState("");
  const [sla, setSla] = useState("");
  const [type, setType] = useState("");
  const [origin, setOrigin] = useState("");
  const [error, setError] = useState(false);
  const [clients, setClients] = useState([]);

  const handleFilterClick = () => {
    getClients();
    setFiltroAbierto(!filtroAbierto);
    setOrdenAbierto(false);
  };

  const handleOrdenClick = () => {
    setOrdenAbierto(!ordenAbierto);
    setFiltroAbierto(false);
  };

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

  var component;

  if (error) {
    component = <ErrorPage />;
  } else {
    component = (
      <div className={styles.filtros}>
        <div
          className={filtroAbierto ? styles.filtroSelected : styles.filtro}
          onClick={handleFilterClick}
        >
          <div className={styles.textIcon}>
            {filtroAbierto ? (
              <HiFilter size={"1.5vw"} color={"rgba(106, 176, 249, 1)"} />
            ) : (
              <HiOutlineFilter size={"1.5vw"} color={"white"} />
            )}
            Filtro
          </div>
        </div>
        {filtroAbierto && (
          <MenuFiltro
            setFiltroAbierto={setFiltroAbierto}
            setFiltros={setFiltros}
            clientId={clientId}
            status={status}
            type={type}
            sla={sla}
            origin={origin}
            setClientId={setClientId}
            setStatus={setStatus}
            setSla={setSla}
            setType={setType}
            setOrigin={setOrigin}
            clients={clients}
          />
        )}
        <div
          className={ordenAbierto ? styles.ordenSelected : styles.orden}
          onClick={handleOrdenClick}
        >
          <div className={styles.textIcon}>
            <BiSort
              size={"1.5vw"}
              color={ordenAbierto ? "rgba(106, 176, 249, 1)" : "white"}
            />
            Orden
          </div>
        </div>
        {ordenAbierto && <MenuOrden setSortBy={setSortBy} />}
      </div>
    );
  }
  return component;
}

export default Filtros;
