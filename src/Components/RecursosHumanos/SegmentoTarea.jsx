import BotoneraTareas from "./BotoneraTareas";

function SegmentoTarea(estadoTarea){
    var nombreTarea = "Tarea 1";
    var cantidadHoras = "5Hs";

    

    function mostrarModoEditar(){
        var editMenu = document.getElementById("edit");
        editMenu.classList.remove("hidden");
    }

    var segmento = (
        <div className="task-element">
            <div className="sub-task-element">

                <div className="task-div">
                    <div className="task-name-div">
                        <p className="task-name">Tarea 1</p>
                        <div className="status-dot grey"></div>
                    </div>
                </div>

                <p className="hours-amount">Cantidad de horas</p>

                <BotoneraTareas estadoTarea={estadoTarea.estadoTarea}/>
            </div>
        </div>
    );

    var segmentoEditar = (
        <div className="task-element">
            <div className="sub-task-element">

                <div className="task-div">
                    <div className="task-name-div">
                        <input className="task-name-edit" type="text" value={nombreTarea} />
                        <div className="status-dot grey"></div>
                    </div>
                </div>

                <input className="hours-amount-edit" type="text" value={cantidadHoras}/>

                <BotoneraTareas estadoTarea={estadoTarea.estadoTarea}/>
            </div>
        </div>
    );

    var segmentoVacio = (
        <div className="task-element">
            <div className="sub-task-empty-element">
                <p>No hay subtareas disponibles</p>
            </div>
        </div>
    );

    var segmentoActual = segmento;

    return segmentoActual;
}

export default SegmentoTarea;