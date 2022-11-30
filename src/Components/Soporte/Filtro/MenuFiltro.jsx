// import Calendario from "../Calendario";
import Filtros from "./../../../Data/Filtros.json";
import Select from "./Select";
import styles from "./../../../Styles/Soporte/MenuFiltro.module.css";

function MenuFiltro({
  setFiltroAbierto,
  setFiltros,
  clientId,
  status,
  sla,
  type,
  origin,
  setClientId,
  setStatus,
  setSla,
  setType,
  setOrigin,
  clients,
}) {
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

  const getSetter = (nombre) => {
    var setter;
    if (nombre === "Cliente") {
      setter = setClientId;
    } else if (nombre === "Estado") {
      setter = setStatus;
    } else if (nombre === "SLA") {
      setter = setSla;
    } else if (nombre === "Tipo") {
      setter = setType;
    } else {
      setter = setOrigin;
    }
    return setter;
  };

  const getValue = (nombre) => {
    var value;
    if (nombre === "Cliente") {
      value = clientId;
    } else if (nombre === "Estado") {
      value = status;
    } else if (nombre === "SLA") {
      value = sla;
    } else if (nombre === "Tipo") {
      value = type;
    } else {
      value = origin;
    }
    return value;
  };

  const reset = () => {
    setClientId("");
    setStatus("");
    setSla("");
    setType("");
    setOrigin("");
  };

  const filtrar = () => {
    var filtros = [
      clientId === "" ? "" : "clientId=" + clientId,
      status === "" ? "" : "status=" + status,
      sla === "" ? "" : "sla=" + sla,
      type === "" ? "" : "type=" + type,
      origin === "" ? "" : "origin=" + origin,
    ];
    setFiltros(filtros.filter((filtro) => filtro !== "").join("&"));
    setFiltroAbierto(false);
  };

  return (
    <div className={styles.menuFiltro}>
      {Filtros.map((filtro) => {
        return (
          <div
            key={filtro.Nombre}
            className={getStyle(filtro.Nombre) + " " + styles.filtrado}
          >
            {filtro.Nombre}
            <Select
              placeHolder={filtro.Placeholder}
              options={filtro.Nombre === "Cliente" ? clients : filtro.Options}
              icon={filtro.Icon}
              setter={getSetter(filtro.Nombre)}
              value={getValue(filtro.Nombre)}
            />
          </div>
        );
      })}
      <div className={styles.submitButtons}>
        <div
          className={styles.cancelButton}
          onClick={() => {
            setFiltros("");
            reset();
            setFiltroAbierto(false);
          }}
        >
          Cancelar
        </div>
        <div onClick={() => filtrar()} className={styles.applyButton}>
          Aplicar
        </div>
      </div>
    </div>
  );
}

export default MenuFiltro;
