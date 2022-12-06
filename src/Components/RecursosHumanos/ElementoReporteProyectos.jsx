function ElementoReporteProyectos(dato, horasTotal, setHorasTotal){
    //console.log(dato)
    
    return(
        <tr>
            <th>{dato.dato.name}</th>
            <th>{dato.dato.invertedHours} Hs</th>
        </tr>
    )
    
}

export default ElementoReporteProyectos;