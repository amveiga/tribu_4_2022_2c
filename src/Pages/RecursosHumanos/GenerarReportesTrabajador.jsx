import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";

import reportStyle from "./../../Styles/RecursosHumanos/Reportes.css";

import reportes from "./../../Img/RecursosHumanos/reportes_icon.png";

function GenerarReportesTrabajador() {
    let navigate = useNavigate();

    function verTareas(){
        navigate("/recursos-humanos/tareas");
    }

    return (
        <div className="body">
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
    )}

export default GenerarReportesTrabajador;
