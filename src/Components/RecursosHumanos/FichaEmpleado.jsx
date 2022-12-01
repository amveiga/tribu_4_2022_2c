//import empleados from "../../Data/RecursosHumanos/empleados.json"

function FichaEmpleado({ empleado }) {
  return (
    <div>
      <div className="name-person">
        {empleado && (
          <p>
            {empleado.Nombre} {empleado.Apellido}
          </p>
        )}
      </div>
      <p className="id-person">Legajo: {empleado.legajo}</p>
    </div>
  );
}

export default FichaEmpleado;
