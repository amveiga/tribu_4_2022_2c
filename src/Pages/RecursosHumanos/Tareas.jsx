import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useParams,
} from "react-router-dom";

import "./../../Styles/RecursosHumanos/BarraInformacion.css";
import "./../../Styles/RecursosHumanos/Tareas.css";

import fotoPerfil from "./../../Img/RecursosHumanos/perfil.png";
import imagenModificar from "./../../Img/RecursosHumanos/modificar_icon.png";
import imagenBorrar from "./../../Img/RecursosHumanos/borrar_icon.png";
import imagenValidar from "./../../Img/RecursosHumanos/yes_icon.png";
import imagenRechazar from "./../../Img/RecursosHumanos/no_icon.png";
import imagenEnviar from "./../../Img/RecursosHumanos/enviar_icon.png";
import imagenNewModificar from "./../../Img/RecursosHumanos/modificar_icon_new.png";
import imagenNewBorrar from "./../../Img/RecursosHumanos/borrar_icon_new.png";

import FichaEmpleado from "../../Components/RecursosHumanos/FichaEmpleado";

import ContenedorTareas from "../../Components/RecursosHumanos/ContenedorTareas";
import SegmentoTarea from "../../Components/RecursosHumanos/SegmentoTarea";
import TareaCarta from "../../Components/RecursosHumanos/TareaCarta";

import { useEffect, useState } from "react";
import axios from "axios";
import ReactLoading from "react-loading";

function Tareas() {
  const [isLoading, setLoading] = useState(true);
  const [empleado, setPost] = useState([]);
  const [aprobadas, setAprobadas] = useState([]);
  const [borradores, setBorradores] = useState([]);
  const [pendientes, setPendientes] = useState([]);
  const [desaprobadas, setDesaprobadas] = useState([]);
  const [tareaEditable, setTareaEditable] = useState();
  const [horasModificadas, setHorasModificadas] = useState(0);

  useEffect(() => {
    var empleadosRes;
    var tareasRes;
    const getEmpleado = async () => {
      empleadosRes = await axios.get(
        `https://squad1220222c-production.up.railway.app/recursos/${empleadoID.empleadoId}`
      );
      setPost(empleadosRes.data);
    };
    const getTareas = async () => {
      tareasRes = await axios
        .get(
          `https://squad1220222c-production.up.railway.app/recursos/${empleadoID.empleadoId}/tareas`
        )
        .then(setLoading(false));

      setAprobadas(
        tareasRes.data.filter((tarea) => tarea.estado === "APROBADO")
      );
      setBorradores(
        tareasRes.data.filter((tarea) => tarea.estado === "BORRADOR")
      );
      setPendientes(
        tareasRes.data.filter(
          (tarea) => tarea.estado === "VALIDACION_PENDIENTE"
        )
      );
      setDesaprobadas(
        tareasRes.data.filter((tarea) => tarea.estado === "DESAPROBADO")
      );
    };

    getTareas();
    getEmpleado();
  });

  let navigate = useNavigate();

  let empleadoID = useParams();

  function cargarHoras() {
    navigate(
      "/recursos-humanos/" + empleadoID.empleadoId + "/tareas/cargar-horas"
    );
  }

  function volver() {
    navigate("/recursos-humanos/");
  }


  function ocultarModoEditar() {
    var editMenu = document.getElementById("edit");
    editMenu.classList.add("hidden");
  }

  async function guardarCambios() {
    try{
      await axios.put(
        `https://squad1220222c-production.up.railway.app/recursos/${tareaEditable.tareaDelParteDeHoraId}/horas_trabajadas`,
        {
          cantidadDeHorasTrabajadas: horasModificadas,
          estado: tareaEditable.estado,
          fechaDeLaTareaACargar: tareaEditable.fechaDeLaTareaACargar,
          parteDeHoraId: tareaEditable.parteDeHoraId,
          proyectoId: tareaEditable.proyectoId,
          tareaDelParteDeHoraId: tareaEditable.tareaDelParteDeHoraId,
          tareaId: tareaEditable.tareaId,
          tipoDeParteDeHoras: tareaEditable.tipoDeParteDeHoras,
        }
      );
      if (tareaEditable.estado === "DESAPROBADO") {
        cambiarEstado("BORRADOR");
      }
      ocultarModoEditar();
    }
    catch(error){
      window.alert(error.response.data.message)
    }
  }

  async function cambiarEstado(estado) {
    if (estado === "VALIDACION_PENDIENTE") {
      borradores.forEach(async (borrador) => {
        await axios.put(
          `https://squad1220222c-production.up.railway.app/recursos/${borrador.tareaDelParteDeHoraId}/nuevo_estado`,
          {
            cantidadDeHorasTrabajadas: borrador.cantidadDeHorasTrabajadas,
            estado: estado,
            fechaDeLaTareaACargar: borrador.fechaDeLaTareaACargar,
            parteDeHoraId: borrador.parteDeHoraId,
            proyectoId: borrador.proyectoId,
            tareaDelParteDeHoraId: borrador.tareaDelParteDeHoraId,
            tareaId: borrador.tareaId,
            tipoDeParteDeHoras: borrador.tipoDeParteDeHoras,
          }
        );
      });
    } else if (estado === "BORRADOR") {
        desaprobadas.forEach(async (desaprobado) => {
          await axios.put(
            `https://squad1220222c-production.up.railway.app/recursos/${desaprobado.tareaDelParteDeHoraId}/nuevo_estado`,
            {
              cantidadDeHorasTrabajadas: desaprobado.cantidadDeHorasTrabajadas,
              estado: estado,
              fechaDeLaTareaACargar: desaprobado.fechaDeLaTareaACargar,
              parteDeHoraId: desaprobado.parteDeHoraId,
              proyectoId: desaprobado.proyectoId,
              tareaDelParteDeHoraId: desaprobado.tareaDelParteDeHoraId,
              tareaId: desaprobado.tareaId,
              tipoDeParteDeHoras: desaprobado.tipoDeParteDeHoras,
            }
          );
        })
    } else {
      pendientes.forEach(async (pendiente) => {
        await axios.put(
          `https://squad1220222c-production.up.railway.app/recursos/${pendiente.tareaDelParteDeHoraId}/nuevo_estado`,
          {
            cantidadDeHorasTrabajadas: pendiente.cantidadDeHorasTrabajadas,
            estado: estado,
            fechaDeLaTareaACargar: pendiente.fechaDeLaTareaACargar,
            parteDeHoraId: pendiente.parteDeHoraId,
            proyectoId: pendiente.proyectoId,
            tareaDelParteDeHoraId: pendiente.tareaDelParteDeHoraId,
            tareaId: pendiente.tareaId,
            tipoDeParteDeHoras: pendiente.tipoDeParteDeHoras,
          }
        );
        if(estado === "APROBADO" && pendiente.tipoDeTarea === "TAREA_PROYECTO"){
          await axios.put(
            `https://squad11-proyectos.onrender.com/api/projects/${pendiente.proyectoId}/hours`, 
            {
              hours: pendiente.cantidadDeHorasTrabajadas,
            }
          );
          await axios.put(
            `https://squad11-proyectos.onrender.com/api/tasks/${pendiente.tareaId}/hours`,
            {
              hours: pendiente.cantidadDeHorasTrabajadas,
            }
          )
        }
      });
    }
  }

  if (isLoading) {
    return <div>Cargando!!</div>;
  }

  return (
    <div className="body">
      <div id="data-bar">
        <img src={fotoPerfil} alt="" id="profile-image" />
        <FichaEmpleado key={empleadoID.empleadoId} empleado={empleado} />

        <div className="button-container">
          <input
            className="back-button"
            type="button"
            value="Volver"
            onClick={volver}
          />
        </div>
      </div>
      <div id="main">
        {/* Boton carga */}
        <div className="add-button-container">
          <p>Cargar horas</p>
          <input
            className="add-button"
            type="button"
            value="+"
            onClick={cargarHoras}
          />
        </div>

        
        {/* BORRADOR */}
        <div className="task-type-container">
            <div className="borrador task-type-name">
              <p>BORRADOR</p>
            </div>
            <div className="task-buttons">
              <div className="task-button pendiente" onClick={() => cambiarEstado("VALIDACION_PENDIENTE")}>Enviar todos a pendiente validacion</div>
            </div>
            <div className="task-container">
              {borradores?.map((tarea) => {
                return <TareaCarta tarea={tarea} setTareaEditable={setTareaEditable}/>
              })}
            </div>
        </div>
        {/* PENDIENTE VALIDACION */}
        <div className="task-type-container">
          <div className="task-type-name pendiente">
            <p>PENDIENTE VALIDACIÓN</p>
          </div>
          <div className="task-buttons">
            <div className="task-button aprobado" onClick={() => cambiarEstado("APROBADO")}>Aprobar todos</div>
            <div className="task-button desaprobado" onClick={() => cambiarEstado("DESAPROBADO")}>Desaprobar todos</div>
          </div>
            <div className="task-container">
                {pendientes?.map((tarea) => {
                  return <TareaCarta tarea={tarea} setTareaEditable={setTareaEditable}/>
                })}
            </div>
        </div>
        {/* APROBADO */}
        <div className="task-type-container">
          <div className="aprobado task-type-name">
            <p>APROBADO</p>
          </div>
          <div className="task-buttons">
            
          </div>
          <div className="task-container">
            <div className="task-container">
                {aprobadas?.map((tarea) => {
                  return <TareaCarta tarea={tarea} setTareaEditable={setTareaEditable}/>
                })}
            </div>
          </div>
        </div>
        {/* DESAPROBADO */}
        <div className="task-type-container">
          <div className="task-type-name desaprobado">
            <p>DESAPROBADO</p>
          </div>
          <div className="task-buttons">
            <div className="task-button borrador" onClick={() => cambiarEstado("BORRADOR")}>Enviar todos a borrador</div>
          </div>
          <div className="task-container">
            <div className="task-container">
                {desaprobadas?.map((tarea) => {
                  return <TareaCarta tarea={tarea} setTareaEditable={setTareaEditable}/>
                })}
            </div>
          </div>
        </div>
      </div>
      <div id="edit" className="hidden">
        <div className="not-clickeable">
          <div className="edit-title">
            <p>Editar tarea</p>
          </div>
          <div className="edit-container">
            <div className="edit-element">
              <p>Fecha de la tarea</p>
              <input
                disabled={true}
                type="date"
                className="edit-input input"
                value={
                  tareaEditable
                    ? tareaEditable.fechaDeLaTareaACargar.split("T")[0]
                    : ""
                }
              />
            </div>
            <div className="edit-element">
              <p>Cantidad de horas trabajadas</p>
              <input
                min={1}
                type="number"
                className="edit-input"
                defaultValue={
                  tareaEditable ? tareaEditable.cantidadDeHorasTrabajadas : ""
                }
                onChange={(event) =>
                  setHorasModificadas(parseInt(event.target.value))
                }
              />
            </div>
          </div>
          <div className="edit-button-container">
            <div className="edit-cancel-button" onClick={ocultarModoEditar}>
              <p>Cancelar</p>
            </div>
            <div className="edit-save-button" onClick={guardarCambios}>
              <p>Guardar cambios</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tareas;
