import { KeyboardDatePicker } from "@material-ui/pickers";
import { format } from "date-fns/esm";
import { useEffect } from "react";
import { useState } from "react";
import { HiCheck } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { GetProyectos, PostTarea } from "../../Utils/SoporteApi";
import styles from "./../../Styles/Soporte/CrearTarea.module.css";
import TicketSelect from "./Tickets/TicketSelect";

function CrearTarea({
  setTareaSelected,
  recursos,
  recurso,
  recursoAux,
  setRecursoAux,
  setUserId,
  userId,
  setTareaId,
  setError,
  setUpdateTarea,
}) {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [initialDate, setInitialDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [proyectos, setProyectos] = useState([]);
  const [proyecto, setProyecto] = useState("");
  const [proyectoId, setProyectoId] = useState("");

  useEffect(() => {
    const getProyectos = async () => {
      var response = await GetProyectos(setError);

      if (response.status === 200) {
        setError(false);
        setProyectos(
          response.data.map((proyecto) => {
            return { label: proyecto._id, value: proyecto.name };
          })
        );
      } else {
        setError(true);
      }
    };
    getProyectos();
  }, [setError]);

  const agregarTarea = async () => {
    var body = {
      name: titulo,
      description: descripcion,
      idealInitDate: format(initialDate, "MM/dd/yyyy"),
      idealEndDate: format(endDate, "MM/dd/yyyy"),
      responsible: [{ id: userId }],
      projectID: proyectoId,
    };
    var response = await PostTarea(body);
    if (response.status === 200) {
      setTareaId(response.data._id);
      setUpdateTarea(true);
    }
    setTareaSelected(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.tareaContainer}>
        <div className={styles.sectionOne}>
          <div
            className={
              styles.titleSection + " " + styles.growTitle + " " + styles.column
            }
          >
            <div className={styles.title}>Titulo</div>
            <input
              type={"text"}
              placeholder={"Ingrese un titulo"}
              className={styles.inputTitulo}
              onChange={(event) => setTitulo(event.target.value)}
            />
          </div>
          <div className={styles.descripcion + " " + styles.marginTop}>
            <div className={styles.title}>Descripción</div>
            <textarea
              type={"text"}
              placeholder={"Ingrese una descripción del ticket"}
              className={styles.inputDescription}
              onChange={(event) => setDescripcion(event.target.value)}
            />
          </div>
        </div>
        <div className={styles.sectionTwoEdit}>
          <div className={styles.item + " " + styles.item1}>
            <div className={styles.selectTitle}>Proyecto</div>
            <TicketSelect
              placeHolder={"Seleccione un proyecto"}
              options={proyectos}
              style={styles.selectItem}
              setter={setProyecto}
              setterId={setProyectoId}
              value={proyecto}
            />
          </div>
          <div className={styles.item + " " + styles.item2}>
            <div className={styles.selectTitle}>Recurso</div>
            <TicketSelect
              placeHolder={"Seleccione un recurso"}
              options={recursos}
              style={styles.selectItem}
              setter={setRecursoAux}
              setterId={setUserId}
              value={recursoAux}
            />
          </div>
          <div className={styles.calendarios}>
            <div className={styles.itemDate + " " + styles.item3}>
              <KeyboardDatePicker
                autoOk
                variant="inline"
                inputVariant="outlined"
                format="dd/MM/yyyy"
                value={initialDate}
                label={"Fecha inicio"}
                onChange={setInitialDate}
                InputAdornmentProps={{ position: "start" }}
                SelectProps={{ style: { backgroundColor: "red" } }}
                inputProps={{
                  style: {
                    fontSize: "1vw",
                    height: "2vh",
                    width: "100%",
                    justifyContent: "space-between",
                  },
                }}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </div>
            <div className={styles.itemDate + " " + styles.item4}>
              <KeyboardDatePicker
                autoOk
                variant="inline"
                inputVariant="outlined"
                format="dd/MM/yyyy"
                value={endDate < initialDate ? initialDate : endDate}
                label={"Fecha fin"}
                InputAdornmentProps={{ position: "start" }}
                onChange={setEndDate}
                inputProps={{
                  style: {
                    fontSize: "1vw",
                    height: "2vh",
                    width: "100%",
                    justifyContent: "space-between",
                  },
                }}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.tareaSelected}>
        <div
          className={styles.cancel}
          onClick={() => {
            setTareaSelected(false);
            setRecursoAux(recurso);
          }}
        >
          <IoClose size={"2vw"} color={"white"} />
        </div>
        <div
          onClick={() => {
            agregarTarea();
          }}
          className={styles.confirm}
        >
          <HiCheck size={"2vw"} color={"white"} />
        </div>
      </div>
    </div>
  );
}

export default CrearTarea;
