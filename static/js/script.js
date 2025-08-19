let contador = 0;
let activado = false;

document.getElementById("activarBtn").addEventListener("click", () => {
    activado = !activado;
    document.getElementById("activarBtn").innerText = activado ? "Desactivar" : "Activar";
});

document.getElementById("laser").addEventListener("mouseenter", () => {
    if (activado) {
        contador++;
        document.getElementById("contador").innerText = contador;
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
