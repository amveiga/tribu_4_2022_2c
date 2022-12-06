import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";

import reportStyle from "./../../Styles/RecursosHumanos/Reportes.css";

import reportes from "./../../Img/RecursosHumanos/reportes_icon.png";
import { useEffect, useState } from "react";
import axios from "axios";

import ElementoHeaderReporteProyectos from "../../Components/RecursosHumanos/ElementoHeaderReporteProyectos";
import ElementoReporteProyectos from "../../Components/RecursosHumanos/ElementoReporteProyectos";

function GenerarReportesProyecto() {
    const [proyectos, setProyectos] = useState([])
    const [proyectoActual, setProyectoActual] = useState(null)
    const [fechaMinima, setFechaMinima] = useState("")
    const [fechaMaxima, setFechaMaxima] = useState("")
    const [elementosTabla, setElementosTabla] = useState([])
    const [tareas, setTareas] = useState([])
    const [horasTotal, setHorasTotal] = useState(0)
    const [horasEstimadas, setHorasEstimadas] = useState(0)
    const [horasDesvio, setHorasDesvio] = useState(0)

    let navigate = useNavigate();

    useEffect(() => {
        const getProyectos = async () => {
            await axios
            .get("https://squad11-proyectos.onrender.com/api/projects")
            .then((res) => {
                setProyectos(res.data);
                //console.log(res.data)
            });
        };
    
        getProyectos();
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
        //console.log(proyectoActual)
        setHorasTotal(proyectos.filter((proyecto) => proyecto._id === proyectoActual)[0].invertedHours)

        const fechaInicial = new Date(proyectos.filter((proyecto) => proyecto._id === proyectoActual)[0].idealInitDate);
        const fechaFinal = new Date(proyectos.filter((proyecto) => proyecto._id === proyectoActual)[0].idealEndDate);
        const diffTime = Math.abs(fechaFinal-fechaInicial);
        const diffHours = Math.ceil(diffTime/(1000*60*60*24))*8;
        setHorasEstimadas(diffHours);

        setHorasDesvio((proyectos.filter((proyecto) => proyecto._id === proyectoActual)[0].invertedHours)-diffHours)

        console.log("Desvio:" + horasDesvio);

        var operation = await axios.get(
            /*"https://squad1220222c-production.up.railway.app/reportes/tareas/fechas?fechaFin=" +  + "&fechaInicio=" + fechaMinima*/
            //"https://squad1220222c-production.up.railway.app/reportes/?fechaFin=" + fechaMaxima + "&fechaInicio=" + fechaMinima + "&legajo=" + empleadoActual
            "https://squad11-proyectos.onrender.com/api/tasks/project/" + proyectoActual
            )
        .then(res =>{
            //setDatos(res)
            setTareas(res.data)
            //sumarHoras(res.data)
        }
        
        )
        
        
    }

    function ordenarDatos(datos){
        console.log(datos)
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

    function sumarHoras(datos){
        var horasSumadas = 0
        for(var i = 0; i < datos.length; i++){
            horasSumadas += 4 //TODO
        }
        setHorasTotal(horasSumadas)
    }

    const cargarTabla = (listaDatos) =>{
        var listaElementos = [[
            <tr>
                <th className="type-task-grid">Tipo de tarea</th>
                <th className="task-grid">Tareas</th>
                <th className="time-grid">Tiempo total por tareas</th>
                <th className="total-time-grid">Tiempo total</th>
            </tr>
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
                                    listaElementos.push(<ElementoReporteProyectos cantidadElementos={lista[i].length} dato={lista[i][j]} horasSumadas={horasSumadas}/>)
                                    primerElemento = false
                                }
                                else{
                                    listaElementos.push(<ElementoReporteProyectos dato={lista[i][j]}/>)
                                }

                                
                                //index+=1
                            }
                        }
                    else{
                        //console.log(lista[i])
                        if(primerElemento){
                            listaElementos.push(<ElementoReporteProyectos cantidadElementos={lista.length} dato={lista[i]} horasSumadas={horasSumadas}/>)
                            primerElemento = false
                        }
                        else{
                            listaElementos.push(<ElementoReporteProyectos dato={lista[i]}/>)
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

    /*function sumarHoras(lista){
        var horasSumadas = 0;
        console.log()
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
    }*/

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
                        <p>Indique el proyecto del cual desea generar el reporte:</p>
                        <select name="" id="select-report" onChange={(event) => setProyectoActual(event.target.value)}>
                            <option disabled selected value="">Seleccione el proyecto</option>
                            {proyectos.map((proyecto) => {
                                return <option value={proyecto._id}>{proyecto._id} - {proyecto.name}</option>;
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

            <div className="report-container hidden">
                <div className="fixed-data">
                    <div className="fixed-data-section">
                        <div className="fixed-data-section-title">Horas totales</div>
                        <div className="fixed-data-section-data">{horasTotal} Hs</div>
                    </div>
                    <div className="fixed-data-section">
                        <div className="fixed-data-section-title">Horas estimadas</div>
                        <div className="fixed-data-section-data">{horasEstimadas} Hs</div>
                    </div>
                    <div className="fixed-data-section">
                        <div className="fixed-data-section-title">Desvío</div>
                        <div className="fixed-data-section-data">{horasDesvio} Hs</div>
                    </div>
                </div>

                <table className="project-table">
                    <ElementoHeaderReporteProyectos/>
                    {tareas?.map((tarea) => {
                        document.getElementsByClassName("report-container")[0].classList.remove("hidden")
                        return <ElementoReporteProyectos dato={tarea} horasTotal={horasTotal} setHorasTotal={setHorasTotal}/>
                    })}
                </table>

            </div>

            
        </div>
    )}

export default GenerarReportesProyecto;