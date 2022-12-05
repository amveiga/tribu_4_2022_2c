import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";

import reportStyle from "./../../Styles/RecursosHumanos/Reportes.css";

import reportes from "./../../Img/RecursosHumanos/reportes_icon.png";
import { useEffect, useState } from "react";
import axios from "axios";

import ElementoCompletoReporte from "../../Components/RecursosHumanos/ElementoCompletoReporte";
import ElementoParcialReporte from "../../Components/RecursosHumanos/ElementoParcialReporte";

function GenerarReportesTrabajador() {
    const [empleados, setEmpleados] = useState([])
    const [loading, setLoading] = useState(true)
    const [empleadoActual, setEmpleadoActual] = useState(null)
    const [fechaMinima, setFechaMinima] = useState("")
    const [fechaMaxima, setFechaMaxima] = useState("")
    const [datos, setDatos] = useState(null)
    const [listaDatos, setListaDatos] = useState([])
    const [elementosTabla, setElementosTabla] = useState([])

    let navigate = useNavigate();

    useEffect(() => {
        const getEmpleados = async () => {
            await axios
            .get("https://squad1220222c-production.up.railway.app/recursos")
            .then((res) => {
                setEmpleados(res.data);
                setLoading(false);
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
        //console.log(fechaMaxima)
        if(fechaMinima == null || fechaMaxima == null) {
            return
        }
        //console.log("reporte realizado!!")
        var operation = await axios.get(
            "https://squad1220222c-production.up.railway.app/reportes/tareas/fechas?fechaFin=" + fechaMaxima + "&fechaInicio=" + fechaMinima
        )
        .then(res =>{
            //console.log(res)
            //setDatos(res)
            ordenarDatos(res.data)
        }
        
        )
        
        
    }

    function graficarDatos(datos){
        if(datos){
            datos.map((dato) => {
                return <ElementoCompletoReporte/>
            })
        }
        
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

        setListaDatos(listaCompleta)
        cargarTabla(listaCompleta)
    }

    

    const cargarTabla = (listaDatos) =>{
        
        listaDatos.forEach(lista => {
            if(lista.length > 0) {
                for(var i = 0; i < lista.length; i++){
                    if((lista[i][0] != null)){
                        for(var j = 0; j < lista[i].length; j++){
                                console.log(lista[i][j])
                                //console.log("un proyecto")
                            }
                        }
                    else{
                        console.log(lista[i])
                        setElementosTabla([...elementosTabla, <ElementoCompletoReporte dato={listaDatos}/>])
                    }
                }
                
            }
        });
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
                <div className="options-div">
                    <div className="option-section">
                        <p>Indique el/la trabajor/a del cual desea generar el reporte:</p>
                        <select name="" id="select-report" onChange={(event) => setEmpleadoActual(event.target.value)}>
                        <option disabled selected onChange={(event) => setEmpleadoActual(event.target.value)} value="">Seleccione el trabajador</option>
                        {empleados.map((empleado) => {
                            return <option value="">{empleado.legajo} - {empleado.Nombre} {empleado.Apellido}</option>;
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
                <tr>
                    <th className="type-task-grid">Tipo de tarea</th>
                    <th className="task-grid">Tareas</th>
                    <th className="time-grid">Tiempo total por tareas</th>
                    <th className="total-time-grid">Tiempo total</th>
                </tr>
                {/*listaDatos?.map((listaDatos) => {
                    cargarTabla(listaDatos)
                })*/}
                {console.log(elementosTabla)}
                
                {elementosTabla?.map((elemento) =>{
                    //console.log(elemento)
                    return elemento
                })}
                <tr>
                    <th className="type-task-grid" rowSpan={3}>Nombre del proyecto 2</th>
                    <th className="task-grid">Tarea 5</th>
                    <th className="time-grid">10 Hs</th>
                    <th className="total-time-grid" rowSpan={3}>24 Hs</th>
                </tr>

                <tr>
                    <th className="task-grid">Tarea 7</th>
                    <th className="time-grid">12 Hs</th>
                </tr>
                <tr>
                    <th className="task-grid">Tarea 10</th>
                    <th className="time-grid">2 Hs</th>
                </tr>
                <tr>
                <th className="type-task-grid" rowSpan={2}>Guardias</th>
                    <th className="task-grid">Guardia 3</th>
                    <th className="time-grid">4 Hs</th>
                    <th className="total-time-grid" rowSpan={2}>9 Hs</th>
                </tr>
                <tr>
                    <th className="task-grid">Guardia 4</th>
                    <th className="time-grid">5 Hs</th>
                </tr>
                <tr>
                    <th className="type-task-grid" rowSpan={2}>Administrativas</th>
                    <th className="task-grid">Reunión Marketing</th>
                    <th className="hour-grid">2 Hs</th>
                    <th className="total-hour-grid" rowSpan={2}>3 Hs</th>
                </tr>
                <tr>
                    <th className="task-grid">Curso RCP</th>
                    <th className="hour-grid">1 Hs</th>
                </tr>
                <tr>
                    <th className="type-task-grid" rowSpan={2}>Licencias</th>
                    <th className="task-grid">Licencia por enfermedad</th>
                    <th className="time-grid">48 Hs</th>
                    <th className="total-time-grid" rowSpan={2}>50 Hs</th>
                </tr>
                <tr>
                    <th className="task-grid">Licencia diaria</th>
                    <th className="time-grid">2 Hs</th>
                </tr>
            </table>
        </div>
    )}

export default GenerarReportesTrabajador;
