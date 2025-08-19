

document.addEventListener("DOMContentLoaded", () => {
    // -------------------------
    // Distribuidores
    // -------------------------
    const distribuidores = [
        { id: 1, nombre: "Distribuidora Norte", coords: [-23.65, -70.40], descripcion: "Atacama - Especialistas en seguridad perimetral", reseñas: [], comentarios: [] },
        { id: 2, nombre: "Distribuidora Centro", coords: [-33.45, -70.66], descripcion: "Santiago - Mayorista oficial de LaserLock", reseñas: [], comentarios: [] },
        { id: 3, nombre: "Distribuidora Sur", coords: [-39.82, -73.24], descripcion: "Valdivia - Servicio técnico autorizado", reseñas: [], comentarios: [] }
    ];

    // -------------------------
    // LocalStorage
    // -------------------------
    function guardarDatos() {
        localStorage.setItem("datosDistribuidores", JSON.stringify(distribuidores));
    }

    function cargarDatos() {
        const data = localStorage.getItem("datosDistribuidores");
        if (data) {
            const guardados = JSON.parse(data);
            distribuidores.forEach((dist, i) => {
                dist.reseñas = guardados[i]?.reseñas || [];
                dist.comentarios = guardados[i]?.comentarios || [];
            });
        } else {
            guardarDatos();
        }
    }

    cargarDatos();

    // -------------------------
    // Inicializar Mapa
    // -------------------------
    const map = L.map('map').setView([-33.45, -70.66], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // -------------------------
    // Funciones de Perfil y Comentarios
    // -------------------------
    function calcularPromedio(reseñas) {
        if (reseñas.length === 0) return "Sin reseñas";
        const suma = reseñas.reduce((a, b) => a + b, 0);
        return (suma / reseñas.length).toFixed(1) + " ⭐ (" + reseñas.length + " votos)";
    }

    function mostrarPerfil(dist) {
        const perfil = document.getElementById("perfilDist");
        perfil.innerHTML = `
      <h5>${dist.nombre}</h5>
      <p>${dist.descripcion}</p>
      <p><strong>Calificación:</strong> ${calcularPromedio(dist.reseñas)}</p>

      <label>Tu reseña:</label>
      <select id="nuevaReseña" class="form-select mb-2">
        <option value="1">1 ⭐</option>
        <option value="2">2 ⭐</option>
        <option value="3">3 ⭐</option>
        <option value="4">4 ⭐</option>
        <option value="5">5 ⭐</option>
      </select>
      <button class="btn btn-sm btn-success mb-2" id="btnReseña">Enviar reseña</button>

      <hr>
      <h6>Comentarios</h6>
      <textarea id="nuevoComentario" class="form-control mb-2" placeholder="Escribe tu comentario..."></textarea>
      <button class="btn btn-sm btn-primary mb-2" id="btnComentar">Publicar</button>

      <div id="listaComentarios" class="mt-2">
        ${dist.comentarios.length === 0 ? "<p class='text-muted'>No hay comentarios aún.</p>" : dist.comentarios.map(c => `<div class="border rounded p-2 mb-2 bg-white">${c}</div>`).join("")}
      </div>

      <hr>
      <button class="btn btn-info btn-sm" id="btnModal">Más información</button>
    `;

        // Eventos dinámicos
        document.getElementById("btnReseña").addEventListener("click", () => {
            const valor = parseInt(document.getElementById("nuevaReseña").value);
            dist.reseñas.push(valor);
            guardarDatos();
            mostrarPerfil(dist);
        });

        document.getElementById("btnComentar").addEventListener("click", () => {
            const texto = document.getElementById("nuevoComentario").value.trim();
            if (texto.length > 0) {
                dist.comentarios.push(texto);
                guardarDatos();
                mostrarPerfil(dist);
            }
        });

        document.getElementById("btnModal").addEventListener("click", () => {
            document.getElementById("modalTitulo").innerText = dist.nombre;
            document.getElementById("modalContenido").innerHTML = `
        <p>${dist.descripcion}</p>
        <p><strong>Reseñas:</strong> ${calcularPromedio(dist.reseñas)}</p>
        <p><strong>Comentarios:</strong></p>
        ${dist.comentarios.length === 0 ? "<p class='text-muted'>Sin comentarios</p>" : dist.comentarios.map(c => `<p>• ${c}</p>`).join("")}
        <p>Teléfono: +56 9 1234 5678</p>
        <p>Email: contacto@${dist.nombre.toLowerCase().replace(/\s/g, "")}.cl</p>
      `;
            new bootstrap.Modal(document.getElementById("infoDistribuidor")).show();
        });
    }

    // -------------------------
    // Marcadores
    // -------------------------
    distribuidores.forEach(dist => {
        const marker = L.marker(dist.coords).addTo(map);
        marker.on('click', () => mostrarPerfil(dist));
    });

    // Mostrar el primer distribuidor por defecto
    mostrarPerfil(distribuidores[0]);
});
