import axios from "axios";

const getUrl = "https://squad11-proyectos.onrender.com/api/projects"
const getUrlTask = "https://squad11-proyectos.onrender.com/api/tasks/project"
const getUrlTaskId = "https://squad11-proyectos.onrender.com/api/tasks"
const ourApiClient = "https://squad11-proyectos.onrender.com/clientes" 
const apiRecursos = "https://squad1220222c-production.up.railway.app/recursos"

export async function ProjectViewAPI(state) {
    const list = await axios.get(getUrl);
    state(list.data)
}

export async function GetClients(state, loading) {
    const listClient = await axios({
        method:"get", 
        url: ourApiClient
    })
    .then(
            setTimeout(() => {loading(false)}, 2000)
        )
    state(listClient.data)
}

export async function updateProject(id, data, navigate){ 
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
    .then(() => {
        window.location.reload()
    })
}

export async function DeleteProject(id,navigate) {
    await axios.delete(`${getUrl}/${id}`)
    .then(() => {
        window.location.reload()
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

export async function postProject(data, navigate){
    data["status"] = "No Iniciado";

    await axios({
        method: "post",
        url : getUrl,
        data : data
    })
    .then(() => {
        window.location.reload()
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

export async function updateTask(id, data, navigate){
    await axios({
        method:"put",
        url: getUrlTaskId.concat("/",id),
        data: data
    })
    .then(() => {
        window.location.reload()
    })
    .catch((err) => console.log(err))

}

export async function postTask(data, navigate) {
    await axios({
        method : "post",
        url: getUrlTaskId,
        data : data
    })
    .then(() => {
        window.location.reload()
    })


}

export async function PutHourProject(id, data, loading) {
    await axios.put(`${getUrl}/${id}/hours`, {"hours": data })
    .then(
        setTimeout(() => {loading(false)}, 2000)
    )
}

