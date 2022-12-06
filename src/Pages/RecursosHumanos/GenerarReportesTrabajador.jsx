import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";

import "./../../Styles/RecursosHumanos/Reportes.css";

import volverIcon from "./../../Img/RecursosHumanos/volver_icon.png"
import reportes from "./../../Img/RecursosHumanos/reportes_icon.png";
import { useEffect, useState } from "react";
import axios from "axios";

import ElementoHeaderReporteTrabajadores from "../../Components/RecursosHumanos/ElementoHeaderReporteTrabajadores";
import ElementoCompletoReporteTrabajadores from "../../Components/RecursosHumanos/ElementoCompletoReporteTrabajadores";
import ElementoParcialReporteTrabajadores from "../../Components/RecursosHumanos/ElementoParcialReporteTrabajadores";

function GenerarReportesTrabajador() {
    const [empleados, setEmpleados] = useState([])
    const [empleadoActual, setEmpleadoActual] = useState(null)
    const [fechaMinima, setFechaMinima] = useState("")
    const [fechaMaxima, setFechaMaxima] = useState("")
    const [elementosTabla, setElementosTabla] = useState([])

    let navigate = useNavigate();

    useEffect(() => {
        const getEmpleados = async () => {
            await axios
            .get("https://squad1220222c-production.up.railway.app/recursos")
            .then((res) => {
                setEmpleados(res.data);
            });
        };
    
        getEmpleados();
        }, []);

    const useEstablecerMinimo = () => {
        var calendarioMax = document.getElementById("calendar-max");
        var calendarioMin = document.getElementById("calendar-min");
        calendarioMax.min = calendarioMin.value;
        setFechaMinima(calendarioMin.value)
    }

    const useEstablecerMaximo = () => {
        var calendarioMax = document.getElementById("calendar-max");
        var calendarioMin = document.getElementById("calendar-min");
        calendarioMin.max = calendarioMax.value;
        setFechaMaxima(calendarioMax.value)
    }

    const generarReporte = async () => {
        //console.log(empleadoActual)
        if(empleadoActual == null){
            window.alert("Seleccione un empleado")
            return
        }
        if(fechaMinima == "" && fechaMaxima == "") {
            window.alert("Ingrese el periodo de fechas del que desea generar un reporte")
            return
        }
        if(fechaMaxima == ""){
            window.alert("Ingrese la fecha final del reporte")
            return
        }
        if(fechaMinima == ""){
            window.alert("Ingrese la fecha inicial del reporte")
            return
        }
        

        //console.log("reporte realizado!!")
        //console.log(empleadoActual)
        var operation = await axios.get(
            /*"https://squad1220222c-production.up.railway.app/reportes/tareas/fechas?fechaFin=" +  + "&fechaInicio=" + fechaMinima*/
            "https://squad1220222c-production.up.railway.app/reportes/?fechaFin=" + fechaMaxima + "&fechaInicio=" + fechaMinima + "&legajo=" + empleadoActual
        )
        .then(res =>{
            //console.log(Array.from(res.data).filter((tarea) => tarea.estado === "APROBADO"))
            //setDatos(res)
            ordenarDatos(Array.from(res.data).filter((tarea) => tarea.estado === "APROBADO"))
        }
        
        )
        
        
    }

    function volver() {
        navigate("/recursos-humanos/");
    }

    function ordenarDatos(datos){
        //console.log(datos.data.length)
        var listaProyectos = []
        var listaIncidencias = []
        var listaAdministrativas = []
        var listaGuardias = []
        var listaLicencias = []
        var listaCompleta = [listaProyectos, listaIncidencias, listaAdministrativas, listaGuardias, listaLicencias]
        for(var i = 0; i < datos.length; i++){
            //console.log(datos[i])
            switch(datos[i].tipoDeTarea){
                case "TAREA_PROYECTO":
                    var encontrado = false;
                    for(var j = 0; j < listaProyectos.length; j++){
                        //console.log(listaProyectos[j])
                        if(listaProyectos[j][0].proyectoId === datos[i].proyectoId){
                            listaProyectos[j].push(datos[i])
                            encontrado = true
                            break
                        }
                    }
                    if(!encontrado){
                        listaProyectos.push([datos[i]])
                    }
                    break;
                    
                case "INCIDENCIA":
                    listaIncidencias.push(datos[i])
                    break;

                case "ADMINISTRATIVA":
                    listaAdministrativas.push(datos[i])
                    break;

                case "GUARDIA":
                    listaGuardias.push(datos[i])
                    break;

                case "LICENCIA":
                    listaLicencias.push(datos[i])
                    break;

            }
        }

        //setListaDatos(listaCompleta)
        cargarTabla(listaCompleta)
    }

    

    const cargarTabla = (listaDatos) =>{
        var listaElementos = [[
            <ElementoHeaderReporteTrabajadores/>
        ]]
        listaDatos.forEach(lista => {
            var primerElemento = true
            if(lista.length > 0) {
                var horasSumadas = sumarHoras(lista)
                for(var i = 0; i < lista.length; i++){
                    if((lista[i][0] != null)){
                        primerElemento = true
                        var horasSumadas = sumarHoras(lista[i])
                        for(var j = 0; j < lista[i].length; j++){
                                //console.log(lista[i][j])
                                //console.log("un proyecto")
                                //setElementosTabla([...elementosTabla, <ElementoCompletoReporte dato={lista[i]}/>])
                                if(primerElemento){
                                    listaElementos.push(<ElementoCompletoReporteTrabajadores cantidadElementos={lista[i].length} dato={lista[i][j]} horasSumadas={horasSumadas}/>)
                                    primerElemento = false
                                }
                                else{
                                    listaElementos.push(<ElementoParcialReporteTrabajadores dato={lista[i][j]}/>)
                                }

                                
                                //index+=1
                            }
                        }
                    else{
                        //console.log(lista[i])
                        if(primerElemento){
                            listaElementos.push(<ElementoCompletoReporteTrabajadores cantidadElementos={lista.length} dato={lista[i]} horasSumadas={horasSumadas}/>)
                            primerElemento = false
                        }
                        else{
                            listaElementos.push(<ElementoParcialReporteTrabajadores dato={lista[i]}/>)
                        }
                        //index+=1
                        //setElementosTabla((elementosTabla) => [...elementosTabla, <ElementoCompletoReporte dato={lista[i]}/>])
                    }
                }
                
            }
        });
        //console.log(listaElementos)
        setElementosTabla(listaElementos)
    }

    function sumarHoras(lista){
        var horasSumadas = 0;
        for(var i = 0; i < lista.length; i++){
            if((lista[i][0] != null)){
                for(var j = 0; j < lista[i].length; j++){
                    horasSumadas += lista[i][j].cantidadDeHorasTrabajadas
                }
            }
            else{
                horasSumadas += lista[i].cantidadDeHorasTrabajadas
            }
        }
        //console.log(horasSumadas)
        return horasSumadas
    }

    function verTareas(){
        navigate("/recursos-humanos/tareas");
    }

    return (
        <div className="body">
            <div className="options-container">
                <div className="report-title">
                    <p>Reportes</p>
                    <img src={reportes} alt="" />
                </div>
                <div className="add-button-container">
                    <p>Volver</p>
                    <input
                        className="add-button contain"
                        type="image"
                        src={volverIcon}
                        onClick={volver}
                    />
                </div>
                <div className="options-div">
                    <div className="option-section">
                        <p>Indique el/la trabajor/a del cual desea generar el reporte:</p>
                        <select name="" id="select-report" onChange={(event) => setEmpleadoActual(event.target.value)}>
                            <option disabled selected value="">Seleccione el trabajador</option>
                            {empleados.map((empleado) => {
                                return <option value={empleado.legajo}>{empleado.legajo} - {empleado.Nombre} {empleado.Apellido}</option>;
                                })}
                        </select>
                    </div>
                    <div className="option-section">
                        <p>Indique entre  que fechas desea generar el reporte:</p>
                        <div className="date-div">
                            <p>Entre</p>
                            <input type="date" name="" id="calendar-min" onChange={useEstablecerMinimo}/>
                            <p>y</p>
                            <input type="date" name="" id="calendar-max" onChange={useEstablecerMaximo}/>
                        </div>
                        <input type="button" value="Generar" className="generarButton" onClick={generarReporte}/>
                    </div>
                </div>
            </div>

            <table>
                {elementosTabla?.map((elemento) =>{
                    //console.log(elemento)
                    return elemento
                })}
            </table>
        </div>
    )}

export default GenerarReportesTrabajador;
