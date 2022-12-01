import SegmentoTarea from "./SegmentoTarea";
import SegmentoTareaMayor from "./SegmentoTareaMayor";

import { Link, animateScroll as scroll } from "react-scroll";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ContenedorTareas({ tareas, setTareaEditable }) {
  return (
    <div className={"task-element-main-container"}>
      <div className="task-element-container">
        {tareas?.map((tarea) => {
          return (
            <SegmentoTarea
              setTareaEditable={setTareaEditable}
              key={tarea.tareaDelParteDeHoraId}
              estadoTarea={tarea.estado}
              tarea={tarea}
            />
          );
        })}
      </div>
    </div>
  );

  var contenedorVacio = (
    <div className="task-element-container">
      <div>No hay tareas</div>
    </div>
  );
}

export default ContenedorTareas;
