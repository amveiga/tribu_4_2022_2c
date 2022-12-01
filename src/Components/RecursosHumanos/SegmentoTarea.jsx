import BotoneraTareas from "./BotoneraTareas";

function SegmentoTarea(parametro){
    console.log(parametro)
    
    var miNombreTarea = parametro.nombreTarea;
    var cantidadHoras = parametro.miDato.cantidadDeHorasTrabajadas + " Hs";

    console.log(parametro.nombreTarea)

    function mostrarModoEditar(){
        var editMenu = document.getElementById("edit");
        editMenu.classList.remove("hidden");
    }

    var segmento = (
        <div className="task-element">
            <div className="sub-task-element">

                <div className="task-div">
                    <div className="task-name-div">
                        <p className="task-name">{miNombreTarea}</p>
                    </div>
                </div>

                <p className="hours-amount">{cantidadHoras}</p>

                <BotoneraTareas estadoTarea={parametro.estadoTarea}/>
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