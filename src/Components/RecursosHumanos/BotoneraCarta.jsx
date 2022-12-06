import imagenNewModificar from "./../../Img/RecursosHumanos/modificar_icon_new.png";
import imagenNewBorrar from "./../../Img/RecursosHumanos/borrar_icon_new.png";

import axios from "axios";

function BotoneraCarta({ tarea, setTareaEditable }){

    function mostrarModoEditar() {
        var editMenu = document.getElementById("edit");
        setTareaEditable(tarea);
        editMenu.classList.remove("hidden");
    }

    async function handleEliminar() {
        await axios.delete(
            "https://squad1220222c-production.up.railway.app/recursos/tareaDelParteDeHoraId/" +
            tarea.tareaDelParteDeHoraId
        );
    }

    return(
        <div className="task-card-buttons">
            <div onClick={mostrarModoEditar} title="Modificar tarea">
                <img src={imagenNewModificar} alt="" />
            </div>
            <div onClick={handleEliminar} title="Borrar tarea">
                <img src={imagenNewBorrar} alt="" />
            </div>
        </div>
    )
}

export default BotoneraCarta