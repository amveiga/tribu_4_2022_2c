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
    setFiltroActivado
    }) {
    const getStyle = (nombre) => {
        switch (nombre) {
        case "Cliente": return styles.filtro1;
        case "Estado": return styles.filtro2;
        case "Tipo": return styles.filtro3;
        }
    };

    const getSetter = (nombre) => {
        switch (nombre) {
            case "Cliente": return setClientId;
            case "Estado": return setStatus;
            case "Tipo": return setType;
        }
    };

    const getValue = (nombre) => {
        switch (nombre) {
            case "Cliente": return clientId;
            case "Estado": return status;
            case "Tipo": return type;
        }
    };

    const reset = () => {
        setClientId("");
        setStatus("");
        setType("");
    };

    const handleClickCancelar = () => {
        reset();
        setFiltros("");
        setFiltroAbierto(false);
        setFiltroActivado(true);
    }

    const filtrar = () => {
        var filtros = [
            clientId === "" ? "" : "clientId="+clientId,
            status === "" ? "" : "status="+  status,
            type === "" ? "" : "type=" + type
        ];
        setFiltros(filtros.filter(filtro => (filtro !== "")).join("&"));
        setFiltroAbierto(false);
        setFiltroActivado(true);
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
                    handleClickCancelar();
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
