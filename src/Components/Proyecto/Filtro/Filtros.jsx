import { useState } from "react";
import styles from "./../../../Styles/Proyectos/Filtros.module.css";
import { BiSort } from "react-icons/bi";
import { HiFilter, HiOutlineFilter } from "react-icons/hi";
import MenuFiltro from "./MenuFiltro";
import MenuOrden from "../Orden/MenuOrden"

function Filtros({ 
    setFiltros,
    setSortBy,
    error,
    setError,
    client,
    idClient,
    type,
    status,
    setClientId,
    setType,
    setStatus }) {

  const [filtroAbierto, setFiltroAbierto] = useState(false);
  const [ordenAbierto, setOrdenAbierto] = useState(false);
  
  const handleFilterClick = () => {
    setFiltroAbierto(!filtroAbierto);
    setOrdenAbierto(false);
  };

  const handleOrdenClick = () => {
    setOrdenAbierto(!ordenAbierto);
    setFiltroAbierto(false);
  };

  return (
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
          clientId={idClient}
          status={status}
          type={type}
          setClientId={setClientId}
          setStatus={setStatus}
          setType={setType}
          clients={client}
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

export default Filtros;
