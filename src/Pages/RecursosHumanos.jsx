import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import styles from "./../Styles/RecursosHumanos/RecursosHumanos.css";
import buttonStyle from "./../Styles/RecursosHumanos/Botones.css";

import trabajadores from "./../Img/RecursosHumanos/personas_icon.png";
import reportes from "./../Img/RecursosHumanos/reportes_icon.png";
import { useEffect, useState } from "react";
import axios from "axios";
import ReactLoading from "react-loading";

import EmpleadoElement from "../Components/RecursosHumanos/Empleado";

//import EmpleadosList from "../Data/RecursosHumanos/empleados.json";
function RecursosHumanos() {
  const [isLoading, setLoading] = useState(true);
  const [empleados, setPost] = useState(null);
  

  useEffect(() => {
    const getEmpleados = async () => {
      await axios.get("https://squad1220222c-production.up.railway.app/recursos")
      .then((res) => {
        //console.log(res.data);
        setPost(res.data);
        setLoading(false);
      })
    }

    getEmpleados();
        
    
}, []);

  
  

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

  if(isLoading){
    return (
      <div>
        <ReactLoading type={"bars"} color={"rgba(0,53,108,1)"} height={667} width={375} />
      </div>
    )
    
  }

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
          
          {empleados.map((empleado) => {
              //console.log(empleado)
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
