import { useState } from "react";
import { FaLongArrowAltUp, FaLongArrowAltDown } from "react-icons/fa";
import { BiSort } from "react-icons/bi";
import styles from "./../../../Styles/Proyectos/MenuOrden.module.css";

function OrdenItem({ name, setSortBy, order }) {
  const [selected, setSelected] = useState(0);

  const getIcon = () => {
    var component;

    if (selected === 0) {
      component = <BiSort size={"1.2vw"} color={"rgba(0, 53, 108, 1)"} />;
    } else if (selected === 1) {
      component = (
        <FaLongArrowAltDown size={"1.2vw"} color={"rgba(0, 53, 108, 1)"} />
      );
    } else {
      component = (
        <FaLongArrowAltUp size={"1.2vw"} color={"rgba(0, 53, 108, 1)"} />
      );
    }
    return component;
  };

  const handleClick = () => {
    if (selected === 2) {
      setSortBy([]);
      setSelected(0);
    } else {
      setSortBy([order, selected + 1]);
      setSelected(selected + 1);
    }
  };

  return (
    <div onClick={handleClick} className={styles.ordenItem}>
      {name}
      {getIcon()}
    </div>
  );
}

export default OrdenItem;
