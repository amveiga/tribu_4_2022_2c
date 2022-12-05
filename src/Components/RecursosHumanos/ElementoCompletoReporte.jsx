function ElementoCompletoReporte(cantidadElementos, dato, horasSumadas){
    //console.log(cantidadElementos)
    if(cantidadElementos.dato.tipoDeTarea === "TAREA_PROYECTO"){
        return(
            <tr>
                <th className="type-task-grid" rowSpan={cantidadElementos.cantidadElementos}>{cantidadElementos.dato.nombreProyecto}</th>
                <th className="task-grid">{cantidadElementos.dato.nombreTarea}</th>
                <th className="time-grid">{cantidadElementos.dato.cantidadDeHorasTrabajadas} Hs</th>
                <th className="total-time-grid" rowSpan={cantidadElementos.cantidadElementos}>{cantidadElementos.horasSumadas} Hs</th>
            </tr>
            )
    }
    else{
        return(
            <tr>
                <th className="type-task-grid" rowSpan={cantidadElementos.cantidadElementos}>{cantidadElementos.dato.tipoDeTarea}</th>
                <th className="task-grid">{cantidadElementos.dato.descripcion}</th>
                <th className="time-grid">{cantidadElementos.dato.cantidadDeHorasTrabajadas} Hs</th>
                <th className="total-time-grid" rowSpan={cantidadElementos.cantidadElementos}>{cantidadElementos.horasSumadas} Hs</th>
            </tr>
            )
    }
}

export default ElementoCompletoReporte;