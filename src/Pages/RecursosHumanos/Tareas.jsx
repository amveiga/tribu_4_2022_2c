import { BrowserRouter, Routes, Route, Navigate, useNavigate, useParams } from "react-router-dom";

import barStyles from "./../../Styles/RecursosHumanos/BarraInformacion.css";
import buttonStyles from "./../../Styles/RecursosHumanos/Botones.css";
import taskStyles from "./../../Styles/RecursosHumanos/Tareas.css";

import fotoPerfil from "./../../Img/RecursosHumanos/perfil.png";
import imagenModificar from "./../../Img/RecursosHumanos/modificar_icon.png";
import imagenBorrar from "./../../Img/RecursosHumanos/borrar_icon.png";
import imagenValidar from "./../../Img/RecursosHumanos/yes_icon.png";
import imagenRechazar from "./../../Img/RecursosHumanos/no_icon.png";
import imagenEnviar from "./../../Img/RecursosHumanos/enviar_icon.png";

import FichaEmpleado from "../../Components/RecursosHumanos/FichaEmpleado";

import ContenedorTareas from "../../Components/RecursosHumanos/ContenedorTareas";
import SegmentoTarea from "../../Components/RecursosHumanos/SegmentoTarea";

import { useEffect, useState } from "react";
import axios from "axios";
import ReactLoading from "react-loading";

function Tareas() {
    const [isLoading, setLoading] = useState(true);
    const [listaEmpleados, setPost] = useState(null);
  

    useEffect(() => {
        const getEmpleados = async () => {
            await axios.get("https://squad1220222c-production.up.railway.app/recursos")
            .then((res) => {
                setPost(res.data);
                setLoading(false);
                console.log("antes de renderizar: " + res.data);
            })
        }

        getEmpleados();
        
    
    }, []);

    let navigate = useNavigate();

    let empleadoID = useParams();
    

    function cargarHoras(){
        navigate("/recursos-humanos/" + empleadoID.empleadoId + "/tareas/cargar-horas");
    }

    function volver(){
        navigate("/recursos-humanos/");
    }

    function mostrarModoEditar(){
        var editMenu = document.getElementById("edit");
        editMenu.classList.remove("hidden");
    }

    function ocultarModoEditar(){
        var editMenu = document.getElementById("edit");
        editMenu.classList.add("hidden");
    }

    if(isLoading){
        return(
            <div>Cargando!!</div>
        )
    }

    return (
    <div className="body">
        <div id="data-bar">
            <img src={fotoPerfil} alt="" id="profile-image"/>
            <FichaEmpleado key={empleadoID.empleadoId} empleadoID={empleadoID.empleadoId} listaEmpl={listaEmpleados}/>
            
            <div className="button-container">
                <input className="task-button back-button" type="button" value="Volver" onClick={volver}/>
            </div>
        </div>
        <div id="main">
            {/* Boton carga */}
            <div className="add-button-container">
                <p>Cargar horas</p>
                <input className="add-button" type="button" value="+" onClick={cargarHoras}/>
            </div>

            {/* Aprobado */}
            <div className="hours-section">
                <div className="hours-section-container">
                    <div className="border-task-start">
                        <p>Aprobado</p>
                    </div>
                    
                    {/*<div className="task-element-main-container">
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
                        </div>
                        </div>
                        <div className="task-element-container">
                            <SegmentoTarea estadoTarea={"APROBADO"}/>
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
                            </div>
                        </div>
    </div>*/}
                    <ContenedorTareas estadoTarea="APROBADO"/>
                    <div className="border-task-end">
                    </div>
                </div>
            </div>

            {/* Borrador */}
            <div className="hours-section">
                <div className="hours-section-container">
                    <div className="border-task-start">
                        <p>Borrador</p>
                    </div>
                    <ContenedorTareas estadoTarea="BORRADOR"/>
                    <div className="border-task-end">
                    </div>
                </div>
                <div className="border-button">
                    <img src={imagenEnviar} alt="" />
                </div>
            </div>

            {/* Pendiente validacion */}
            <div className="hours-section">
                <div className="hours-section-container">
                    <div className="border-task-start">
                        <p>Pendiente Validación</p>
                    </div>
                    <ContenedorTareas estadoTarea="PENDIENTE"/>
                    {/* 
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
                    */}
                    <div className="border-task-end">
                    </div>
                </div>
                <div className="border-button">
                    <img src={imagenValidar} alt="" />
                </div>
            </div>

            {/* Desaprobado */}
            <div className="hours-section">
                <div className="hours-section-container">
                    <div className="border-task-start">
                        <p>Desaprobado</p>
                    </div>
                    <ContenedorTareas estadoTarea="DESAPROBADO"/>
                    <div className="border-task-end">
                    </div>
                </div>
            </div>
        </div>
        <div id="edit" className="hidden" >
            <div className="not-clickeable">
                <div className="edit-title">
                    <p>Editar tarea</p>
                </div>
                <div className="edit-container">
                    <div className="edit-element">
                        <p>Fecha de la tarea</p>
                        <input type="date" className="edit-input"/>
                    </div>
                    <div className="edit-element">
                        <p>Tipo de tarea</p>
                        <select name="" id="" className="edit-input"></select>
                    </div>
                    <div className="edit-element">
                        <p>Nombre del proyecto</p>
                        <select name="" id="" className="edit-input"></select>
                    </div>
                    <div className="edit-element">
                        <p>Nombre de la tarea</p>
                        <select name="" id="" className="edit-input"></select>
                    </div>
                    <div className="edit-element">
                        <p>Cantidad de horas trabajadas</p>
                        <input type="number" className="edit-input"/>
                    </div>
                </div>
                <div className="edit-button-container">
                    <div className="edit-cancel-button" onClick={ocultarModoEditar}>
                        <p>Cancelar</p>
                    </div>
                    <div className="edit-save-button" onClick={ocultarModoEditar}>
                        <p>Guardar cambios</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
)}

export default Tareas;
