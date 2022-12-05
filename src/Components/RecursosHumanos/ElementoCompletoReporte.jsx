function ElementoCompletoReporte(dato){
    //console.log(dato)
    return(
        <tr>
            <th className="type-task-grid" rowSpan={3}>Nombre del proyecto 2</th>
            <th className="task-grid">Tarea 5</th>
            <th className="time-grid">10 Hs</th>
            <th className="total-time-grid" rowSpan={3}>24 Hs</th>
        </tr>
    )
}

export default ElementoCompletoReporte;