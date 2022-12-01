var listaTrabajadores = document.getElementsByClassName("list-element");

for(var i = 0; i < listaTrabajadores.length; i++){
    listaTrabajadores[i].addEventListener("click", () => {
        console.log(listaTrabajadores[i].getElementsByTagName("div")[i])
    })
}

function saludar(){
    console.log("hola")
}