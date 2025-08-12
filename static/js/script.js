const laserArea = document.getElementById("laserBeam");
const audio = new Audio("alarma.mp3");
const estadoSistema = document.getElementById("estadoSistema");
const contadorDisplay = document.getElementById("contador");
const toggleBtn = document.getElementById("toggleBtn");

let sistemaEncendido = true;
let contador = 0;

laserBeam.addEventListener("mouseenter", detectarMovimiento);
laserBeam.addEventListener("touchstart", detectarMovimiento);

toggleBtn.addEventListener("click", () => {
    sistemaEncendido = !sistemaEncendido;
    if (sistemaEncendido) {
        estadoSistema.textContent = "Encendido";
        estadoSistema.classList.replace("text-danger", "text-success");
        toggleBtn.textContent = "Apagar Sistema";
        toggleBtn.classList.replace("btn-success", "btn-danger");
    } else {
        estadoSistema.textContent = "Apagado";
        estadoSistema.classList.replace("text-success", "text-danger");
        toggleBtn.textContent = "Encender Sistema";
        toggleBtn.classList.replace("btn-danger", "btn-success");
    }
});

function detectarMovimiento() {
    if (!sistemaEncendido) return;
    contador++;
    contadorDisplay.textContent = contador;
    laserArea.classList.add("active");
    audio.currentTime = 0;
    audio.play();
    setTimeout(() => {
        laserArea.classList.remove("active");
    }, 500);
}

const form = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Evita que se recargue la página

    const formData = new FormData(form);

    try {
        const response = await fetch(form.action, {
            method: form.method,
            headers: {
                'Accept': 'application/json'
            },
            body: formData
        });

        if (response.ok) {
            formMessage.innerHTML = `<div class="alert alert-success">¡Mensaje enviado con éxito! Te responderemos pronto.</div>`;
            form.reset();
        } else {
            const data = await response.json();
            if (data.errors) {
                formMessage.innerHTML = `<div class="alert alert-danger">Error: ${data.errors.map(err => err.message).join(', ')}</div>`;
            } else {
                formMessage.innerHTML = `<div class="alert alert-danger">Oops! Hubo un problema al enviar tu mensaje.</div>`;
            }
        }
    } catch (error) {
        formMessage.innerHTML = `<div class="alert alert-danger">Error de red. Por favor intenta más tarde.</div>`;
    }
});
