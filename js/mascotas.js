const listaMascotas = document.getElementById("lista-mascotas");
const tipo = document.getElementById("tipo");
const nombre = document.getElementById("nombre");
const dueño = document.getElementById("dueño");
const form = document.getElementById("form");
const btnSave = document.getElementById("save");
const indice = document.getElementById("indice");

let mascotas = [{
        tipo: "Perro",
        nombre: "Tomy",
        dueño: "Julian"
    },
    {
        tipo: "Perro",
        nombre: "Timy",
        dueño: "Julian"
    },
    {
        tipo: "Gato",
        nombre: "Michi",
        dueño: "Esteban"
    },
];


function listarMascotas() {
    const htmlMascotas = mascotas.map((mascota, index) => `
        <tr>
            <th scope="row">${index}</th>
                <td>${mascota.tipo}</td>
                <td>${mascota.nombre}</td>
                <td>@${mascota.dueño}</td>
                <td>
                    <div class="btn-group" role="group" aria-label="Basic example">
                        <button type="button" class="btn btn-info editar" data-toggle="modal" data-target="#exampleModalCenter"><i class="fas fa-edit"></i></button>
                        <button type="button" class="btn btn-danger delete"><i class="far fa-trash-alt"></i></button>
                    </div>
                </td>
        </tr>`).join("");

    listaMascotas.innerHTML = htmlMascotas;
    Array.from(document.getElementsByClassName("editar")).forEach((botonEditar, index) => botonEditar.onclick = editar(index));
    Array.from(document.getElementsByClassName("delete")).forEach((botonEliminar, index) => botonEliminar.onclick = eliminar(index));
        

    /*  console.log(htmlMascotas); */
}


function enviarDatos(evento) {
    evento.preventDefault();
/*     console.log("evento: ", evento);
 */   
        const datos = {
        tipo: tipo.value,
        nombre: nombre.value,
        dueño: dueño.value
        };

        const accion = btnSave.innerHTML;

        switch (accion) {
            case "Editar":
                mascotas[indice.value] = datos;
                break;
            default:
                mascotas.push(datos);
                break;
        }
        
    listarMascotas();
    resetModal();

    /* console.log("datos:", datos);  */
}

function editar(index){
    //    console.log("editar:", evento);
    //console.dir(indice);
    //console.log(elemento.dataset.indice);
    return function handler(){
        //console.log(mascotas[indice]);
        const mascota = mascotas[index];
        nombre.value = mascota.nombre;
        tipo.value = mascota.tipo;
        dueño.value = mascota.dueño;
        indice.value = index;

        if(indice.value){
            btnSave.innerHTML = "Editar";
        }
       $("#exampleModalCenter").modal("toggle");

    }
}

function resetModal(){
    nombre.value = "";
    tipo.value = "";
    dueño.value = "";
    indice.value = "";
    btnSave.innerHTML = "Crear";
}

function eliminar(index){
    return function clickEliminar(){
        mascotas = mascotas.filter((mascota, indiceMacota)=> indiceMacota !== index);
        console.log("indice:", index);

        listarMascotas();
    }
}

listarMascotas();

form.onsubmit = enviarDatos;
btnSave.onclick = enviarDatos;