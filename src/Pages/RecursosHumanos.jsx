import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import styles from "./../Styles/RecursosHumanos/Workers.css";


function RecursosHumanos() {
  let navigate = useNavigate();

  function verTareas(){
    navigate("/recursos-humanos/tareas");
  }

  return (
    <div className="body">
      <p className="trabajadores-separator">Trabajadores</p>
      <div className="workers-list">
        <div className="header-list">
          <div><p>Nombre</p></div>
          <div><p>Apellido</p></div>
          <div><p>Legajo</p></div>
        </div>
        <div className="list-element">
          <div><p>Mario</p></div>
          <div><p>Mendoza</p></div>
          <div><p>1</p></div>
        </div>
        <div className="list-element">
          <div><p>Maria</p></div>
          <div><p>Perez</p></div>
          <div><p>2</p></div>
        </div>
        <div className="list-element">
          <div><p>Patricio</p></div>
          <div><p>Gaona</p></div>
          <div><p>3</p></div>
        </div>
        <div className="list-element" onClick={verTareas}>
          <div><p>Juan</p></div>
          <div><p>Gonzalez</p></div>
          <div><p>4</p></div>
        </div>
      </div>
    </div>
  );
}

export default RecursosHumanos;
