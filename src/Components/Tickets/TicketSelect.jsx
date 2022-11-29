import styles from "./../../Styles/Soporte/Select.module.css";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { useState } from "react";

function TicketSelect({ placeHolder, options, style, setter, value }) {
  const [selected, setSelected] = useState(false);

  const handleClick = (val) => {
    setter(val);
    setSelected(false);
  };

  const getIcons = () => {
    var component1;
    var component2 = (
      <HiChevronDown size={"1.5vw"} color={"rgba(0,53,108,1)"} />
    );
    if (selected) {
      component2 = <HiChevronUp size={"1.5vw"} color={"rgba(0,53,108,1)"} />;
    }
    if (value !== "") {
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
                className={styles.optionTicket}
                key={option.label}
              >
                {option.value}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default TicketSelect;
