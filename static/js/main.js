document.getElementById("registerForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const password = document.getElementById("password").value.trim();

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Verificar si ya existe el correo
    if (usuarios.find(u => u.correo === correo)) {
        alert("Ya existe una cuenta con este correo.");
        return;
    }

    usuarios.push({ nombre, correo, password });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Registro exitoso. Ahora inicia sesión.");
    window.location.href = "login.html";
});

document.addEventListener("DOMContentLoaded", () => {
    const profileLink = document.getElementById("profile-link");
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (profileLink) {
        if (currentUser) {
            // Si hay sesión iniciada → enviar a perfil
            profileLink.setAttribute("href", "profile.html");
        } else {
            // Si no hay sesión → enviar a registro
            profileLink.setAttribute("href", "register.html");
        }
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
