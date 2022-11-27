import axios from "axios";

const getUrl = "https://project-api-kurk.onrender.com/api/projects"
const apiClient = "https://anypoint.mulesoft.com/mocking/api/v1/sources/exchange/assets/754f50e8-20d8-4223-bbdc-56d50131d0ae/clientes-psa/1.0.0/m/api/clientes"

async function ProjectViewAPI(state) {
    const list = await axios.get(getUrl);
    state(list.data)
}

export async function GetClients(state) {
    const listClient = await axios.get(apiClient)
    state(listClient.data)
}

export default ProjectViewAPI;
// export default GetClients;