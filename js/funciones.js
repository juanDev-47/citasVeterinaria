import Citas from './clases/Citas.js';
import UI from './clases/UI.js';
import { mascotaInput, propietarioInput, telefonoInput, fechaInput, horaInput, sintomasInput, formulario } from './selectores.js';

const ui = new UI();
const administarCitas = new Citas();

let editando;

const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}

// agrega los datos al objeto de cita, siempre que el name(atributo del input) se llame igual 
export function datosCita(e) {
    citaObj[e.target.name] = e.target.value;

}

// vlaida y agrega una nueva cita a la clase de citas 
export function nuevaCita(e) {
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

export function reiniciarObjeto() {
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
    
}

export function eliminarCita(id) {
    // eliminar la cita
    administarCitas.eliminarCita(id);

    // muestre mensaje 
    ui.imprimirAlerta('La cita se elimino correctamente');

    // refrescar la 
    ui.imprimirCitas(administarCitas);

}

// carga los datos y el modo edicion
export function cargarEdicion(cita) {
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