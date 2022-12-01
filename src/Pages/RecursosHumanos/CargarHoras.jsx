import { useNavigate, useParams } from "react-router-dom";

import "./../../Styles/RecursosHumanos/BarraInformacion.css";
import "./../../Styles/RecursosHumanos/Botones.css";
import "./../../Styles/RecursosHumanos/Cargas.css";

import enviarIcon from "./../../Img/RecursosHumanos/enviar_icon.png";
import borradorIcon from "./../../Img/RecursosHumanos/borrador_icon.png";
import cancelarIcon from "./../../Img/RecursosHumanos/cancelar_icon.png";

import ElementoCarga from "../../Components/RecursosHumanos/ElementoCarga";
import { useState } from "react";
import axios from "axios";

function CargarHoras() {
  const [fecha, setFecha] = useState(new Date().toISOString().substring(0, 10));
  const [tipo, setTipo] = useState("");
  const [proyecto, setProyecto] = useState();
  const [tarea, setTarea] = useState();
  const [cantidadHoras, setCantidadHoras] = useState(0);
  const [descripcion, setDescripcion] = useState("");
  let empleadoID = useParams();

  let navigate = useNavigate();

  function volver() {
    navigate("/recursos-humanos/" + empleadoID.empleadoId + "/tareas");
  }

  function getDescripcion() {
    var d = "";
    if (tipo === "guardia") {
      d = "Guardia de " + fecha;
    } else if (tipo === "incidencia") {
      d = "Incidencia";
    }
    if (d === "") {
      return descripcion;
    } else {
      return d;
    }
  }

  async function guardar(estado) {
    var body = [
      {
        cantidadDeHorasTrabajadas: parseInt(cantidadHoras),
        descripcion: tipo === "tarea_proyecto" ? "" : getDescripcion(),
        estado: estado.toString(),
        fechaDeLaTareaACargar: fecha,
        parteDeHoraId: 0,
        proyectoId:
          tipo === "tarea_proyecto" || tipo === "incidencia" ? proyecto : "",
        tareaDelParteDeHoraId: 0,
        tareaId: tipo === "tarea_proyecto" ? tarea : "",
        tipoDeTarea: tipo.toUpperCase(),
      },
    ];
    await axios.post(
      `https://squad1220222c-production.up.railway.app/recursos/${empleadoID.empleadoId}/parte_de_horas`,
      body
    );
    volver();
  }

  return (
    <div className="body-hours">
      <div className="horas-title">
        <p>Cargar horas</p>
      </div>
      <div className="carga-main">
        <ElementoCarga
          setFecha={setFecha}
          setTipo={setTipo}
          setProyecto={setProyecto}
          setTarea={setTarea}
          setCantidadHoras={setCantidadHoras}
          setDescripcion={setDescripcion}
          proyecto={proyecto}
          tarea={tarea}
          cantidadHoras={cantidadHoras}
          tipo={tipo}
          descripcion={descripcion}
          fecha={fecha}
        />
      </div>
      <div className="carga-main"></div>
      <div className="buttons-div">
        <div className="button cancelar" onClick={volver}>
          <p>Cancelar</p>
          <img src={cancelarIcon} alt="" />
        </div>
        <div
          className="button verificar"
          onClick={() => guardar("VALIDACION_PENDIENTE")}
        >
          <p>Enviar para verificar</p>
          <img src={enviarIcon} alt="" />
        </div>
        <div className="button bborrador" onClick={() => guardar("BORRADOR")}>
          <p>Guardar como borrador</p>
          <img src={borradorIcon} alt="" />
        </div>
      </div>
    </div>
  );
}

export default CargarHoras;
