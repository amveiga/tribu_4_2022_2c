import axios from "axios";
import { NavLink } from "react-router-dom";

const getUrl = "https://squad11-proyectos.onrender.com/api/projects"
const getUrlTask = "https://squad11-proyectos.onrender.com/api/tasks/project"
const getUrlTaskId = "https://squad11-proyectos.onrender.com/api/tasks"
const apiClient = "https://anypoint.mulesoft.com/mocking/api/v1/sources/exchange/assets/754f50e8-20d8-4223-bbdc-56d50131d0ae/clientes-psa/1.0.0/m/api/clientes"
const apiRecursos = "https://squad1220222c-production.up.railway.app/recursos"

export async function ProjectViewAPI(state) {
    const list = await axios.get(getUrl);
    state(list.data)
}

export async function GetClients(state, loading) {
    const listClient = await axios.get(apiClient)
        .then(
            setTimeout(() => {loading(false)}, 2000)
        )
    state(listClient.data)
}

export async function updateProject(id, data){ 
    if (data.status === "Iniciado"){
        data["initDate"] = Date.now()
    }
    if (data.status === "Produccion"){
        data["endDate"] = Date.now()
    }

    await axios({
        method: "put",
        url: getUrl.concat("/", id),
        data: data
    })
    .then((res) => {
        <NavLink to={"/proyectos"}/>
    })
}

export async function DeleteProject(id) {
    await axios.delete(`${getUrl}/${id}`)
    .then((res) => {
        <NavLink to={"/proyectos"}/>
    })   
}

export async function GetAllTask(id, state, loading) {
    const list = await axios.get(`${getUrlTask}/${id}`)
                            .then(
                                 setTimeout(() => {loading(false)}, 2000)
                            );
    state(list.data)
}

export async function GetProjectId(id, state) {
    const result = await axios.get(`${getUrl}/${id}`)
    state(result.data)
}

export async function postProject(data){
    data["status"] = "No Iniciado";

    await axios({
        method: "post",
        url : getUrl,
        data : data
    })
    .then( (res) => {
        <NavLink to={"/proyectos"}/>
    })

}

export async function GetRecursos(state, loading) {
    await axios.get(apiRecursos)
            .then( async (res) => {
                await state(res.data);
                setTimeout(() => {loading(false)}, 2000)
            })
}

export async function GetTaskId(id, state, stateList, loading) {
    await axios.get(`${getUrlTaskId}/${id}`)
                            .then(  async (res)  => {
                                await state(res.data);
                                await stateList(res.data.responsible);
                                setTimeout(() => {loading(false)}, 2000)
                    })
  
}

export async function addInvertedHours(taskId, hours){
    
    await axios({
        method: "get",
        url: getUrlTaskId.concat("/",taskId)
    })
    .then((res) => {
        axios({
            method : "put",
            url: getUrl.concat("/", res.data.projectID,"/hours"),
            data: { "hours" : parseInt(hours, 10) }
        })
    })

    await axios({
        method: "put",
        url : getUrlTaskId.concat("/", taskId, "/", "hours"),
        data: { "hours": parseInt(hours, 10) }
    })
    
}

export async function updateTask(id, data){

    await axios({
        method:"put",
        url: getUrlTaskId.concat("/",id),
        data: data
    })
    .then((res) => {
        <NavLink to={"/tarea/"+id}/>
    })
    .catch((err) => console.log(err))

}

export async function postTask(data) {
    await axios({
        method : "post",
        url: getUrlTaskId,
        data : data
    })
    .then( (res) => {
        <NavLink to={"/proyectos/"+data.projectID}/>
    })


}

export async function PutHourProject(id, data, loading) {
    await axios.put(`${getUrl}/${id}/hours`, {"hours": data })
    .then(
        setTimeout(() => {loading(false)}, 2000)
    )
}

