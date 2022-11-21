import styles from "./../Styles/Soporte/Soporte.module.css";
import { BiSort } from "react-icons/bi";
import { HiFilter, HiOutlineFilter } from "react-icons/hi";
import { useState } from "react";
import MenuFiltro from "../Components/Filtro/MenuFiltro";
import MenuOrden from "../Components/Orden/MenuOrder";

function Soporte() {
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
        {ordenAbierto && <MenuOrden />}
      </div>
      <div></div>
      <div></div>
    </div>
  );
}

export default Soporte;
