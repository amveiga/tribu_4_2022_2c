import restarIcon from "./../../Img/RecursosHumanos/restar_icon.png"

function ElementoCarga(parametros){
    console.log(parametros)

    var nElemento = parametros.nElemento;

    function cambiarSeccion(){
        var select = document.getElementById("task-type");
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

    function pedirDatos(){
        return "6"
    }

    return (
        <div className="carga-element">
            <div className="add-hours-button">
                <img src={restarIcon} alt="" />
            </div>
            <form action="">
                <div className="work-mode-div">
                    <input type="date" className="calendar"/>
                </div>
                <select name="task-type" id="task-type" className="hours-select" onChange={() => {cambiarSeccion()}}>
                    <option disabled selected hidden value="">Tipo de tarea</option>
                    <option value="proyecto">Proyecto</option>
                    <option value="incidencia">Incidencia</option>
                    <option value="administrativa">Administrativa</option>
                    <option value="guardia">Guardia</option>
                    <option value="licencia">Licencia</option>
                </select>
                
                {/* Proyecto */}
                <div className="div-loader hidden">
                    <div className="sub-div-loader">
                        <div className="div-section">
                            <select name="project-task" id="project-task" className="hours-select">
                                <option disabled selected value="">Nombre del proyecto</option>
                                <option value="tarea1">Nombre del proyecto 1</option>
                                <option value="tarea2">Nombre del proyecto 2</option>
                            </select>
                        </div>
                        <div className="div-section">
                            <select name="project-task" id="project-task" className="hours-select">
                                <option disabled selected hidden value="">Nombre de la tarea</option>
                                <option value="tarea1">Nombre del proyecto 1</option>
                                <option value="tarea2">Nombre del proyecto 2</option>
                            </select>
                        </div>
                        <div className="div-section">
                            <div className="work-mode-div">
                                <input type="number" placeholder="Cantidad de horas"/>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Incidencia */}
                <div className="div-loader hidden">
                    <div className="sub-div-loader">
                        <div className="div-section">
                            <select name="project-task" id="project-task" className="hours-select">
                                <option disabled selected hidden value="">Nombre del ticket</option>
                                <option value="tarea1">Ticket 1</option>
                                <option value="tarea2">Ticket 2</option>
                            </select>
                        </div>
                        <div className="div-section">
                            <div className="work-mode-div">
                                <input type="number" placeholder="Cantidad de horas"/>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Administrativa */}
                <div className="div-loader hidden">
                    <div className="sub-div-loader">
                        <div className="div-section">
                            <select name="project-task" id="project-task" className="hours-select">                                
                                <option disabled selected hidden value="">Tarea administrativa</option>
                                <option value="tarea1">Reunión</option>
                                <option value="tarea2">Capacitación</option>
                                <option value="tarea2">Curso</option>                                    
                            </select>
                        </div>
                        <div className="div-section">
                            <select name="project-task" id="project-task" className="hours-select">
                                <option disabled selected hidden value="">Sector de la reunión</option>
                                <option value="tarea1">Marketing</option>
                                <option value="tarea2">Recursos Humanos</option>
                                <option value="tarea2">Operaciones</option>
                                <option value="tarea2">Ventas</option>
                                <option value="tarea2">Administración y Finanzas</option>
                                <option value="tarea2">Cliente</option>
                                <option value="tarea2">Otro</option>
                            </select>
                        </div>
                        <div className="div-section">
                            <div className="work-mode-div">
                                <input type="number" placeholder="Cantidad de horas"/>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Guardia */}
                <div className="div-loader hidden">
                    <div className="div-section">
                        <div className="work-mode-div">
                            <input type="number" placeholder="Cantidad de horas"/>
                        </div>
                    </div>
                </div>

                {/* Licencia */}
                <div className="div-loader hidden">
                    <div className="sub-div-loader">
                        <div className="div-section">
                            <select name="project-task" id="project-task" className="hours-select">
                                <option disabled selected hidden value="">Tipo de licencia</option>
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
                            </select>
                        </div>
                        <div className="div-section">
                            <div className="work-mode-div">
                                <input type="number" placeholder="Cantidad de horas"/>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ElementoCarga;