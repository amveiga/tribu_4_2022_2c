import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import styles from "./../Styles/RecursosHumanos/RecursosHumanos.css";
import buttonStyle from "./../Styles/RecursosHumanos/Botones.css";

import trabajadores from "./../Img/RecursosHumanos/personas_icon.png";
import reportes from "./../Img/RecursosHumanos/reportes_icon.png";
import { useEffect } from "react";
import axios from "axios";

import EmpleadoElement from "../Components/RecursosHumanos/Empleado";

import Empleados from "../Data/RecursosHumanos/empleados.json";

function RecursosHumanos() {
  let navigate = useNavigate();

  function verTareas(){
    navigate("/recursos-humanos/tareas");
  }

  function generarReporteTrabajador(){
    navigate("/recursos-humanos/GenerarReportesTrabajador");
  }

  function generarReporteProyecto(){
    navigate("/recursos-humanos/GenerarReportesProyecto");
  }

  /*useEffect(( => {
    axios
      .get(
        "https://anypoint.mulesoft.com/mocking/api/v1/sources/exchange/assets/754f50e8-20d8-4223-bbdc-56d50131d0ae/recursos-psa/1.0.0/m/api/recursos"
      )
      .then((response) => {
        console.log(response.data);
        set
      })
      )
  }))*/

  return (
    <div className="body">
      <div className="recursos-humanos-container trabajadores">
        <div className="recursos-humanos-title">
          <p className="section-title">Trabajadores</p>
          <img className="recursos-icon" src={trabajadores} alt="" />
        </div>
        <div className="workers-list">
          <div className="header-list">
            <div><p>Nombre</p></div>
            <div><p>Apellido</p></div>
            <div><p>Legajo</p></div>
          </div>
          {Empleados.map((empleado) => {
              return <EmpleadoElement key={empleado.id} empleado={empleado} />
            })}
        </div>
      </div>
      <div className="recursos-humanos-container reportes">
        <div className="recursos-humanos-title">
          <p className="section-title">Reportes</p>
          <img className="recursos-icon" src={reportes} alt="" />
        </div>
        
        <div className="recursos-button" onClick={generarReporteTrabajador}>
          <p>Generar reporte de horas trabajadas de un trabajador</p>
        </div>
        <div className="recursos-button" onClick={generarReporteProyecto}>
          <p>Generar reporte de horas trabajadas por proyecto</p>
        </div>
      </div>
    </div>
  );
}

export default RecursosHumanos;
