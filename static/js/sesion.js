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

// ejemplo de login.js
document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Buscar usuario guardado en localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        // Guardar usuario actual
        localStorage.setItem("currentUser", JSON.stringify(user));

        // Redirigir al index para actualizar el nav
        window.location.href = "index.html";
    } else {
        alert("Usuario o contraseña incorrectos");
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