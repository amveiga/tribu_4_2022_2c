import axios from "axios";

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
        window.location.reload()
    })
}

export async function DeleteProject(id) {
    await axios.delete(`${getUrl}/${id}`)
    .then((res) => {
        window.location.reload();
    })   
}

export async function GetAllTask(id, state) {
    const list = await axios.get(`${getUrlTask}/${id}`);
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
        window.location.reload();
    })

}

export async function GetRecursos(state, loading) {
    const recursos = await axios.get(apiRecursos)
            .then(
                setTimeout(() => {loading(false)}, 2000)
            )          
    state(recursos.data);
}

export async function GetTaskId(id, state, stateList) {
    const list = await axios.get(`${getUrlTaskId}/${id}`)
    await state(list.data);
    return await stateList(list.data.responsible);
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
    .then((res) => {
        window.location.reload()
    })
}

export async function updateTask(id, data){

    await axios({
        method:"put",
        url: getUrlTaskId.concat("/",id),
        data: data
    })
    .then((res) => {
        window.location.reload()
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
        window.location.reload()
    })


}

export async function PutHourProject(id, data) {
    await axios.put(`${getUrl}/${id}/hours`, {"hours": data })
}

