import styles from "./../../../Styles/Soporte/MenuOrden.module.css";
import Orden from "../../../Data/Orden.json";
import OrdenItem from "./OrdenItem";

function MenuOrden({ setSortBy }) {
  return (
    <div className={styles.menuOrden}>
      {Orden.map((o) => {
        return (
          <OrdenItem
            key={o.id}
            setSortBy={setSortBy}
            name={o.Nombre}
            order={o.order}
          />
        );
      })}
    </div>
  );
}

export default MenuOrden;
