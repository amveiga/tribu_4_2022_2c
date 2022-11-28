import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";

function Empleado(empleado) {
    let navigate = useNavigate();

    function verTareas(hoar){
        navigate("/recursos-humanos/" + hoar + "/tareas");
    }

    return (
    <div className="list-element" onClick={verTareas(empleado.empleado.legajo)}>
        <div><p>{empleado.empleado.Nombre}</p></div>
        <div><p>{empleado.empleado.Apellido}</p></div>
        <div><p>{empleado.empleado.legajo}</p></div>
    </div>
)}

export default Empleado;


