import Filtros from "./../../../Data/FiltrosProyectos.json";
import Select from "./Select";
import styles from "./../../../Styles/Proyectos/MenuFiltro.module.css";

function MenuFiltro({
  setFiltroAbierto,
  setFiltros,
  clientId,
  status,
  type,
  setClientId,
  setStatus,
  setType,
  clients,
}) {
  const getStyle = (nombre) => {
    var style;
    if (nombre === "Cliente") {
      style = styles.filtro1;
    } else if (nombre === "Estado") {
      style = styles.filtro2;
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
    } else if (nombre === "Tipo") {
      setter = setType;
    }
    return setter;
  };

  const getValue = (nombre) => {
    var value;
    if (nombre === "Cliente") {
      value = clientId;
    } else if (nombre === "Estado") {
      value = status;
    } else if (nombre === "Tipo") {
      value = type;
    }
    return value;
  };

  const reset = () => {
    setClientId("");
    setStatus("");
    setType("");
  };

  const filtrar = () => {
    var filtros = [
      clientId === "" ? "" : "clientId=" + clientId,
      status === "" ? "" : "status=" + status,
      type === "" ? "" : "type=" + type,
    ];
    setFiltros("Se filtro");
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
