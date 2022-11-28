import axios from "axios";

const getUrl = "https://project-api-kurk.onrender.com/api/projects"
const getUrlTask = "https://project-api-kurk.onrender.com/api/tasks/project"
const apiClient = "https://anypoint.mulesoft.com/mocking/api/v1/sources/exchange/assets/754f50e8-20d8-4223-bbdc-56d50131d0ae/clientes-psa/1.0.0/m/api/clientes"

async function ProjectViewAPI(state) {
    const list = await axios.get(getUrl);
    state(list.data)
}

export async function GetClients(state) {
    const listClient = await axios.get(apiClient)
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
    console.log(`${getUrl}/${id}`)
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

export default ProjectViewAPI;
