import Calendario from "../Calendario";
import Filtros from "./../../Data/Filtros.json";
import Select from "./Select";
import styles from "./../../Styles/Soporte/MenuFiltro.module.css";

function MenuFiltro({ setFiltroAbierto }) {
  return (
    <div className={styles.menuFiltro}>
      <div className={styles.filtrado}>
        Fecha de Creación
        <Calendario />
      </div>
      <div className={styles.filtrado}>
        Última Modificación
        <Calendario />
      </div>
      {Filtros.map((filtro) => {
        return (
          <div key={filtro.Nombre} className={styles.filtrado}>
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
