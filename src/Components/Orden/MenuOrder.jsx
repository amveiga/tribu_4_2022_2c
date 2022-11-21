import styles from "./../../Styles/Soporte/MenuOrden.module.css";
import Orden from "../../Data/Orden.json";
import OrdenItem from "./OrdenItem";

function MenuOrden() {
  return (
    <div className={styles.menuOrden}>
      {Orden.map((o) => {
        return <OrdenItem key={o.id} name={o.Nombre} />;
      })}
    </div>
  );
}

export default MenuOrden;
