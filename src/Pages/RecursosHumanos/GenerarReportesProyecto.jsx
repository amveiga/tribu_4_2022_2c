import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";

import reportStyle from "./../../Styles/RecursosHumanos/Reportes.css";

import reportes from "./../../Img/RecursosHumanos/reportes_icon.png";

function GenerarReportesProyecto() {
    let navigate = useNavigate();

    var fechaMinima;
    var fechaMaxima;

    function establecerMinimo(){
        var calendarioMax = document.getElementById("calendar-max");
        var calendarioMin = document.getElementById("calendar-min");
        calendarioMax.min = calendarioMin.value;
        fechaMinima = calendarioMin.value;
        if(fechaMaxima && fechaMinima) generarReporte();
    }

    function establecerMaximo(){
        var calendarioMax = document.getElementById("calendar-max");
        var calendarioMin = document.getElementById("calendar-min");
        calendarioMin.max = calendarioMax.value;
        fechaMaxima = calendarioMax.value;
        if(fechaMaxima && fechaMinima) generarReporte();
    }

    function generarReporte(){
        console.log("reporte realizado!!")
    }

    function verTareas(){
        navigate("/recursos-humanos/tareas");
    }

    return (
        <div className="body">
            <div className="options-container">
                <div className="report-title">
                    <p>Reportes</p>
                    <img src={reportes} alt="" />
                </div>
                <div className="options-div">
                    <div className="option-section">
                        <p>Indique el proyecto del cual desea generar el reporte:</p>
                        <select name="" id="" className="report-select">
                            <option hidden default value=""></option>
                            <option disabled value="">Seleccione un proyecto</option>
                            <option value="">Nombre del proyecto 1</option>
                            <option value="">Nombre del proyecto 2</option>
                        </select>
                    </div>
                    <div className="option-section">
                        <p>Indique entre que fechas desea generar el reporte:</p>
                        <div className="date-div">
                            <p>Entre</p>
                            <input type="date" name="" id="calendar-min" onChange={establecerMinimo}/>
                            <p>y</p>
                            <input type="date" name="" id="calendar-max" onChange={establecerMaximo}/>
                        </div>
                    </div>
                </div>
            </div>

            <div className="report-grid">
                <div className="type-task-grid">Tipo de tarea</div>
                <div className="task-grid">Tareas</div>
                <div className="time-grid">Tiempo total por tareas</div>
                <div className="total-time-grid">Tiempo total</div>
                <div className="type-task-grid">Tarea 5</div>
                <div className="task-grid">Mario Mendoza</div>
                <div className="time-grid">10 Hs</div>
                <div className="total-time-grid">18 Hs</div>
                <div className="task-grid">Patricia Gaona</div>
                <div className="time-grid">8 Hs</div>
                <div className="type-task-grid">Tarea 15</div>
                <div className="task-grid">Maria Perez</div>
                <div className="time-grid">16 Hs</div>
                <div className="total-time-grid">41 Hs</div>
                <div className="task-grid">Patricia Gaona</div>
                <div className="time-grid">25 Hs</div>
            </div>

        </div>
    )}

export default GenerarReportesProyecto;

/*
<div className="report-table-header">
                    <div>Tipo de tarea</div>
                    <div>Tareas</div>
                    <div>Tiempo total por tareas</div>
                    <div>Tiempo total</div>
                </div>
                <div className="report-table-element">
                    <div>Nombre del proyecto 1</div>
                    <div>Tareas</div>
                    <div>Tiempo total por tareas</div>
                    <div>Tiempo total</div>
                </div>
                <div className="report-table-element">
                    <div>Nombre del proyecto 1</div>
                    <div>Tareas</div>
                    <div>Tiempo total por tareas</div>
                    <div>Tiempo total</div>
                </div>
                <div className="report-table-element">
                    <div>Nombre del proyecto 1</div>
                    <div>Tareas</div>
                    <div>Tiempo total por tareas</div>
                    <div>Tiempo total</div>
                </div>
                <div className="report-table-element">
                    <div>Nombre del proyecto 1</div>
                    <div>Tareas</div>
                    <div>Tiempo total por tareas</div>
                    <div>Tiempo total</div>
                </div>
                <div className="report-table-element">
                    <div>Nombre del proyecto 1</div>
                    <div>Tareas</div>
                    <div>Tiempo total por tareas</div>
                    <div>Tiempo total</div>
                </div>
                <div className="report-table-element">
                    <div>Nombre del proyecto 1</div>
                    <div>Tareas</div>
                    <div>Tiempo total por tareas</div>
                    <div>Tiempo total</div>
                </div>
                <div className="report-table-element">
                    <div>Nombre del proyecto 1</div>
                    <div>Tareas</div>
                    <div>Tiempo total por tareas</div>
                    <div>Tiempo total</div>
                </div>
                <div className="report-table-element">
                    <div>Nombre del proyecto 1</div>
                    <div>Tareas</div>
                    <div>Tiempo total por tareas</div>
                    <div>Tiempo total</div>
                </div>
                <div className="report-table-element">
                    <div>Nombre del proyecto 1</div>
                    <div>Tareas</div>
                    <div>Tiempo total por tareas</div>
                    <div>Tiempo total</div>
                </div>
*/