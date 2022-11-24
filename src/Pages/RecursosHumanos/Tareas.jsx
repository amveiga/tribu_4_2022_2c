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
                <input class="task-button incidence-button" type="button" value="Cargar horas de trabajo en incidencias" onClick={CargarIncidencias}/>
                <input class="task-button admin-button" type="button" value="Cargar horas de trabajo en tareas administrativas" onClick={cargarAdministrativas}/>
                <input class="task-button guard-button" type="button" value="Cargar horas de guardia" onClick={cargarGuardias}/>
                <input class="task-button license-button" type="button" value="Cargar licencias" onClick={CargarLicencias}/>
            </div>
            <p class="title-separator">Tareas trabajadas</p>
            <div id="worked-hours-div">
                <div class="table-element special-wide special-header">
                    <div><p>Proyecto</p></div>
                    <div><p>Tarea / Subtarea</p></div>
                    <div><p>Horas declaradas</p></div>
                    <div><p>Modificar</p></div>
                    <div><p>Borrar</p></div>
                    <div><p>Estado</p></div>
                    <div class="validation-button"><p>Validar</p></div>
                    <div class="validation-button"><p>Rechazar</p></div>
                </div>
                <div class="table-element special-wide borrador">
                    <div class="first-div cell"><p>Nombre del Proyecto 1</p></div>
                    <div class="mid-div cell"><p>Nombre de la tarea 1</p></div>
                    <div class="mid-div cell"><p>16 Hs</p></div>
                    <div class="mid-div cell"><img src={imagenModificar} alt=""/></div>
                    <div class="mid-div cell"><img src={imagenBorrar} alt=""/></div>
                    <div class="last-div cell"><p>Borrador</p></div>
                    <div class="validation-button yes">
                        <p>Validar</p><img src="img/yes_icon.png" alt=""/>
                    </div>
                    <div class="validation-button no">
                        <p>Rechazar</p><img src={imagenRechazar} alt=""/>
                    </div>
                </div>
            </div>
            <p class="title-separator">Incidencias resueltas</p>
            <div id="incidences-solved-div">
                <div class="table-element normal-wide header">
                    <div><p>Ticket</p></div>
                    <div><p>Horas declaradas</p></div>
                    <div><p>Modificar</p></div>
                    <div><p>Borrar</p></div>
                    <div><p>Estado</p></div>
                    <div class="validation-button"><p>Validar</p></div>
                    <div class="validation-button"><p>Rechazar</p></div>
                </div>
                <div class="table-element pendiente">
                    <div class="first-div cell"><p>Numero del Ticket</p></div>
                    <div class="mid-div cell"><p>5 Hs</p></div>
                    <div class="mid-div cell"><img src={imagenModificar} alt=""/></div>
                    <div class="mid-div cell"><img src={imagenBorrar} alt=""/></div>
                    <div class="last-div cell"><p>Pendiente validación</p></div>
                    <div class="validation-button yes">
                        <p>Validar</p><img src={imagenValidar} alt=""/>
                    </div>
                    <div class="validation-button no">
                        <p>Rechazar</p><img src={imagenRechazar} alt=""/>
                    </div>
                </div>
            </div>

            <p class="title-separator">Guardias</p>
            <div id="guards-div">
                <div class="table-element normal-wide header">
                    <div><p>Número de guardia</p></div>
                    <div><p>Horas declaradas</p></div>
                    <div><p>Modificar</p></div>
                    <div><p>Borrar</p></div>
                    <div><p>Estado</p></div>
                    <div class="validation-button"><p>Validar</p></div>
                    <div class="validation-button"><p>Rechazar</p></div>
                </div>
                <div class="table-element aprobado">
                    <div class="first-div cell"><p>1</p></div>
                    <div class="mid-div cell"><p>5 Hs</p></div>
                    <div class="mid-div cell"><img src={imagenModificar} alt=""/></div>
                    <div class="mid-div cell"><img src={imagenBorrar} alt=""/></div>
                    <div class="last-div cell"><p>Aprobado</p></div>
                    <div class="validation-button yes">
                        <p>Validar</p><img src={imagenValidar} alt=""/>
                    </div>
                    <div class="validation-button no">
                        <p>Rechazar</p><img src={imagenRechazar} alt=""/>
                    </div>
                </div>
            </div>

            <p class="title-separator">Licencias</p>
            <div id="licenses-div">
                <div class="table-element header">
                    <div><p>Tipo de licencia</p></div>
                    <div><p>Horas declaradas</p></div>
                    <div><p>Modificar</p></div>
                    <div><p>Borrar</p></div>
                    <div><p>Estado</p></div>
                    <div class="validation-button"><p>Validar</p></div>
                    <div class="validation-button"><p>Rechazar</p></div>
                </div>
                <div class="table-element normal-wide desaprobado">
                    <div class="double-size first-div cell"><p>Licencia por paternidad</p></div>
                    <div class="mid-div cell"><p>24 Hs</p></div>
                    <div class="mid-div cell"><img src={imagenModificar} alt=""/></div>
                    <div class="mid-div cell"><img src={imagenBorrar} alt=""/></div>
                    <div class="last-div cell"><p>Desaprobado</p></div>
                    <div class="validation-button yes">
                        <p>Validar</p><img src={imagenValidar} alt=""/>
                    </div>
                    <div class="validation-button no">
                        <p>Rechazar</p><img src={imagenRechazar} alt=""/>
                    </div>
                </div>
            </div>
        </div>
    </div>
)}

export default Tareas;
