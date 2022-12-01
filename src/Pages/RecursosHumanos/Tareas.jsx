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
    const [isLoadingEmpleado, setLoadingEmpleado] = useState(true);
    const [isLoadingAprobados, setLoadingAprobados] = useState(true);
    const [isLoadingBorradores, setLoadingBorradores] = useState(true);
    const [isLoadingPendientes, setLoadingPendientes] = useState(true);
    const [isLoadingDesaprobados, setLoadingDesaprobados] = useState(true);

    
    const [empleado, setPost] = useState([]);

    const [listaAprobados, setListaAprobados] = useState([])
    const [listaBorradores, setListaBorradores] = useState([])
    const [listaPendientes, setListaPendientes] = useState([])
    const [listaDesaprobados, setListaDesaprobados] = useState([])

    let navigate = useNavigate();

    let {empleadoId} = useParams();
    //console.log(empleadoId)

    useEffect(() => {
        const getEmpleados = async () => {
            await axios.get("https://squad1220222c-production.up.railway.app/recursos/" + empleadoId)
            .then((res) => {
                setPost(res.data);
                setLoadingEmpleado(false);
            }, [])
        }
        getEmpleados();
        
    }, []);


    function cargarHoras(){
        navigate("/recursos-humanos/" + empleadoId + "/tareas/cargar-horas");
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

    if(isLoadingEmpleado && isLoadingBorradores){
        return(
            <div>
                <ReactLoading type={"bars"} color={"rgba(0,53,108,1)"} height={667} width={375} />
            </div>
        )
    }

    return (
    <div className="body">
        <div id="data-bar">
            <img src={fotoPerfil} alt="" id="profile-image"/>
            <FichaEmpleado empleado={empleado}/>
            
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
                    
                    {/* <ContenedorTareas empleadoID={empleadoId} estadoTarea={"APROBADO"} funcion={setLoadingAprobados}/> */}
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
                    <ContenedorTareas empleadoID={empleadoId} estadoTarea={"BORRADOR"} funcion={setLoadingBorradores} />
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
                    {/* <ContenedorTareas empleadoID={empleadoId} estadoTarea="VALIDACION_PENDIENTE" funcion={setLoadingPendientes}/> */}
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
                    {/* <ContenedorTareas empleadoID={empleadoId} estadoTarea="DESAPROBADO" funcion={setLoadingDesaprobados}/> */}
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
