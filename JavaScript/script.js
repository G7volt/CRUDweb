const API_URL = "https://retoolapi.dev/vGQZBB/integrantes";

//Crear una funcion para mandar a traer el json con GET
async function obtenerIntegrantes() {
    //Solicitar respuesta del servidor
    const respuesta = await fetch(API_URL);

    //PAsamos a json la respuesta del servidor
    const data = await respuesta.json();//Esto es un json

    //Enviamos el json a la funcion que genera las filas en las tablas
    mostrarDatos(data);
}


//Funcion para crear las filas de la tabla en funcion al json
//"Datos" representara al json donde viene la informacion
function mostrarDatos(datos){

    //Se llama a la tabla con elemento "id" y luego al tbody
    const tabla = document.querySelector("#tabla tbody");

    //Para injectar codigo html usamos una propiedad "innerHTML"
    tabla.innerHTML = "" //Para vaciar el contenido de la tabla

    datos.forEach(integrante => {//Capturando los datos de los campos
        tabla.innerHTML += `
        <tr>
            <td>${integrante.id}</td>
            <td>${integrante.nombre}</td>
            <td>${integrante.apellido}</td>
            <td>${integrante.correo}</td>
            <td> 
               <button onClick = "AbrirModalEditar('${integrante.id}', '${integrante.nombre}', '${integrante.apellido}', '${integrante.correo}')">Editar</button>
               <button onClick = "eliminarPersona(${integrante.id})">Eliminar</button>
            </td>
        </tr>
        `;
    });

  
}
obtenerIntegrantes();


//Proceso para agregar un nuevo integrante
const modal = document.getElementById("md-agregar")//Cuadro de dialogo
const btnAgregar = document.getElementById("BtnAgregar")//Boton para agregar

const btnCerrar = document.getElementById("BtnCerrar")//Boton para cerrar dialogo

btnAgregar.addEventListener("click", () =>{
    modal.showModal(); //Para abrir el popup al hacer click al boton
});

btnCerrar.addEventListener("click", () => {
    modal.close();//Para cerrar el popup al hacer click a la X
})

//Agregar un nuevo integrante desde el formulario
document.getElementById("frmAgregar").addEventListener("submit", async e => {
    e.preventDefault(); //"e" representa a submit, evita que el formulario se envie de un solo
    
     //Capturar los valores del formulario
     const nombre = document.getElementById("txtNombre").value.trim();
     const apellido = document.getElementById("txtApellido").value.trim();
     const correo = document.getElementById("txtCorreo").value.trim();

     //Validación basica
    if(!nombre || !apellido || !correo) {
        alert("Ingrese los valores necesarios");
    }

     //Llamar a la API para enviar el registro
     const respuesta = await fetch(API_URL, {
        method: "POST",//Tipo de accion o solicitud
        headers: {'Content-Type':'application/json'},//Tipo de dato enviado
        body: JSON.stringify({nombre, apellido, correo})//Datos enviados, Stringify convierte el archivo JSON a string, 

    });//fetch: Es para llamar a la api || await por si se tarda


    //validacion: Verificar que la API responde que los datos fueron enviados correctamente
    if(respuesta.ok){
        alert("El registro fue agregado correctamente");

        //Limpiar el formulario luego de enviar los datos
        document.getElementById("frmAgregar").reset();

        //Cerrar el modal(dialog)
        modal.close();

        //Recargar la tabla
        obtenerIntegrantes();
    }else{
        //En caso de que la API devuelva un codigo diferente a 200-29900
        alert("El registro no fue agregado");
    }

    


});



//Funcion para borrar registros
async function eliminarPersona(id){
    const confirmacion = confirm("Realmente deseas eliminar el registro?")


    //Validamos si el usuario confirmo borrar el registro
    if(confirmacion){
        await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });
    }

    //Recargar la tabla despues de eliminar los registros
    obtenerIntegrantes();
}




/*Proceso para editar un registro*/ 

const modalEditar = document.getElementById("md-Editar");
const modalCerrarEditar = document.getElementById("BtnCerrarEditar");

modalCerrarEditar.addEventListener("click", () => {
    modalEditar.close();//Para cerrar el modal de editar al hacer click a la x
});

/*Abrir el modal editar*/

function AbrirModalEditar(id, nombre, apellido, correo){
    //se asignan los valores del registro en los input
    document.getElementById("txtIdEditar").value = id;
    document.getElementById("txtNombreEditar").value = nombre;
    document.getElementById("txtApellidoEditar").value = apellido;
    document.getElementById("txtCorreoEditar").value = correo;

    //abrimos el modal despues de pasar
    modalEditar.showModal();
}

//Cuando programamos con formularios, se programa el formulario comleto, no solo el boton
document.getElementById("frmEditar").addEventListener("submit", async e => {
    e.preventDefault();//Evita que el formulario haga un submit

    //Capturamos los valores de los imput
    const id = document.getElementById("txtIdEditar").value;
    const nombre = document.getElementById("txtNombreEditar").value.trim();
    const apellido = document.getElementById("txtApellidoEditar").value.trim();
    const correo = document.getElementById("txtCorreoEditar").value.trim();

    //Validacion de las constantes
    if(!id || !nombre || !apellido || !correo){
        alert("Primero complete los campos");
        return; //evita que el codigo se siga ejecutando
    }

    //llamada a la API
    const respuesta = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({correo, nombre, apellido})
    });

    if(respuesta.ok){
        alert("El registro fue actualizado correctamente");
        modalEditar.close();
        obtenerIntegrantes();
    }
    else{
        alert("El registro no pudo ser actualizado");
    }
});

