import empleados from "../../Data/RecursosHumanos/empleados.json"

function FichaEmpleado(empleadoID){
    var empleadoActual;
    empleados.map((empl => {
        if(empl["legajo"] == empleadoID.empleadoID){
            empleadoActual = empl;
        }
    }))

    return (
    <div>
        <p className="name-person">{empleadoActual["Nombre"]} {empleadoActual["Apellido"]}</p>
        <p className="id-person">Legajo: {empleadoID.empleadoID}</p>
    </div>
    )
}

export default FichaEmpleado;