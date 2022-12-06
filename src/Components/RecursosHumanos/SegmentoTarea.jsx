import axios from "axios";
import { useEffect, useState } from "react";
import BotoneraTareas from "./BotoneraTareas";

function SegmentoTarea({ estadoTarea, tarea, setTareaEditable }) {
  const [task, setTarea] = useState();
  const [proyectName, setProyectName] = useState("");
  var cantidadHoras = tarea.cantidadDeHorasTrabajadas + " horas";

  useEffect(() => {
    /* este get ya no va */
    const getTarea = async () => {
      if (tarea.tareaId !== "") {
        var res = await axios.get(
          "https://squad11-proyectos.onrender.com/api/tasks/" + tarea.tareaId
        );
        if (res.data.projectID !== "") {
          setProyect(res.data.projectID);
        }
        setTarea(res.data);
      }
    };
    console.log(tarea, task);
    getTarea();
  }, []);

  const setProyect = async (proyectId) => {
    var res = await axios.get(
      "https://squad11-proyectos.onrender.com/api/projects/" + proyectId
    );
    setProyectName(res.data.name);
  };

  function mostrarModoEditar() {
    var editMenu = document.getElementById("edit");
    editMenu.classList.remove("hidden");
  }

  var segmento = (
    <div className="task-element">
      <div className="sub-task-element">
        <div className="task-div">
          <div className="task-name-div">
            <p className="task-name">
              {tarea.descripcion === "" ? task?.name : tarea?.descripcion}
            </p>
          </div>
          <p className="hours-amount">{proyectName}</p>
        </div>

        <p className="hours-amount">{cantidadHoras}</p>

        <BotoneraTareas
          estadoTarea={estadoTarea}
          tarea={tarea}
          setTareaEditable={setTareaEditable}
        />
      </div>
    </div>
  );

  var segmentoActual = segmento;

  return segmentoActual;
}

export default SegmentoTarea;
