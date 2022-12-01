import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

function Empleado(empleado) {
  let navigate = useNavigate();

  const verTareas = (empleadoID) => {
    navigate("/recursos-humanos/" + empleado.empleado.legajo + "/tareas");
  };

  return (
    <div>
      <div className="list-element" onClick={() => verTareas()}>
        <div>
          <p>{empleado.empleado.Nombre}</p>
        </div>
        <div>
          <p>{empleado.empleado.Apellido}</p>
        </div>
        <div>
          <p>{empleado.empleado.legajo}</p>
        </div>
      </div>
    </div>
  );
}

export default Empleado;
