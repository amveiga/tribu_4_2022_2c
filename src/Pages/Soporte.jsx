import styles from "./../Styles/Soporte/Soporte.module.css";
import { BiSort } from "react-icons/bi";
import { HiFilter, HiOutlineFilter } from "react-icons/hi";
import { useState } from "react";
import MenuFiltro from "../Components/Filtro/MenuFiltro";

function Soporte() {
  const [filtroAbierto, setFiltroAbierto] = useState(false);
  const [ordenAbierto, setOrdenAbierto] = useState(false);

  const handleFilterClick = () => {
    setFiltroAbierto(!filtroAbierto);
  };

  return (
    <div className={styles.soporteContainer}>
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
        {filtroAbierto && <MenuFiltro setFiltroAbierto={setFiltroAbierto} />}
        <div className={styles.orden}>
          <div className={styles.textIcon}>
            <BiSort size={"1.5vw"} color={"white"} />
            Orden
          </div>
        </div>
      </div>
      <div></div>
      <div></div>
    </div>
  );
}

export default Soporte;
