import SegmentoTarea from "./SegmentoTarea";

function ContenedorTareas(estadoTarea){
    return (
        <div className="task-element-main-container">
            <div className="task-element-container">
                <SegmentoTarea estadoTarea={estadoTarea.estadoTarea}/>
                <div className="vertical-divisor">
                </div>
                <SegmentoTarea estadoTarea={estadoTarea.estadoTarea}/>
                <SegmentoTarea estadoTarea={estadoTarea.estadoTarea}/>
            </div>

            <div className="task-element-container">
                <SegmentoTarea estadoTarea={estadoTarea.estadoTarea}/>
                <div className="vertical-divisor">
                </div>
                <SegmentoTarea estadoTarea={estadoTarea.estadoTarea}/>
                <SegmentoTarea estadoTarea={estadoTarea.estadoTarea}/>
            </div>
            
        </div>
    );

    var contenedorVacio = (
        <div className="task-element-container">
                <div>No hay tareas</div>
        </div>
    )
}

export default ContenedorTareas;