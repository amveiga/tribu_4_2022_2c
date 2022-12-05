
const cantFiltros = (filtros) => {
    var num = 0;
    for(var i =0; i < filtros.length; i++){
        if(filtros.charAt(i) === '&'){
            num++;
        }
    }
    return num + 1;
}

const getId = (filtro, clientes) => {
    const cliente = (clientes.find((cliente) => (filtro.includes(cliente["razon social"]))))
    return cliente ? (cliente["id"]) : -1 ;
}

const filtro2Parametros = (filtros, filtrado, clientes) => {
    if (filtros.includes("status=") && filtros.includes("type=")){
        return filtrado.filter(project => (filtros.includes(project.status) && 
                                    filtros.includes(project.type) ))
    }
    if (filtros.includes("status=") && filtros.includes("clientId=")){
        return filtrado.filter(project => (filtros.includes(project.status) && 
                                    (project.assignedClient === getId(filtros, clientes))))
                                }
    if (filtros.includes("clientId=") && filtros.includes("type=")){
        return filtrado.filter(project => (filtros.includes(project.type) && 
                                    (project.assignedClient === getId(filtros, clientes))))                          
    }                        
}

const filtro3Parametros = (filtros, filtrado, clientes) => {
    if (filtros.includes("status=") && filtros.includes("type=") && filtros.includes("clientId=")){
        return filtrado.filter(project => (filtros.includes(project.status) && 
                                            filtros.includes(project.type) && 
                                            (project.assignedClient === getId(filtros, clientes))))
    }
}

const filtro1Parametro = (filtro, filtrado, clientes) => {
    return filtrado.filter(project => (filtro.includes(project.status) ||
                                     filtro.includes(project.type) ||
                                        (project.assignedClient === getId(filtro, clientes))))
}

export const filtradoInclusivo = (filtro, filtrado, clientes) => {
    switch (cantFiltros(filtro)) {
        case 1: return filtro1Parametro(filtro, filtrado, clientes);

        case 2: return filtro2Parametros(filtro, filtrado, clientes);

        case 3: return filtro3Parametros(filtro, filtrado, clientes);

        default: return [];
    }
}



