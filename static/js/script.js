let contador = 0;
let activado = false;

const activarBtn = document.getElementById("activarBtn");
const contadorSpan = document.getElementById("contador");
const laser = document.getElementById("laser");

activarBtn.addEventListener("click", () => {
    activado = !activado;
    activarBtn.innerText = activado ? "Desactivar" : "Activar";

    // Cambiar clase de color
    if (activado) {
        activarBtn.classList.remove("btn-success");
        activarBtn.classList.add("btn-danger");
    } else {
        activarBtn.classList.remove("btn-danger");
        activarBtn.classList.add("btn-success");
    }
});

laser.addEventListener("mouseenter", () => {
    if (activado) {
        contador++;
        contadorSpan.innerText = contador;
        alert("¡Alarma activada!");
    }
});

// Navbar transparente al inicio y oscuro al hacer scroll
window.addEventListener("scroll", () => {
    let nav = document.querySelector(".navbar");
    if (window.scrollY > 50) {
        nav.classList.add("scrolled");
    } else {
        nav.classList.remove("scrolled");
    }
});
