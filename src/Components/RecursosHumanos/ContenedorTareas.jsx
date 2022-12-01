import SegmentoTarea from "./SegmentoTarea";
import SegmentoTareaMayor from "./SegmentoTareaMayor";

import { Link, animateScroll as scroll } from "react-scroll";
import { useEffect, useState } from "react";
import axios from "axios";

function ContenedorTareas(empleadoID, estadoTarea, funcion){
    const [datos, setDatos] = useState(null)
    const [myCargando, setMyCargando] = useState(true)
    
    //console.log(empleadoID)
    var cargando = true;
    
    useEffect(() => {
        const getDatos = async () =>{
            await axios.get("https://squad1220222c-production.up.railway.app/recursos/" + empleadoID.empleadoID + "/tareas/estado?estado=" + empleadoID.estadoTarea )
            .then((res) => {
                //console.log(res)
                setDatos(res.data)
                empleadoID.funcion()
                //console.log(res.data)
                setMyCargando(false)
            }, [])
        }

        

        getDatos();
        
    }, []);

    if(myCargando){
        return(
            <div>Cargando!!</div>
        )
    }


    return (
        <div className="task-element-main-container">
            
            <div className="task-element-container">
                <SegmentoTareaMayor estadoTarea={estadoTarea.estadoTarea}/>
                {/*<div className="vertical-divisor">
                </div>*/}
                
                {datos.map((dato) => {
                    return (
                        <SegmentoTarea nombreTarea={"Una tarea"} estadoTarea={estadoTarea} miDato={dato}/>
                    )
                })}
                {/*
                <SegmentoTarea estadoTarea={estadoTarea.estadoTarea}/>
                <SegmentoTarea estadoTarea={estadoTarea.estadoTarea}/>
                <SegmentoTarea estadoTarea={estadoTarea.estadoTarea}/>
                <SegmentoTarea estadoTarea={estadoTarea.estadoTarea}/>
                <SegmentoTarea estadoTarea={estadoTarea.estadoTarea}/>
                <SegmentoTarea estadoTarea={estadoTarea.estadoTarea}/>
                <SegmentoTarea estadoTarea={estadoTarea.estadoTarea}/>*/}
            </div>
            {/*
            <div className="task-element-container">
                <SegmentoTareaMayor estadoTarea={estadoTarea.estadoTarea}/>
                <div className="vertical-divisor">
                </div>
                <SegmentoTarea estadoTarea={estadoTarea.estadoTarea}/>
                <SegmentoTarea estadoTarea={estadoTarea.estadoTarea}/>
            </div>*/}
        
        </div>
    );

    var contenedorVacio = (
        <div className="task-element-container">
                <div>No hay tareas</div>
        </div>
    )
}

export default ContenedorTareas;