//import empleados from "../../Data/RecursosHumanos/empleados.json"

function FichaEmpleado(empleado){
    return (
    <div>
        <p className="name-person">{empleado.empleado["Nombre"]} {empleado.empleado["Apellido"]}</p>
        <p className="id-person">Legajo: {empleado.empleado["legajo"]}</p>
    </div>
    )
}

export default FichaEmpleado;