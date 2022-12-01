import styles from "./../../../Styles/Proyectos/Select.module.css";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import { FaUser, FaWifi } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { BsExclamationCircleFill } from "react-icons/bs";
import { GrStatusGoodSmall } from "react-icons/gr";
import { MdContactSupport } from "react-icons/md";
import { useState } from "react";

function Select({ placeHolder, options, icon, style, setter, value }) {
  const [selected, setSelected] = useState(false);

  const handleClick = (val) => {
    setter(val);
    setSelected(false);
  };

  const getIcon = () => {
    var component;
    if (icon === "cliente") {
      component = <FaUser size={"1vw"} color={"rgba(0,53,108,1)"} />;
    } else if (icon === "estado") {
      component = <GrStatusGoodSmall size={"1vw"} color={"rgba(0,53,108,1)"} />;
    } else if (icon === "tipo") {
      component = <MdContactSupport size={"1vw"} color={"rgba(0,53,108,1)"} />;
    }
    return component;
  };

  const getIcons = () => {
    var component1;
    var component2 = (
      <HiChevronDown size={"1.5vw"} color={"rgba(0,53,108,1)"} />
    );
    if (selected) {
      component2 = <HiChevronUp size={"1.5vw"} color={"rgba(0,53,108,1)"} />;
    }
    if (value !== '') {
      component1 = (
        <IoClose
          onClick={() => setter("")}
          size={"1.5vw"}
          color={"rgba(0,53,108,1)"}
        />
      );
    }

    return (
      <div className={styles.icons}>
        {component1}
        {component2}
      </div>
    );
  };

  return (
    <div
      onMouseLeave={() => setSelected(false)}
      className={
        (selected ? styles.selected : styles.selectContainer) + " " + style
      }
    >
      <div className={styles.select} onClick={() => setSelected(!selected)}>
        {value === "" ? placeHolder : value}
        <div className={styles.icons}>{getIcons()}</div>
      </div>
      {selected && (
        <div className={styles.menu}>
          {options.map((option) => {
            return (
              <div
                onClick={() => {
                  handleClick(option.value);
                }}
                className={styles.option}
                key={option.value}
              >
                {option.label}
                {getIcon()}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Select;
