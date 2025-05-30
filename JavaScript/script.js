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

    datos.forEach(integrante => {
        tabla.innerHTML += `
        <tr>
            <td>${integrante.id}</td>
            <td>${integrante.nombre}</td>
            <td>${integrante.apellido}</td>
            <td>${integrante.correo}</td>
            <td> 
               <button>Editar</button>
               <button>Eliminar</button>
            </td>
        </tr>
        `;
    });

  
}
obtenerIntegrantes();
