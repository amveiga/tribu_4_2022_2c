import empleados from "../../Data/RecursosHumanos/empleados.json"

function FichaEmpleado(empleadoID){
    console.log(empleadoID.empleadoID);
    var empleadoActual;
    empleados.map((empl => {
        if(empl["legajo"] == empleadoID.empleadoID){
            empleadoActual = empl;
        }
    }))

    console.log(empleadoActual);

    return (
    <div>
        <p className="name-person">{empleadoActual["Nombre"]} {empleadoActual["Apellido"]}</p>
        <p className="title-person">Junior Dev de CRM</p>
        <p className="id-person">Legajo: {empleadoID.empleadoID}</p>
    </div>
    )
}

export default FichaEmpleado;