import axios from "axios";
import { useEffect, useState } from "react";

function ElementoCarga({
  setFecha,
  setTipo,
  setProyecto,
  setTarea,
  setCantidadHoras,
  setDescripcion,
  proyecto,
  tarea,
  cantidadHoras,
  tipo,
  descripcion,
  fecha,
}) {
  const [proyectos, setProyectos] = useState([]);
  const [tareas, setTareas] = useState([]);
  const [tareasFiltradas, setTareasFiltradas] = useState([]);

  const getTareas = (id) => {
    setTareasFiltradas(tareas.filter((tarea) => tarea.projectID === id));
  };

  useEffect(() => {
    const getProyectos = async () => {
      var response = await axios.get(
        "https://squad11-proyectos.onrender.com/api/projects"
      );
      setProyectos(response.data);
    };
    const getTareas = async () => {
      var response = await axios.get(
        "https://squad11-proyectos.onrender.com/api/tasks"
      );
      setTareas(response.data);
    };

    getTareas();
    getProyectos();
  }, []);

  const Seccion = ({ value }) => {
    if (value === "tarea_proyecto") {
      return (
        <div className="div-loader ">
          <div className="sub-div-loader">
            <div className="div-section">
              <select
                name="project-task"
                id="project-task"
                className="hours-select"
                value={proyecto}
                onChange={(event) => {
                  setProyecto(event.target.value);
                  getTareas(event.target.value);
                }}
              >
                <option disabled selected value="">
                  Nombre del proyecto
                </option>
                {proyectos.map((p) => {
                  return (
                    <option key={p._id} value={p._id}>
                      {p.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="div-section">
              <select
                name="project-task"
                id="project-task"
                className="hours-select"
                value={tarea}
                onChange={(event) => setTarea(event.target.value)}
              >
                <option disabled selected value="">
                  Nombre de la tarea
                </option>
                {tareasFiltradas.map((t) => {
                  return (
                    <option key={t._id} value={t._id}>
                      {t.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="div-section">
              <div className="work-mode-div">
                <input
                  className="input"
                  type="number"
                  placeholder="Cantidad de horas"
                  defaultValue={cantidadHoras}
                  onChange={(event) => setCantidadHoras(event.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      );
    } else if (value === "licencia") {
      return (
        <div className="div-loader ">
          <div className="sub-div-loader">
            <div className="div-section">
              <select
                name="project-task"
                id="project-task"
                className="hours-select"
                value={descripcion}
                onChange={(event) => setDescripcion(event.target.value)}
              >
                <option disabled selected value="">
                  Tipo de licencia
                </option>
                <option value="Licencia anual por vacaciones">
                  Licencia anual por vacaciones
                </option>
                <option value="Licencia por enfermedad">
                  Licencia por enfermedad
                </option>
                <option value="Licencia por enfermedad de familiar a cargo">
                  Licencia por enfermedad de familiar a cargo
                </option>
                <option value="Licencia especial por nacimiento de hijo/a">
                  Licencia especial por nacimiento de hijo/a
                </option>
                <option value="Licencia especial por matrimonio">
                  Licencia especial por matrimonio
                </option>
                <option
                  value="Licencia especial por fallecimiento de esposo/a, concubino/a,
                  hijos/as, padres"
                >
                  Licencia especial por fallecimiento de esposo/a, concubino/a,
                  hijos/as, padres
                </option>
                <option value="Licencia especial por fallecimiento de hermano/a">
                  Licencia especial por fallecimiento de hermano/a
                </option>
                <option value="Licencia especial por rendir examen">
                  Licencia especial por rendir examen
                </option>
                <option value="Licencia por maternidad">
                  Licencia por maternidad
                </option>
                <option value="Licencia por adopción">
                  Licencia por adopción
                </option>
                <option value="Licencia diaria">Licencia diaria</option>
                <option value="Licencia por accidente de trabajo">
                  Licencia por accidente de trabajo
                </option>
                <option value="Licencia por donación de sangre">
                  Licencia por donación de sangre
                </option>
                <option value="Justificación por razones de fuerza mayor">
                  Justificación por razones de fuerza mayor
                </option>
                <option value="Licencia especial por violencia de género">
                  Licencia especial por violencia de género
                </option>
              </select>
            </div>
            <div className="div-section">
              <div className="work-mode-div">
                <input
                  className="input"
                  type="number"
                  placeholder="Cantidad de horas"
                  defaultValue={cantidadHoras}
                  onChange={(event) => setCantidadHoras(event.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      );
    } else if (value === "incidencia") {
      return (
        <div className="div-loader ">
          <div className="sub-div-loader">
            <div className="div-section">
              <select
                name="project-task"
                id="project-task"
                className="hours-select"
                value={proyecto}
                onChange={(event) => {
                  setProyecto(event.target.value);
                  getTareas(event.target.value);
                }}
              >
                <option disabled selected value="">
                  Nombre del proyecto
                </option>
                {proyectos.map((p) => {
                  return (
                    <option key={p._id} value={p._id}>
                      {p.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="div-section">
              <div className="work-mode-div">
                <input
                  className="input"
                  type="number"
                  placeholder="Cantidad de horas"
                  defaultValue={cantidadHoras}
                  onChange={(event) => setCantidadHoras(event.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      );
    } else if (value === "guardia") {
      return (
        <div className="div-loader ">
          <div className="div-section">
            <div className="work-mode-div">
              <input
                className="input"
                type="number"
                placeholder="Cantidad de horas"
                defaultValue={cantidadHoras}
                onChange={(event) => setCantidadHoras(event.target.value)}
              />
            </div>
          </div>
        </div>
      );
    } else if (value === "administrativa") {
      return (
        <div className="div-loader">
          <div className="sub-div-loader">
            <div className="div-section">
              <select
                name="project-task"
                id="project-task"
                className="hours-select"
                value={descripcion}
                onChange={(event) => setDescripcion(event.target.value)}
              >
                <option disabled selected value="">
                  Especificación
                </option>
                <option key={1} value={"Reunion"}>
                  Reunion
                </option>
                <option key={2} value={"Capacitación"}>
                  Capacitación
                </option>
                <option key={3} value={"Curso"}>
                  Curso
                </option>
              </select>
            </div>
            <div className="div-section">
              <div className="work-mode-div">
                <input
                className="input"
                  type="number"
                  placeholder="Cantidad de horas"
                  defaultValue={cantidadHoras}
                  onChange={(event) => setCantidadHoras(event.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <div className="carga-element">
      <div className="work-mode-div">
        <input
          type="date"
          className="calendar"
          value={fecha}
          onChange={(event) =>
            setFecha(event.target.value).toISOString().substring(0, 10)
          }
        />
      </div>
      <select
        name="task-type"
        id="task-type"
        className="hours-select"
        onChange={(event) => {
          setTipo(event.target.value);
        }}
      >
        <option disabled selected value="">
          Tipo de tarea
        </option>
        <option value="tarea_proyecto">Proyecto</option>
        <option value="incidencia">Incidencia</option>
        <option value="administrativa">Administrativa</option>
        <option value="guardia">Guardia</option>
        <option value="licencia">Licencia</option>
      </select>

      <Seccion value={tipo} />
    </div>
  );
}

export default ElementoCarga;
