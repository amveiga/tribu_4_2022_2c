function BotoneraTareas(estadoTarea){
    var estadosEnQueSeMuestra = ["BORRADOR", "PENDIENTE", "DESAPROBADO"];

    function mostrarModoEditar(){
        var editMenu = document.getElementById("edit");
        editMenu.classList.remove("hidden");
    }

    if(estadosEnQueSeMuestra.includes(estadoTarea.estadoTarea)){
        return (
            <div className="buttons-work-div">
                <div className="edit-button" onClick={mostrarModoEditar}>
                    <p>Editar</p>
                </div>
                <div className="delete-button">
                    <p>Eliminar</p>
                </div>
            </div>
        );
    }
    else{
        return;
    }
    
}

export default BotoneraTareas;