const listaDueños = document.getElementById("lista-dueños");
const pais = document.getElementById("pais");
const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const identificacion = document.getElementById("identificacion");
const form = document.getElementById("form");
const btnSave = document.getElementById("save");
const indice = document.getElementById("indice");

let dueños = [{
        nombre: "Tomy",
        apellido: "Solca",
        pais: "Argentina",
        identificacion: "123451232"
    },
    {
        nombre: "Timy",
        apellido: "Carreras",
        pais: "Colombia",
        identificacion: "123452341"
    },
    {
        nombre: "Michi",
        apellido: "Fernandez",
        pais: "Brasil",
        identificacion: "123455412"
    },
];


function listarDueños() {
    const htmlDueños = dueños.map((dueño, index) => `
        <tr>
            <th scope="row">${index}</th>
                <td>@${dueño.identificacion}</td>
                <td>@${dueño.pais}</td>
                <td>${dueño.nombre}</td>
                <td>${dueño.apellido}</td>
                <td>
                    <div class="btn-group" role="group" aria-label="Basic example">
                        <button type="button" class="btn btn-info editar" data-toggle="modal" data-target="#exampleModalCenter"><i class="fas fa-edit"></i></button>
                        <button type="button" class="btn btn-danger delete"><i class="far fa-trash-alt"></i></button>
                    </div>
                </td>
        </tr>`).join("");

    listaDueños.innerHTML = htmlDueños;
    Array.from(document.getElementsByClassName("editar")).forEach((botonEditar, index) => botonEditar.onclick = editar(index));
    Array.from(document.getElementsByClassName("delete")).forEach((botonEliminar, index) => botonEliminar.onclick = eliminar(index));
        

    /*  console.log(htmlMascotas); */
}


function enviarDatos(evento) {
    evento.preventDefault();
/*     console.log("evento: ", evento);
 */   
        const datos = {
        identificacion: identificacion.value,
        pais: pais.value,
        nombre: nombre.value,
        apellido: apellido.value,
        };

        const accion = btnSave.innerHTML;

        switch (accion) {
            case "Editar":
                dueños[indice.value] = datos;
                break;
            default:
                dueños.push(datos);
                break;
        }
        
    listarDueños();
    resetModal();

    /* console.log("datos:", datos);  */
}

function editar(index){
    //    console.log("editar:", evento);
    //console.dir(indice);
    //console.log(elemento.dataset.indice);
    return function handler(){
        //console.log(mascotas[indice]);
        const dueño = dueños[index];
        identificacion.value = dueño.identificacion;
        pais.value = dueño.pais;
        nombre.value = dueño.nombre;
        apellido.value = dueño.apellido;
        indice.value = index;

        if(indice.value){
            btnSave.innerHTML = "Editar";
        }
       $("#exampleModalCenter").modal("toggle");

    }
}

function resetModal(){
    nombre.value = "";
    pais.value = "";
    identificacion.value = "";
    apellido.value = "";
    indice.value = "";
    btnSave.innerHTML = "Crear";
}

function eliminar(index){
    return function clickEliminar(){
        dueños = dueños.filter((dueño, indiceDueño)=> indiceDueño !== index);
        console.log("indice:", index);

        listarDueños();
    }
}

listarDueños();

form.onsubmit = enviarDatos;
btnSave.onclick = enviarDatos;