import axios from "axios";

const URL_TICKETS =
  "https://fiuba-memo1-api-soporte.azurewebsites.net/api/v1/tickets";
const URL_COMENTARIOS =
  "https://fiuba-memo1-api-soporte.azurewebsites.net/api/v1/comments";
const URL_RECURSOS = "https://squad1220222c-production.up.railway.app/recursos";
const URL_TAREAS = "https://squad11-proyectos.onrender.com/api/tasks";
const URL_CLIENTES =
  "https://anypoint.mulesoft.com/mocking/api/v1/sources/exchange/assets/754f50e8-20d8-4223-bbdc-56d50131d0ae/clientes-psa/1.0.0/m/api/clientes";
const URL_PROYECTOS = "https://squad11-proyectos.onrender.com/api/projects";

//Tickets
export async function GetTickets(setLoading, setError, filtros) {
  var response;
  if (filtros !== "") {
    response = GetWithFilter(filtros, setLoading, setError);
  } else {
    response = await axios
      .get(URL_TICKETS)
      .then(
        setTimeout(() => {
          setLoading(false);
        }, 2000)
      )
      .catch((error) => setError(true));
  }
  return response;
}

export async function PostTicket(body) {
  await axios.post(URL_TICKETS, body);
}

export async function UpdateTicket(id, body) {
  await axios.put(URL_TICKETS + "/" + id, body);
}

export async function DeleteTicket(id) {
  await axios.delete(URL_TICKETS + "/" + id);
}

async function GetWithFilter(filtros, setLoading, setError) {
  var response = await axios
    .get(URL_TICKETS + "?" + filtros)
    .then(
      setTimeout(() => {
        setLoading(false);
      }, 2000)
    )
    .catch((error) => setError(true));
  return response;
}

//Comentarios
export async function GetComentarios(setError, id) {
  var response = await axios
    .get(URL_COMENTARIOS + "/" + id)
    .catch((error) => setError(true));
  return response;
}

export async function PostComentario(body) {
  axios.post(URL_COMENTARIOS, body);
}

export async function UpdateComentario(id, body) {
  await axios.put(URL_COMENTARIOS + "/" + id, body);
}

export async function DeleteComentario(id) {
  await axios.delete(URL_COMENTARIOS + "/" + id);
}

export async function DeleteComentarios(id) {
  await axios.delete(URL_COMENTARIOS + "/ticket-id/" + id);
}

//Recursos
export async function GetRecursos(setError) {
  var response = await axios.get(URL_RECURSOS).catch((error) => setError(true));
  return response;
}

export async function GetRecurso(id, setError) {
  var response = await axios
    .get(URL_RECURSOS + "/" + id)
    .catch((error) => setError(true));
  return response;
}

//Tareas
export async function GetTarea(id, setError) {
  var response = await axios
    .get(URL_TAREAS + "/" + id)
    .catch((error) => setError(true));
  return response;
}

export async function PostTarea(body) {
  var response = await axios.post(URL_TAREAS, body);
  return response;
}

export async function DeleteTarea(id, setError) {
  await axios.delete(URL_TAREAS + "/" + id).catch((error) => setError(true));
}

//Clientes
export async function GetClientes(setError) {
  var response = await axios.get(URL_CLIENTES).catch((error) => setError(true));
  return response;
}

//Proyectos
export async function GetProyectos(setError) {
  var response = await axios
    .get(URL_PROYECTOS)
    .catch((error) => setError(true));
  return response;
}
