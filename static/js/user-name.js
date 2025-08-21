// static/js/user-name.js
(() => {
    const nameEl = document.getElementById('profile-name');
    const linkEl = document.getElementById('profile-link');
    if (!nameEl || !linkEl) return;

    let current = null;
    try { current = JSON.parse(localStorage.getItem('usuarioActual') || 'null'); } catch { }

    const getName = () => {
        if (current?.nombre) return String(current.nombre);
        const n1 = localStorage.getItem('user_name');
        if (n1) return n1;
        try {
            const obj = JSON.parse(localStorage.getItem('user') || 'null');
            return obj?.name ? String(obj.name) : '';
        } catch { return ''; }
    };

    const name = (getName() || '').trim();

    if (name) {
        nameEl.textContent = name;
        linkEl.setAttribute('href', 'perfil.html');   // <-- perfil si hay sesión
        linkEl.title = name;
    } else {
        nameEl.textContent = '';
        linkEl.setAttribute('href', 'register.html'); // <-- registro si NO hay sesión
        linkEl.title = 'Registrarse';
    }
})();
