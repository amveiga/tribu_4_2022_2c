import SegmentoTarea from "./SegmentoTarea";

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
}

export default ContenedorTareas;
