import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";

import barStyles from "./../../Styles/RecursosHumanos/BarraInformacion.css";
import buttonStyles from "./../../Styles/RecursosHumanos/Botones.css";
import taskStyles from "./../../Styles/RecursosHumanos/Tareas.css";

import fotoPerfil from "./../../Img/RecursosHumanos/perfil.png";
import imagenModificar from "./../../Img/RecursosHumanos/modificar_icon.png";
import imagenBorrar from "./../../Img/RecursosHumanos/borrar_icon.png";
import imagenValidar from "./../../Img/RecursosHumanos/yes_icon.png";
import imagenRechazar from "./../../Img/RecursosHumanos/no_icon.png";

function Tareas() {
    let navigate = useNavigate();

    function cargarAdministrativas(){
        navigate("/recursos-humanos/tareas/cargar-administrativas");
    }

    function cargarGuardias(){
        navigate("/recursos-humanos/tareas/cargar-guardias");
    }

    function CargarIncidencias(){
        navigate("/recursos-humanos/tareas/cargar-incidencias");
    }

    function CargarLicencias(){
        navigate("/recursos-humanos/tareas/cargar-licencias");
    }

    function cargarTareas(){
        navigate("/recursos-humanos/tareas/cargar-tareas");
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
                <input class="task-button work-button" type="button" value="Cargar horas de trabajo en tareas" onClick={cargarTareas}/>
            </div>
            <div className="hours-section">
                <div className="hours-section-container">
                    <div className="border-task-start">
                        <p>Aprobado</p>
                    </div>
                    <div className="task-element-main-container">
                        <div className="task-element-container">
                            <div className="task-element">
                                <div className="sub-task-element">
                                    <div className="task-div">
                                        <div className="task-name-div">
                                            <p className="task-name">Tarea 1</p>
                                            <div className="status-dot grey"></div>
                                        </div>
                                    </div>
                                    <p className="hours-amount">Cantidad de horas</p>
                                </div>
                                <div className="buttons-work-div">
                                        <div className="edit-button">
                                            <p>Editar</p>
                                        </div>
                                        <div className="delete-button">
                                            <p>Eliminar</p>
                                        </div>
                                    </div>
                            </div>
                        <div className="vertical-divisor">
                        </div>
                        <div className="task-element">
                            <div className="sub-task-element">
                                <div className="task-div">
                                    <div className="task-name-div">
                                        <p className="task-name">Subtarea 1</p>
                                        <div className="status-dot yellow"></div>
                                    </div>
                                </div>
                                <p className="hours-amount">Cantidad de horas</p>
                            </div>
                            <div className="buttons-work-div">
                                    <div className="edit-button">
                                        <p>Editar</p>
                                    </div>
                                    <div className="delete-button">
                                        <p>Eliminar</p>
                                    </div>
                                </div>
                        </div>
                        <div className="task-element">
                            <div className="sub-task-element">
                                <div className="task-div">
                                    <div className="task-name-div">
                                        <p className="task-name">Subtarea 1</p>
                                        <div className="status-dot green"></div>
                                    </div>
                                </div>
                                <p className="hours-amount">Cantidad de horas</p>
                            </div>
                            <div className="buttons-work-div">
                                    <div className="edit-button">
                                        <p>Editar</p>
                                    </div>
                                    <div className="delete-button">
                                        <p>Eliminar</p>
                                    </div>
                                </div>
                        </div>
                        </div>
                        <div className="task-element-container">
                            <div className="task-element">
                                <div className="sub-task-element">
                                    <div className="task-div">
                                        <div className="task-name-div">
                                            <p className="task-name">Tarea 1</p>
                                            <div className="status-dot grey"></div>
                                        </div>
                                    </div>
                                    <p className="hours-amount">Cantidad de horas</p>
                                </div>
                                <div className="buttons-work-div">
                                        <div className="edit-button">
                                            <p>Editar</p>
                                        </div>
                                        <div className="delete-button">
                                            <p>Eliminar</p>
                                        </div>
                                    </div>
                            </div>
                        <div className="vertical-divisor">
                        </div>
                        <div className="task-element">
                            <div className="sub-task-element">
                                <div className="task-div">
                                    <div className="task-name-div">
                                        <p className="task-name">Subtarea 1</p>
                                        <div className="status-dot yellow"></div>
                                    </div>
                                </div>
                                <p className="hours-amount">Cantidad de horas</p>
                            </div>
                            <div className="buttons-work-div">
                                    <div className="edit-button">
                                        <p>Editar</p>
                                    </div>
                                    <div className="delete-button">
                                        <p>Eliminar</p>
                                    </div>
                                </div>
                        </div>
                        <div className="task-element">
                            <div className="sub-task-element">
                                <div className="task-div">
                                    <div className="task-name-div">
                                        <p className="task-name">Subtarea 1</p>
                                        <div className="status-dot green"></div>
                                    </div>
                                </div>
                                <p className="hours-amount">Cantidad de horas</p>
                            </div>
                            <div className="buttons-work-div">
                                    <div className="edit-button">
                                        <p>Editar</p>
                                    </div>
                                    <div className="delete-button">
                                        <p>Eliminar</p>
                                    </div>
                                </div>
                        </div>
                        </div>
                    </div>
                    <div className="border-task-end">
                    </div>
                </div>
                <div className="border-button">
                    <img src={imagenValidar} alt="" />
                </div>
            </div>
            <div className="hours-section">
                <div className="hours-section-container">
                    <div className="border-task-start">
                        <p>Borrador</p>
                    </div>
                    <div className="task-element-main-container">
                        <div className="task-element-container">
                            <div className="task-element">
                                <div className="sub-task-element">
                                    <div className="task-div">
                                        <div className="task-name-div">
                                            <p className="task-name">Tarea 1</p>
                                            <div className="status-dot grey"></div>
                                        </div>
                                    </div>
                                    <p className="hours-amount">Cantidad de horas</p>
                                </div>
                                <div className="buttons-work-div">
                                        <div className="edit-button">
                                            <p>Editar</p>
                                        </div>
                                        <div className="delete-button">
                                            <p>Eliminar</p>
                                        </div>
                                    </div>
                            </div>
                        <div className="vertical-divisor">
                        </div>
                        <div className="task-element">
                            <div className="sub-task-element">
                                <div className="task-div">
                                    <div className="task-name-div">
                                        <p className="task-name">Subtarea 1</p>
                                        <div className="status-dot yellow"></div>
                                    </div>
                                </div>
                                <p className="hours-amount">Cantidad de horas</p>
                            </div>
                            <div className="buttons-work-div">
                                    <div className="edit-button">
                                        <p>Editar</p>
                                    </div>
                                    <div className="delete-button">
                                        <p>Eliminar</p>
                                    </div>
                                </div>
                        </div>
                        <div className="task-element">
                            <div className="sub-task-element">
                                <div className="task-div">
                                    <div className="task-name-div">
                                        <p className="task-name">Subtarea 1</p>
                                        <div className="status-dot green"></div>
                                    </div>
                                </div>
                                <p className="hours-amount">Cantidad de horas</p>
                            </div>
                            <div className="buttons-work-div">
                                    <div className="edit-button">
                                        <p>Editar</p>
                                    </div>
                                    <div className="delete-button">
                                        <p>Eliminar</p>
                                    </div>
                                </div>
                        </div>
                        </div>
                        <div className="task-element-container">
                            <div className="task-element">
                                <div className="sub-task-element">
                                    <div className="task-div">
                                        <div className="task-name-div">
                                            <p className="task-name">Tarea 1</p>
                                            <div className="status-dot grey"></div>
                                        </div>
                                    </div>
                                    <p className="hours-amount">Cantidad de horas</p>
                                </div>
                                <div className="buttons-work-div">
                                        <div className="edit-button">
                                            <p>Editar</p>
                                        </div>
                                        <div className="delete-button">
                                            <p>Eliminar</p>
                                        </div>
                                    </div>
                            </div>
                        <div className="vertical-divisor">
                        </div>
                        <div className="task-element">
                            <div className="sub-task-element">
                                <div className="task-div">
                                    <div className="task-name-div">
                                        <p className="task-name">Subtarea 1</p>
                                        <div className="status-dot yellow"></div>
                                    </div>
                                </div>
                                <p className="hours-amount">Cantidad de horas</p>
                            </div>
                            <div className="buttons-work-div">
                                    <div className="edit-button">
                                        <p>Editar</p>
                                    </div>
                                    <div className="delete-button">
                                        <p>Eliminar</p>
                                    </div>
                                </div>
                        </div>
                        <div className="task-element">
                            <div className="sub-task-element">
                                <div className="task-div">
                                    <div className="task-name-div">
                                        <p className="task-name">Subtarea 1</p>
                                        <div className="status-dot green"></div>
                                    </div>
                                </div>
                                <p className="hours-amount">Cantidad de horas</p>
                            </div>
                            <div className="buttons-work-div">
                                    <div className="edit-button">
                                        <p>Editar</p>
                                    </div>
                                    <div className="delete-button">
                                        <p>Eliminar</p>
                                    </div>
                                </div>
                        </div>
                        </div>
                    </div>
                    <div className="border-task-end">
                    </div>
                </div>
                <div className="border-button">
                    <img src={imagenValidar} alt="" />
                </div>
            </div>
            <div className="hours-section">
                <div className="hours-section-container">
                    <div className="border-task-start">
                        <p>Pendiente Validación</p>
                    </div>
                    <div className="task-element-main-container">
                        <div className="task-element-container">
                            <div className="task-element">
                                <div className="sub-task-element">
                                    <div className="task-div">
                                        <div className="task-name-div">
                                            <p className="task-name">Guardia</p>
                                            <div className="status-dot orange"></div>
                                        </div>
                                    </div>
                                    <p className="hours-amount">4 Hs</p>
                                </div>
                                <div className="buttons-work-div">
                                        <div className="edit-button">
                                            <p>Editar</p>
                                        </div>
                                        <div className="delete-button">
                                            <p>Eliminar</p>
                                        </div>
                                    </div>
                            </div>
                            <div className="vertical-divisor">
                            </div>
                            <div className="task-element">
                                <div className="sub-task-empty-element">
                                    <p>No hay subtareas disponibles</p>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div className="border-task-end">
                    </div>
                </div>
                <div className="border-button">
                    <img src={imagenValidar} alt="" />
                </div>
            </div>
            <div className="hours-section">
                <div className="hours-section-container">
                    <div className="border-task-start">
                        <p>Desaprobado</p>
                    </div>
                    <div className="task-element-main-container">
                        <div className="task-element-container">
                            <div className="task-element">
                                <div className="sub-task-element">
                                    <div className="task-div">
                                        <div className="task-name-div">
                                            <p className="task-name">Tarea 1</p>
                                            <div className="status-dot orange"></div>
                                        </div>
                                    </div>
                                    <p className="hours-amount">5 Hs</p>
                                </div>
                                <div className="buttons-work-div">
                                        <div className="edit-button">
                                            <p>Editar</p>
                                        </div>
                                        <div className="delete-button">
                                            <p>Eliminar</p>
                                        </div>
                                    </div>
                            </div>
                        <div className="vertical-divisor">
                        </div>
                            <div className="task-element">
                                <div className="sub-task-element">
                                    <div className="task-div">
                                        <div className="task-name-div">
                                            <p className="task-name">Tarea 5</p>
                                            <div className="status-dot yellow"></div>
                                        </div>
                                    </div>
                                    <p className="hours-amount">5 Hs</p>
                                </div>
                                <div className="buttons-work-div">
                                        <div className="edit-button">
                                            <p>Editar</p>
                                        </div>
                                        <div className="delete-button">
                                            <p>Eliminar</p>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                    <div className="border-task-end">
                    </div>
                </div>
                <div className="border-button">
                    <img src={imagenModificar} alt="" />
                </div>
            </div>
        </div>
    </div>
)}

export default Tareas;
