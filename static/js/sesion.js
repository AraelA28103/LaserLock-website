document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const correo = document.getElementById("correo").value.trim();
    const password = document.getElementById("password").value.trim();

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuario = usuarios.find(u => u.correo === correo && u.password === password);

    if (usuario) {
        localStorage.setItem("usuarioActual", JSON.stringify(usuario));
        alert("Bienvenido " + usuario.nombre);
        window.location.href = "index.html"; // Redirige a la página principal
    } else {
        alert("Correo o contraseña incorrectos.");
    }
});

// LOGIN unificado (usa el mismo storage que el registro)
document.getElementById('loginForm')?.addEventListener('submit', (e) => {
    e.preventDefault();

    const correo = document.getElementById('correo').value.trim().toLowerCase();
    const password = document.getElementById('password').value;

    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const usuario = usuarios.find(u => String(u.correo).toLowerCase() === correo && u.password === password);

    if (usuario) {
        localStorage.setItem('usuarioActual', JSON.stringify(usuario));
        // Llaves que usa el nav para pintar el nombre
        localStorage.setItem('user_name', usuario.nombre);
        localStorage.setItem('user', JSON.stringify({ name: usuario.nombre, correo: usuario.correo }));

        alert('Bienvenido ' + usuario.nombre);
        window.location.href = 'index.html';
    } else {
        alert('Correo o contraseña incorrectos.');
    }
});


document.addEventListener("DOMContentLoaded", () => {
    const profileLink = document.getElementById("profile-link");
    const profileName = document.getElementById("profile-name");
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (profileLink && profileName) {
        if (currentUser) {
            // Si hay sesión iniciada → enviar a perfil y mostrar nombre
            profileLink.setAttribute("href", "profile.html");
            profileName.textContent = currentUser.username;
        } else {
            // Si no hay sesión → enviar a registro y ocultar nombre
            profileLink.setAttribute("href", "register.html");
            profileName.textContent = "";
        }
    }
});