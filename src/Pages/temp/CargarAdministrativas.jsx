import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";

import barStyles from "./../../Styles/RecursosHumanos/BarraInformacion.css";
import buttonStyles from "./../../Styles/RecursosHumanos/Botones.css";
import loadStyles from "./../../Styles/RecursosHumanos/Cargas.css";

import fotoPerfil from "./../../Img/RecursosHumanos/perfil.png";
import enviarIcon from "./../../Img/RecursosHumanos/enviar_icon.png";
import borradorIcon from "./../../Img/RecursosHumanos/borrador_icon.png";
import cancelarIcon from "./../../Img/RecursosHumanos/cancelar_icon.png";

function CargarAdministrativas() {
    let navigate = useNavigate();

    function verTareas(){
        navigate("/recursos-humanos/tareas");
    }

    return (
    <div className="body">
        <div id="data-bar">
            <img src={fotoPerfil} alt="" id="profile-image"/>
            <div>
                <p className="name-person">Juan Gonzales</p>
                <p className="title-person">Junior Dev de CRM</p>
                <p className="id-person">Legajo: 4</p>
            </div>
        </div>
        <div id="main">
            <div className="task-buttons">
                <input className="task-button work-button hidden" type="button" value="Cargar horas de trabajo en tareas"/>
                <input className="task-button incidence-button hidden" type="button" value="Cargar horas de trabajo en incidencias"/>
                <input className="task-button admin-button" type="button" value="Cargar horas de trabajo en tareas administrativas" onClick={verTareas}/>
                <input className="task-button guard-button hidden" type="button" value="Cargar horas de guardia" />
                <input className="task-button license-button hidden" type="button" value="Cargar licencias" />
            </div>
            <div className="div-container">
                <div className="div-section">
                    <label htmlFor="project-name">Indique la fecha para cargar horas:</label>
                    <input type="date" className="calendar"/>
                </div>
                <div className="div-section">
                    <label htmlFor="project-select-task">Buscar tarea administrativa para cargar horas:</label>
                    <select name="project-task" id="project-task">
                    <optgroup label="Seleccione una tarea administrativa">
                        <option disabled selected hidden value=""></option>
                            <option value="tarea1">Reunión</option>
                            <option value="tarea2">Capacitación</option>
                            <option value="tarea2">Curso</option>
                        </optgroup>
                    </select>
                </div>
                <div className="div-section">
                    <label htmlFor="project-select-task">Especifique</label>
                    <select name="project-task" id="project-task">
                        <optgroup label="Especifique el sector de la reunión">
                            <option disabled selected hidden value=""></option>
                            <option value="tarea1">Marketing</option>
                            <option value="tarea2">Recursos Humanos</option>
                            <option value="tarea2">Operaciones</option>
                            <option value="tarea2">Ventas</option>
                            <option value="tarea2">Administración y Finanzas</option>
                            <option value="tarea2">Cliente</option>
                            <option value="tarea2">Otro</option>
                        </optgroup>
                    </select>
                </div>
                <div className="div-section">
                    <label htmlFor="project-hours">Indique la cantidad de horas que trabajó:</label>
                    <div className="hours-div">
                        <div className="work-mode-div">
                            <p>En la oficina:</p>
                            <input type="number" placeholder="Ingrese con el teclado el número"/>
                        </div>
                        <div className="work-mode-div">
                            <p>Remoto:</p>
                            <input type="number" placeholder="Ingrese con el teclado el número"/>
                        </div>
                    </div>
                </div>
            </div>

            <div className="buttons-div">
                <div className="button verificar" onClick={verTareas}>
                    <p>Enviar para verificar</p>
                    <img src={enviarIcon} alt=""/>
                </div>
                <div className="button bborrador" onClick={verTareas}>
                    <p>Guardar como borrador</p>
                    <img src={borradorIcon} alt=""/>
                </div>
                <div className="button cancelar" onClick={verTareas}>
                    <p>Cancelar</p>
                    <img src={cancelarIcon} alt=""/>
                </div>
            </div>
        </div>
    </div>
    )}

export default CargarAdministrativas;
