import axios from "axios";

const getUrl = "https://project-api-kurk.onrender.com/api/projects"

async function ProjectViewList(state) {
    const list = await axios.get(getUrl);
    state(list.data)
}

export default ProjectViewList;