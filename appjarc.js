class Sms {
    constructor(nombre, telefono, sms) {
        this.nombre = nombre;
        this.telefono = telefono;
        this.sms = sms;
    }
}

class Interfaz {
    listarSms(sms) {
        const smsList = document.getElementById('sms.list');
        const elemento = document.createElement('div');
        elemento.innerHTML = `
            <div class="card text-center mb-4">
                <div class="card-body">
                <strong>Remite</strong>: ${sms.nombre}
                <strong>Télefono</strong>: ${sms.telefono}
                <strong>Sms</strong>: ${sms.sms} 
                <a class="btn btn-sm btn-danger" href="#" name="borrar">Borrar</a>    
                </div>
            </div>
        `;
        smsList.appendChild(elemento);
    }

    limpiarFormulario() {
        document.getElementById('sms.form').reset();
    }

    borrarSms(elemento) {
        if (elemento.name === 'borrar') {
            elemento.parentElement.parentElement.parentElement.remove();
            this.estadoSms("SMS eliminado del historial. :(", "danger");
        }

    }

    estadoSms(texto, tipo) {
        const div = document.createElement('div');
        div.className = `alert alert-${tipo} mt-2`;
        div.appendChild(document.createTextNode(texto));
        const contenedor = document.querySelector('.container');
        const app = document.querySelector('#app');
        contenedor.insertBefore(div, app);
        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 3000);
    }
}

document.getElementById('sms.form').addEventListener('submit', function (event) {

    const nombre = document.getElementById('txtNombre').value;
    const telefono = document.getElementById('txtTelefono').value;
    const msj = document.getElementById('txtSms').value;

    const interfaz = new Interfaz();

    if (nombre === "" || telefono === "" || msj === "") {
        event.preventDefault();
        return interfaz.estadoSms("Llene los campos correctamente. :(", "warning");
        
    }else{

    const urlsms = `https://gentle-reaches-57765.herokuapp.com/sms/o.gmcvJbsXhSlkxLczFTnj7fsewzcJSrJb/ujz7iq3eKcK/ujz7iq3eKcKsjAcabP6VR6/${telefono}/${msj}. Remite: ${nombre}`;

    fetch(urlsms)
        .then(function (respuesta) {
            console.log('Antes del if ' + respuesta.url);    
            console.log('Antes del if ' + respuesta.status);    
            
            if (respuesta.ok){
                console.log('Dentro del if ' + respuesta.statusText);    
            
                const sms = new Sms(nombre, telefono, msj);
                interfaz.listarSms(sms);
                // console.log(sms);
                interfaz.limpiarFormulario();
                interfaz.estadoSms("SMS enviado satisfactoriamente. ;)", "success")
                console.log('Dentro Fin del if ' + respuesta.statusText);    
            }else{
                console.log('Respuesta con la petición Fetch OK:' + respuesta.statusText);    
            }    
        }).catch(function (error) {
            console.log('Hubo un problema con la petición Fetch:' + error.message);
        });
    }

    event.preventDefault();
})

document.getElementById('sms.list').addEventListener('click', function (event) {
    const interfaz = new Interfaz();
    interfaz.borrarSms(event.target);
})

