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

import { useEffect, useState } from "react";

function CargarHoras() {
    const [elementosCarga, setElementosCarga] = useState([])
    const [nElementos, setnElementos] = useState(0)
    
    let empleadoID = useParams();
    
    let navigate = useNavigate();

    /*const agregarCarga = () => {
        setElementosCarga([...elementosCarga, <ElementoCarga elementosCarga={elementosCarga} funcionCarga={setElementosCarga} nElemento={nElementos}/>])
        setnElementos(nElementos+1)
    }*/

    function verTareas(){
        navigate("/recursos-humanos/" + empleadoID.empleadoId + "/tareas");
    }

    const enviarParaVerificar = () =>{
        var string = ""
        string += "[";
        for(var i = 0; elementosCarga < i; i++){
            console.log(elementosCarga[i].pedirDatos())
            var horasTrabajadas = elementosCarga[i].getHorasTrabajadas();
            string +=
                {
                    "cantidadDeHorasTrabajadas": {horasTrabajadas},
                    "estado": "VALIDACION_PENDIENTE",
                    "fechaDeLaTareaACargar": "2022-12-01T07:04:02.075Z",
                    "parteDeHoraId": 0,
                    "proyectoId": "string",
                    "tareaDelParteDeHoraId": 0,
                    "tareaId": "string",
                    "tipoDeParteDeHoras": "ADMINISTRATIVA_CAPACITACION"
                }
                
            
        }
        string += "]";
        console.log(string);
    }

    return (
        <div className="body-hours">
            <div className="horas-title">
                <p>Cargar horas</p>
            </div>
            <div className="carga-main">
            <ElementoCarga elementosCarga={elementosCarga} funcionCarga={setElementosCarga} nElemento={nElementos}/>
                {elementosCarga.map((elemento) => {
                    return elemento
                })}

            </div>
            <div className="carga-main">
                <div className="carga-element">
                     <div className="add-hours-button"> {/*onClick={agregarCarga}> */}
                        <img src={sumarIcon} alt="" />
                    </div>
                </div>
            </div>
            <div className="buttons-div">
                <div className="button cancelar" onClick={verTareas}>
                    <p>Cancelar</p>
                    <img src={cancelarIcon} alt=""/>
                </div>
                <div className="button verificar" onClick={enviarParaVerificar}>
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

