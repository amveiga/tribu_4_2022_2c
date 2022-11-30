import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";

import reportStyle from "./../../Styles/RecursosHumanos/Reportes.css";

import reportes from "./../../Img/RecursosHumanos/reportes_icon.png";

function GenerarReportesTrabajador() {
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
                        <p>Indique el/la trabajor/a del cual desea generar el reporte:</p>
                        <select name="" id="">
                            <optgroup>
                                <option disabled value="">Seleccione el trabajador</option>
                                <option hidden default value=""></option>
                                <option value="">Mario Mendoza</option>
                                <option value="">Maria Perez</option>
                                <option value="">Patricia Gaona</option>
                                <option value="">Juan Gonzalez</option>
                                <option value="">Otro</option>
                            </optgroup>
                        </select>
                    </div>
                    <div className="option-section">
                        <p>Indique entre  que fechas desea generar el reporte:</p>
                        <div className="date-div">
                            <p>Entre</p>
                            <input type="date" name="" id="" />
                            <p>y</p>
                            <input type="date" name="" id="" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="report-grid">
                    <div className="type-task-grid">Tipo de tarea</div>
                    <div className="task-grid">Tareas</div>
                    <div className="time-grid">Tiempo total por tareas</div>
                    <div className="total-time-grid">Tiempo total</div>
                    <div className="type-task-grid">Nombre del proyecto 2</div>
                    <div className="task-grid">Tarea 5</div>
                    <div className="time-grid">10 Hs</div>
                    <div className="total-time-grid">24 Hs</div>
                    <div className="task-grid">Tarea 7</div>
                    <div className="time-grid">12 Hs</div>
                    <div className="task-grid">Tarea 10</div>
                    <div className="time-grid">2 Hs</div>
                    <div className="type-task-grid">Guardias</div>
                    <div className="task-grid">Guardia 3</div>
                    <div className="time-grid">4 Hs</div>
                    <div className="total-time-grid">9 Hs</div>
                    <div className="task-grid">Guardia 4</div>
                    <div className="time-grid">5 Hs</div>
                    <div className="type-task-grid">Administrativas</div>
                    <div className="task-grid">Reunión Marketing</div>
                    <div className="hour-grid">2 Hs</div>
                    <div className="total-hour-grid">3 Hs</div>
                    <div className="task-grid">Curso RCP</div>
                    <div className="hour-grid">1 Hs</div>
                    <div className="type-task-grid">Licencias</div>
                    <div className="task-grid">Licencia por enfermedad</div>
                    <div className="time-grid">48 Hs</div>
                    <div className="total-time-grid">50 Hs</div>
                    <div className="task-grid">Licencia diaria</div>
                    <div className="time-grid">2 Hs</div>
                </div>
        </div>
    )}

export default GenerarReportesTrabajador;
