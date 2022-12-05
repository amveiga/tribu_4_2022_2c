function ElementoParcialReporteTrabajadores(dato){
    console.log(dato)
    if(dato.dato.tipoDeTarea === "TAREA_PROYECTO"){
        return(
            <tr>
                <th className="task-grid">{dato.dato.nombreTarea}</th>
                <th className="time-grid">{dato.dato.cantidadDeHorasTrabajadas} Hs</th>
            </tr>
        )
    }
    else{
        return(
            <tr>
                <th className="task-grid">{dato.dato.descripcion}</th>
                <th className="time-grid">{dato.dato.cantidadDeHorasTrabajadas} Hs</th>
            </tr>
        )
    }
    
}

export default ElementoParcialReporteTrabajadores;