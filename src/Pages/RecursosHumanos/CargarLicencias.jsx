import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";

import barStyles from "./../../Styles/RecursosHumanos/BarraInformacion.css";
import buttonStyles from "./../../Styles/RecursosHumanos/Botones.css";

import fotoPerfil from "./../../Img/RecursosHumanos/perfil.png";
import enviarIcon from "./../../Img/RecursosHumanos/enviar_icon.png";
import borradorIcon from "./../../Img/RecursosHumanos/borrador_icon.png";
import cancelarIcon from "./../../Img/RecursosHumanos/cancelar_icon.png";

function CargarLicencias() {
    let navigate = useNavigate();

    function verTareas(){
        navigate("/recursos-humanos/tareas");
    }

    return (
    <div className="body">
        <div id="data-bar">
            <img src={fotoPerfil} alt="" id="profile-image"/>
            <div>
                <p class="name-person">Juan Gonzales</p>
                <p class="title-person">Junior Dev de CRM</p>
                <p class="id-person">Legajo: 4</p>
            </div>
        </div>
        <div id="main">
            <div class="task-buttons">
                <input class="task-button work-button hidden" type="button" value="Cargar horas de trabajo en tareas"/>
                <input class="task-button incidence-button hidden" type="button" value="Cargar horas de trabajo en incidencias"/>
                <input class="task-button admin-button hidden" type="button" value="Cargar horas de trabajo en tareas administrativas"/>
                <input class="task-button guard-button hidden" type="button" value="Cargar horas de guardia" />
                <input class="task-button license-button" type="button" value="Cargar licencias" />
            </div>
            <div className="div-container">
                <div className="div-section">
                    <label for="project-name">Indique la fecha para cargar horas:</label>
                    <input type="date" className="calendar"/>
                </div>
                <div className="div-section">
                    <label for="project-select-task">Buscar tipo de licencia:</label>
                    <select name="project-task" id="project-task">
                        <optgroup label="Seleccione el tipo de licencia">
                            <option disabled selected hidden value=""></option>
                            <option value="tarea1">Licencia anual por vacaciones</option>
                            <option value="tarea1">Licencia por enfermedad</option>
                            <option value="tarea1">Licencia por enfermedad de familiar a cargo</option>
                            <option value="tarea1">Licencia especial por nacimiento de hijo/a</option>
                            <option value="tarea1">Licencia especial por matrimonio</option>
                            <option value="tarea1">Licencia especial por fallecimiento de esposo/a, concubino/a, hijos/as, padres</option>
                            <option value="tarea1">Licencia especial por fallecimiento de hermano/a</option>
                            <option value="tarea1">Licencia especial por rendir examen</option>
                            <option value="tarea1">Licencia por maternidad</option>
                            <option value="tarea1">Licencia por adopción</option>
                            <option value="tarea1">Licencia diaria</option>
                            <option value="tarea1">Licencia por accidente de trabajo</option>
                            <option value="tarea1">Licencia por donación de sangre</option>
                            <option value="tarea1">Justificación por razones de fuerza mayor</option>
                            <option value="tarea1">Licencia especial por violencia de género</option>
                            <option value="tarea2">Otro</option>
                        </optgroup>
                    </select>
                </div>
                <div className="div-section">
                    <label for="project-hours">Indique la cantidad de horas que le correspondió:</label>
                    <div className="hours-div">
                        <div className="work-mode-div">
                            <input type="number" placeholder="Ingrese con el teclado el número"/>
                        </div>
                    </div>
                </div>
            </div>

            <div class="buttons-div">
                <div class="button verificar" onClick={verTareas}>
                    <p>Enviar para verificar</p>
                    <img src={enviarIcon} alt=""/>
                </div>
                <div class="button bborrador" onClick={verTareas}>
                    <p>Guardar como borrador</p>
                    <img src={borradorIcon} alt=""/>
                </div>
                <div class="button cancelar" onClick={verTareas}>
                    <p>Cancelar</p>
                    <img src={cancelarIcon} alt=""/>
                </div>
            </div>
        </div>
    </div>
    )}

export default CargarLicencias;
