// import Calendario from "../Calendario";
import Filtros from "./../../Data/Filtros.json";
import Select from "./Select";
import styles from "./../../Styles/Soporte/MenuFiltro.module.css";

function MenuFiltro({ setFiltroAbierto }) {
  const getStyle = (nombre) => {
    var style;
    if (nombre === "Cliente") {
      style = styles.filtro1;
    } else if (nombre === "Estado") {
      style = styles.filtro2;
    } else if (nombre === "SLA") {
      style = styles.filtro3;
    } else if (nombre === "Tipo") {
      style = styles.filtro4;
    } else {
      style = styles.filtro5;
    }
    return style;
  };

  return (
    <div className={styles.menuFiltro}>
      {/* <div className={styles.filtrado}>
        Fecha de Creación
        <Calendario />
      </div>
      <div className={styles.filtrado}>
        Última Modificación
        <Calendario />
      </div> */}
      {Filtros.map((filtro) => {
        return (
          <div
            key={filtro.Nombre}
            className={getStyle(filtro.Nombre) + " " + styles.filtrado}
          >
            {filtro.Nombre}
            <Select
              placeHolder={filtro.Placeholder}
              options={filtro.Options}
              icon={filtro.Icon}
            />
          </div>
        );
      })}
      <div className={styles.submitButtons}>
        <div
          className={styles.cancelButton}
          onClick={() => {
            setFiltroAbierto(false);
          }}
        >
          Cancelar
        </div>
        <div className={styles.applyButton}>Aplicar</div>
      </div>
    </div>
  );
}

export default MenuFiltro;
