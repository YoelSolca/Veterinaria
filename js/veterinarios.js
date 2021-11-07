const listaVeterinarios = document.getElementById("lista-veterinarios");
const pais = document.getElementById("pais");
const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const identificacion = document.getElementById("identificacion");
const form = document.getElementById("form");
const btnSave = document.getElementById("save");
const indice = document.getElementById("indice");

let veterinarios = [{
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


function listarVeterinarios() {
    const htmlVeterinarios = veterinarios.map((veterinario, index) => `
        <tr>
            <th scope="row">${index}</th>
                <td>@${veterinario.identificacion}</td>
                <td>@${veterinario.pais}</td>
                <td>${veterinario.nombre}</td>
                <td>${veterinario.apellido}</td>
                <td>
                    <div class="btn-group" role="group" aria-label="Basic example">
                        <button type="button" class="btn btn-info editar" data-toggle="modal" data-target="#exampleModalCenter"><i class="fas fa-edit"></i></button>
                        <button type="button" class="btn btn-danger delete"><i class="far fa-trash-alt"></i></button>
                    </div>
                </td>
        </tr>`).join("");

    listaVeterinarios.innerHTML = htmlVeterinarios;
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
                veterinarios[indice.value] = datos;
                break;
            default:
                veterinarios.push(datos);
                break;
        }
        
    listarVeterinarios();
    resetModal();

    /* console.log("datos:", datos);  */
}

function editar(index){
    //    console.log("editar:", evento);
    //console.dir(indice);
    //console.log(elemento.dataset.indice);
    return function handler(){
        //console.log(mascotas[indice]);
        const veterinario = veterinarios[index];
        identificacion.value = veterinario.identificacion;
        pais.value = veterinario.pais;
        nombre.value = veterinario.nombre;
        apellido.value = veterinario.apellido;
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
        veterinarios = veterinarios.filter((veterinario, indiceVeterinario)=> indiceVeterinario !== index);
        console.log("indice:", index);

        listarVeterinarios();
    }
}

listarVeterinarios();

form.onsubmit = enviarDatos;
btnSave.onclick = enviarDatos;