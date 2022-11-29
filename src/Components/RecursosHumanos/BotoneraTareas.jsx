function BotoneraTareas(estadoTarea){
    var estadosEnQueSeMuestra = ["BORRADOR", "PENDIENTE", "DESAPROBADO"];

    if(estadosEnQueSeMuestra.includes(estadoTarea.estadoTarea)){
        return (
            <div className="buttons-work-div">
                <div className="edit-button" >
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