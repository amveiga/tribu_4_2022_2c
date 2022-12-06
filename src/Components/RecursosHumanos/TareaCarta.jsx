import BotoneraCarta from "./BotoneraCarta";

function TareaCarta({tarea, setTareaEditable}){
    //console.log(setTareaEditable)
    return(
        <div className="task-card">
            <div className="task-card-title">{tarea.tipoDeTarea === "TAREA_PROYECTO" ? tarea.nombreProyecto : tarea.tipoDeTarea}</div>
            <div className="task-card-description">
                <p>{tarea.nombreTarea}</p>
                <p>{tarea.cantidadDeHorasTrabajadas} Hs</p>
            </div>
            {tarea.estado !== "APROBADO" ? <BotoneraCarta tarea={tarea} setTareaEditable={setTareaEditable}/> : ""}
        </div>
    )
}

export default TareaCarta;