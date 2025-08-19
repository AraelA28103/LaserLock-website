let contador = 0;
let simulacionActiva = false;

const laser = document.querySelector('.laser');
const contadorSpan = document.getElementById('contador');
const boton = document.getElementById('toggleSimulacion');

// Estado inicial del botón
boton.classList.add('apagado');

boton.addEventListener('click', () => {
    simulacionActiva = !simulacionActiva;
    laser.style.display = simulacionActiva ? 'block' : 'none';
    boton.textContent = simulacionActiva ? 'Apagar Simulación' : 'Iniciar Simulación';

    // Cambia color del botón según estado
    if(simulacionActiva) {
        boton.classList.remove('apagado');
        boton.classList.add('encendido');
    } else {
        boton.classList.remove('encendido');
        boton.classList.add('apagado');
        // Reinicia el contador al apagar
        contador = 0;
        contadorSpan.textContent = contador;
    }
});

laser.addEventListener('mouseenter', () => {
    if(simulacionActiva) {
        contador++;
        contadorSpan.textContent = contador;
    }
});