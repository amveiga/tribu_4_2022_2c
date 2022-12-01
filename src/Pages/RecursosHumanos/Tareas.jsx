import { useNavigate, useParams } from "react-router-dom";

import "./../../Styles/RecursosHumanos/BarraInformacion.css";
import "./../../Styles/RecursosHumanos/Botones.css";
import "./../../Styles/RecursosHumanos/Tareas.css";

import fotoPerfil from "./../../Img/RecursosHumanos/perfil.png";
import imagenValidar from "./../../Img/RecursosHumanos/yes_icon.png";
import imagenRechazar from "./../../Img/RecursosHumanos/no_icon.png";
import imagenEnviar from "./../../Img/RecursosHumanos/enviar_icon.png";

import FichaEmpleado from "../../Components/RecursosHumanos/FichaEmpleado";

import ContenedorTareas from "../../Components/RecursosHumanos/ContenedorTareas";

import { useEffect, useState } from "react";
import axios from "axios";

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
      await axios.put(
        `https://squad1220222c-production.up.railway.app/recursos/${tareaEditable.tareaDelParteDeHoraId}/nuevo_estado`,
        {
          cantidadDeHorasTrabajadas: tareaEditable.cantidadDeHorasTrabajadas,
          estado: estado,
          fechaDeLaTareaACargar: tareaEditable.fechaDeLaTareaACargar,
          parteDeHoraId: tareaEditable.parteDeHoraId,
          proyectoId: tareaEditable.proyectoId,
          tareaDelParteDeHoraId: tareaEditable.tareaDelParteDeHoraId,
          tareaId: tareaEditable.tareaId,
          tipoDeParteDeHoras: tareaEditable.tipoDeParteDeHoras,
        }
      );
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
            className="task-button back-button"
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

        {/* Aprobado */}
        {aprobadas.length !== 0 && (
          <div className="hours-section">
            <div className="hours-section-container">
              <div className="border-task-start">
                <p>Aprobado</p>
              </div>
              <ContenedorTareas
                setTareaEditable={setTareaEditable}
                tareas={aprobadas}
              />
              <div className="border-task-end"></div>
            </div>
          </div>
        )}
        {borradores.length !== 0 && (
          <div className="hours-section">
            <div className="hours-section-container">
              <div className="border-task-start">
                <p>Borrador</p>
              </div>
              <ContenedorTareas
                setTareaEditable={setTareaEditable}
                tareas={borradores}
              />
              <div className="border-task-end"></div>
            </div>
            <div
              className="border-button"
              onClick={() => cambiarEstado("VALIDACION_PENDIENTE")}
            >
              <img src={imagenEnviar} alt="" width={"70%"} />
            </div>
          </div>
        )}
        {pendientes.length !== 0 && (
          <div className="hours-section">
            <div className="hours-section-container">
              <div className="border-task-start">
                <p>Pendiente Validación</p>
              </div>
              <ContenedorTareas
                setTareaEditable={setTareaEditable}
                tareas={pendientes}
              />
              <div className="border-task-end"></div>
            </div>
            <div
              className="border-button"
              onClick={() => cambiarEstado("APROBADO")}
            >
              <img src={imagenValidar} alt="" />
            </div>
            <div
              className="border-button"
              onClick={() => cambiarEstado("DESAPROBADO")}
            >
              <img src={imagenRechazar} alt="" width={"70%"} />
            </div>
          </div>
        )}
        {desaprobadas.length !== 0 && (
          <div className="hours-section">
            <div className="hours-section-container">
              <div className="border-task-start">
                <p>Desaprobado</p>
              </div>
              <ContenedorTareas
                setTareaEditable={setTareaEditable}
                tareas={desaprobadas}
              />
              <div className="border-task-end"></div>
            </div>
          </div>
        )}
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
                className="edit-input"
                value={
                  tareaEditable
                    ? tareaEditable.fechaDeLaTareaACargar.split("T")[0]
                    : ""
                }
              />
            </div>
            {/* <div className="edit-element">
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
            </div> */}
            <div className="edit-element">
              <p>Cantidad de horas trabajadas</p>
              <input
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