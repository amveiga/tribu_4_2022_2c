import styles from "./../../Styles/Proyectos/Select.module.css";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { useState } from "react";

function ProjectSelect({ placeHolder, options, style }) {
  const [selected, setSelected] = useState(false);
  const [value, setValue] = useState(placeHolder);

  const handleClick = (value) => {
    setValue(value);
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
    if (value !== placeHolder) {
      component1 = (
        <IoClose
          onClick={() => setValue(placeHolder)}
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
        {value}
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
              >
                {option.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ProjectSelect;
