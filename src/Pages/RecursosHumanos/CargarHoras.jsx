import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";

import barStyles from "./../../Styles/RecursosHumanos/BarraInformacion.css";
import buttonStyles from "./../../Styles/RecursosHumanos/Botones.css";
import loadStyles from "./../../Styles/RecursosHumanos/Cargas.css";

import fotoPerfil from "./../../Img/RecursosHumanos/perfil.png";
import enviarIcon from "./../../Img/RecursosHumanos/enviar_icon.png";
import borradorIcon from "./../../Img/RecursosHumanos/borrador_icon.png";
import cancelarIcon from "./../../Img/RecursosHumanos/cancelar_icon.png";

function CargarHoras() {
    let navigate = useNavigate();

    function verTareas(){
        navigate("/recursos-humanos/tareas");
    }

    function cambiarSeccion(){
        var select = document.getElementById("project-task");
        var divLoaders = document.getElementsByClassName("div-loader");

        for(var i = 0; i < divLoaders.length; i++){
            divLoaders[i].classList.add("hidden");
            divLoaders[i].getElementsByTagName("input")[0].value = "";
            
            var selects = divLoaders[i].getElementsByTagName("select");
            for(var e = 0; e < selects.length; e++){
                selects[e].selectedIndex = 0;
            }
        }

        switch(select.value){
            case "proyecto":
                divLoaders[0].classList.remove("hidden");
                break;

            case "incidencia":
                divLoaders[1].classList.remove("hidden");
                break;
                
            case "administrativa":
                divLoaders[2].classList.remove("hidden");
                break;
                
            case "guardia":
                divLoaders[3].classList.remove("hidden");
                break;
                
            case "licencia":
                divLoaders[4].classList.remove("hidden");
                break;
        }


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
            <div className="div-container">
                <div className="div-section">
                    <label htmlFor="project-name">Indique la fecha para cargar horas:</label>
                    <div className="work-mode-div">
                        <input type="date" className="calendar"/>
                    </div>
                        
                    
                </div>
                <div className="div-section">
                    <label htmlFor="project-select-task">Buscar tipo de tarea para cargar horas:</label>
                    <select name="project-task" id="project-task" 
                    onChange={() => {
                        cambiarSeccion();
                    }}>
                        <option disabled selected hidden value="">Seleccione el tipo de tarea a cargar</option>
                        <option value="proyecto">Proyecto</option>
                        <option value="incidencia">Incidencia</option>
                        <option value="administrativa">Administrativa</option>
                        <option value="guardia">Guardia</option>
                        <option value="licencia">Licencia</option>
                    </select>
                </div>

                {/* Proyecto */}
                <div className="div-loader hidden">
                    <div className="div-section">
                        <label htmlFor="project-select-task">Buscar tarea del proyecto para cargar horas:</label>
                        <select name="project-task" id="project-task">
                            <optgroup label="Seleccione un proyecto">
                                <option disabled selected hidden value=""></option>
                                <option value="tarea1">Nombre del proyecto 1</option>
                                <option value="tarea2">Nombre del proyecto 2</option>
                            </optgroup>
                        </select>
                    </div>
                    <div className="div-section">
                        <label htmlFor="project-select-project">Buscar proyecto para cargar horas:</label>
                        <select name="project-task" id="project-task">
                            <optgroup label="Seleccione una tarea">
                                <option disabled selected hidden value=""></option>
                                <option value="tarea1">Nombre del proyecto 1</option>
                                <option value="tarea2">Nombre del proyecto 2</option>
                            </optgroup>
                        </select>
                    </div>
                    <div className="div-section">
                        <label htmlFor="project-hours">Indique la cantidad de horas que trabajó:</label>
                        <div className="work-mode-div">
                            <input type="number" placeholder="Ingrese con el teclado el número"/>
                        </div>
                    </div>
                </div>
                
                {/* Incidencia */}
                <div className="div-loader hidden">
                    <div className="div-section">
                        <label htmlFor="project-select-task">Buscar incidencia para cargar horas:</label>
                        <select name="project-task" id="project-task">
                            <optgroup label="Seleccione un ticket">
                                <option disabled selected hidden value=""></option>
                                <option value="tarea1">Ticket 1</option>
                                <option value="tarea2">Ticket 2</option>
                            </optgroup>
                        </select>
                    </div>
                    <div className="div-section">
                        <label htmlFor="project-hours">Indique la cantidad de horas que trabajó:</label>
                        <div className="work-mode-div">
                            <input type="number" placeholder="Ingrese con el teclado el número"/>
                        </div>
                    </div>
                </div>

                {/* Administrativa */}
                <div className="div-loader hidden">
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
                        <div className="work-mode-div">
                            <input type="number" placeholder="Ingrese con el teclado el número"/>
                        </div>
                    </div>
                </div>

                {/* Guardia */}
                <div className="div-loader hidden">
                    <div className="div-section">
                        <label htmlFor="project-hours">Indique la cantidad de horas que trabajó:</label>
                        <div className="work-mode-div">
                            <input type="number" placeholder="Ingrese con el teclado el número"/>
                        </div>
                    </div>
                </div>

                {/* Licencia */}
                <div className="div-loader hidden">
                    <div className="div-section">
                        <label htmlFor="project-select-task">Buscar tipo de licencia:</label>
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
                        <label htmlFor="project-hours">Indique la cantidad de horas que le correspondió:</label>
                        <div className="work-mode-div">
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

export default CargarHoras;
