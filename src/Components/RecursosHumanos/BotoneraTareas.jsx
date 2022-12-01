import axios from "axios";

function BotoneraTareas({ estadoTarea, tarea, setTareaEditable }) {
  var estadosEnQueSeMuestra = [
    "BORRADOR",
    "VALIDACION_PENDIENTE",
    "DESAPROBADO",
  ];

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

  if (estadosEnQueSeMuestra.includes(estadoTarea)) {
    return (
      <div className="buttons-work-div">
        <div className="edit-button" onClick={mostrarModoEditar}>
          <p>Editar</p>
        </div>
        <div className="delete-button" onClick={handleEliminar}>
          <p>Eliminar</p>
        </div>
      </div>
    );
  } else {
    return;
  }
}

export default BotoneraTareas;
