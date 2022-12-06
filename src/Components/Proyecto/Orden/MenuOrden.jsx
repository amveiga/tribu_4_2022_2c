import styles from "../../../Styles/Proyectos/MenuOrden.module.css"
import Orden from "../../../Data/OrdenProyectos.json";
import OrdenItem from "./OrdenItem";

function MenuOrden({ setSortBy, setOrdenActivado }) {
  return (
    <div className={styles.menuOrden}>
      {Orden.map((o) => {
        return (
          <OrdenItem
            key={o.id}
            setSortBy={setSortBy}
            name={o.Nombre}
            order={o.order}
            setOrdenActivado={setOrdenActivado}
          />
        );
      })}
    </div>
  );
}

export default MenuOrden;