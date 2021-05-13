const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');

// user interfaces
const formulario = document.querySelector('#nueva-cita');
const contenedorCitas = document.querySelector('#citas');

let editando;

// clases usadas 

class Citas {
    constructor() {
        this.citas = [];
    }

    agregarCita(cita) {
        this.citas = [...this.citas, cita];

    }

    eliminarCita(id) {
        this.citas = this.citas.filter(cita => cita.id !== id)
    }

    editarCita(citaActualizada) {
        this.citas = this.citas.map( cita => cita.id === citaActualizada.id ? citaActualizada : cita );
    }


}

class UI {

    imprimirAlerta(mensaje,tipo){
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center','alert','d-block','col-12');

        // agregar clase en base al tipo de error
        if(tipo === 'error') {
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-success');
        }

        // mensaje de error
        divMensaje.textContent = mensaje;

        // agregar a l<DOM
        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));

        setTimeout(() => {
            divMensaje.remove();
        },3000)

    }

    imprimirCitas({citas}) {  
        this.limpiarHTML();

        citas.forEach(cita => {
            const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

            const divCita = document.createElement('div');
            divCita.classList.add('cita', 'p-3');
            divCita.dataset.id = id;

            // cripting de los elementos de la cita
            const mascotaParrafo = document.createElement('h2');
            mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
            mascotaParrafo.textContent = mascota;

            const propietarioParrafo = document.createElement('p');
            propietarioParrafo.innerHTML = `<span class="font-weight-bolder">Propietario: </span> ${propietario}`;
            
            const telefonoParrafo = document.createElement('p');
            telefonoParrafo.innerHTML = `<span class="font-weight-bolder">Telefono: </span> ${telefono}`;
            
            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML = `<span class="font-weight-bolder">Fecha: </span> ${fecha}`;
            
            const horaParrafo = document.createElement('p');
            horaParrafo.innerHTML = `<span class="font-weight-bolder">Hora: </span> ${hora}`;
            
            const sintomasParrafo = document.createElement('p');
            sintomasParrafo.innerHTML = `<span class="font-weight-bolder">Sintomas: </span> ${sintomas}`;

            // boton para eliminar esta cita
            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
            btnEliminar.innerHTML = `Eliminar <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>`;

          btnEliminar.onclick = () => eliminarCita(id);

          // añadir boton para editar
          const btnEditar = document.createElement('button');
          btnEditar.classList.add('btn', 'btn-info');
          btnEditar.innerHTML = `Editar <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
          <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd" />
        </svg>`;
        btnEditar.onclick = () => cargarEdicion(cita);


            // agregar los parrafos al divCita
            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);
            divCita.appendChild(btnEliminar);
            divCita.appendChild(btnEditar);

            // agregar las citas al HTML
            contenedorCitas.appendChild(divCita);

            

        });
    }

    limpiarHTML() {
        while(contenedorCitas.firstChild) {
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        }
    }

}

const ui = new UI();
const administarCitas = new Citas();

// registrar eventos
eventListeners();
function eventListeners() {
    mascotaInput.addEventListener('input', datosCita);
    propietarioInput.addEventListener('input', datosCita);
    telefonoInput.addEventListener('input', datosCita);
    fechaInput.addEventListener('input', datosCita);
    horaInput.addEventListener('input', datosCita);
    sintomasInput.addEventListener('input', datosCita);

    formulario.addEventListener('submit', nuevaCita);
}

const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}

// agrega los datos al objeto de cita, siempre que el name(atributo del input) se llame igual 
function datosCita(e) {
    citaObj[e.target.name] = e.target.value;

}

// vlaida y agrega una nueva cita a la clase de citas 
function nuevaCita(e) {
    e.preventDefault();

    // Extraer la infomrmacion del objeto de cita
    const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;

    // validar 
    if(mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '') {
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');

        return;
    }

    if(editando) {
        ui.imprimirAlerta('Editado Correctamente');

        // pasar el objeto de la cita a edición
        administarCitas.editarCita({...citaObj});

        // regresar el boton a su texto original
        formulario.querySelector('button[type="submit"]').textContent = 'Crear Cita';
        
        //quitar modo edicion
        editando = false;
    } else {
        // generar un ID unico
        citaObj.id = Date.now();

        // Creando una nueva cita
        administarCitas.agregarCita({...citaObj});  // se manda un copia del objeto y no al global

        // mensaje de agregado correctamente
        ui.imprimirAlerta('Se agrego Correctamente');
    }




    // reiniciar el objeto 
    reiniciarObjeto();

    // reiniciar el formulario
    formulario.reset();

    // mostrar el HTML
    ui.imprimirCitas(administarCitas);

    
}

function reiniciarObjeto() {
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
    
}

function eliminarCita(id) {
    // eliminar la cita
    administarCitas.eliminarCita(id);

    // muestre mensaje 
    ui.imprimirAlerta('La cita se elimino correctamente');

    // refrescar la 
    ui.imprimirCitas(administarCitas);

}

// carga los datos y el modo edicion
function cargarEdicion(cita) {
    const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

    // llenar los input
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    // llenar el objeto
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;

    // cambiar el valor del boton
    formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';

    editando = true;

}