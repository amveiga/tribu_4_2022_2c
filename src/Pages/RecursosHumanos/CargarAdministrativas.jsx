import barStyles from "./../../Styles/RecursosHumanos/BarraInformacion.css";
import buttonStyles from "./../../Styles/RecursosHumanos/Botones.css";
import loadStyles from "./../../Styles/RecursosHumanos/Cargas.css";

import fotoPerfil from "./../../Img/RecursosHumanos/perfil.png";
import enviarIcon from "./../../Img/RecursosHumanos/enviar_icon.png";
import borradorIcon from "./../../Img/RecursosHumanos/borrador_icon.png";
import cancelarIcon from "./../../Img/RecursosHumanos/cancelar_icon.png";

function CargarAdministrativas() {
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
                    <input class="task-button work-button" type="button" value="Cargar horas de trabajo en tareas"/>
                    <input class="task-button incidence-button" type="button" value="Cargar horas de trabajo en incidencias"/>
                    <input class="task-button admin-button" type="button" value="Cargar horas de trabajo en tareas administrativas"/>
                    <input class="task-button guard-button" type="button" value="Cargar horas de guardia" />
                    <input class="task-button license-button" type="button" value="Cargar licencias" />
                </div>
                <div className="div-container">
                    <div>
                        <label for="project-name">Buscar proyecto para cargar horas:</label>
                        <select name="project-name" id="project-name">
                            <option disabled selected value="">Seleccione un proyecto</option>
                            <option value="proyecto1">Nombre del proyecto 1</option>
                            <option value="proyecto2">Nombre del proyecto 2</option>
                        </select>
                    </div>
                    <div>
                        <label for="project-task">Buscar tarea del proyecto para cargar horas:</label>
                        <select name="project-task" id="project-task">
                            <option disabled selected value="">Seleccione un proyecto</option>
                            <option value="tarea1">Nombre de la tarea 1</option>
                            <option value="tarea2">Nombre de la tarea 2</option>
                        </select>
                    </div>
                    <div>
                        <label for="project-hours">Indique la cantidad de horas que trabajo:</label>
                        <input type="number" name="project-hours" id="project-hours" min="0"/>
                    </div>
                </div>
    
                <div class="buttons-div">
                <div class="button verificar">
                    <p>Enviar para verificar</p>
                    <img src={enviarIcon} alt=""/>
                </div>
                <div class="button borrador">
                    <p>Guardar como borrador</p>
                    <img src={borradorIcon} alt=""/>
                </div>
                <div class="button cancelar">
                    <p>Cancelar</p>
                    <img src={cancelarIcon} alt=""/>
                </div>
                </div>
            </div>
        </div>
    )}

export default CargarAdministrativas;
