import { BrowserRouter, Routes, Route, Navigate, useNavigate, useParams } from "react-router-dom";

import barStyles from "./../../Styles/RecursosHumanos/BarraInformacion.css";
import buttonStyles from "./../../Styles/RecursosHumanos/Botones.css";
import loadStyles from "./../../Styles/RecursosHumanos/Cargas.css";

import fotoPerfil from "./../../Img/RecursosHumanos/perfil.png";
import enviarIcon from "./../../Img/RecursosHumanos/enviar_icon.png";
import borradorIcon from "./../../Img/RecursosHumanos/borrador_icon.png";
import cancelarIcon from "./../../Img/RecursosHumanos/cancelar_icon.png";
import sumarIcon from "./../../Img/RecursosHumanos/sumar_icon.png"
import restarIcon from "./../../Img/RecursosHumanos/restar_icon.png"

import FichaEmpleado from "../../Components/RecursosHumanos/FichaEmpleado";
import ElementoCarga from "../../Components/RecursosHumanos/ElementoCarga";

function CargarHoras() {
    let empleadoID = useParams();
    
    let navigate = useNavigate();

    const agregarCarga = () => {
        var main = document.getElementsByClassName("carga-main")[0];
        console.log(ElementoCarga);
        main.innerHTML += ElementoCarga;
    }

    function verTareas(){
        navigate("/recursos-humanos/" + empleadoID.empleadoId + "/tareas");
    }

    return (
        <div className="body-hours">
            <div className="horas-title">
                <p>Cargar horas</p>
            </div>
            <div className="carga-main">
                <ElementoCarga/>
            </div>
            <div className="carga-main">
                <div className="carga-element">
                    <div className="add-hours-button" onClick={agregarCarga}>
                        <img src={sumarIcon} alt="" />
                    </div>
                </div>
            </div>
            <div className="buttons-div">
                <div className="button cancelar" onClick={verTareas}>
                    <p>Cancelar</p>
                    <img src={cancelarIcon} alt=""/>
                </div>
                <div className="button verificar" onClick={verTareas}>
                    <p>Enviar para verificar</p>
                    <img src={enviarIcon} alt=""/>
                </div>
                <div className="button bborrador" onClick={verTareas}>
                    <p>Guardar como borrador</p>
                    <img src={borradorIcon} alt=""/>
                </div>
            </div>
        </div>
    )
};

    
    
export default CargarHoras;

