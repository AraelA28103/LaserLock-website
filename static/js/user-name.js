// static/js/user-name.js
(() => {
    // elementos (puede haber más de un nav por página)
    const nameEls = Array.from(document.querySelectorAll('#profile-name'));
    const linkEls = Array.from(document.querySelectorAll('#profile-link'));
    if (!nameEls.length || !linkEls.length) return;

    // lee nombre desde localStorage (varias llaves soportadas)
    const getName = () => {
        const keys = ['ll_user_name', 'user_name', 'usuario_nombre', 'nombre_usuario'];
        for (const k of keys) {
            const v = localStorage.getItem(k);
            if (v && v.trim()) return v.trim();
        }
        const jsonKeys = ['ll_user', 'user', 'usuario'];
        for (const k of jsonKeys) {
            const raw = localStorage.getItem(k);
            if (!raw) continue;
            try {
                const o = JSON.parse(raw);
                const cands = [o?.name, o?.nombre, o?.displayName];
                for (const c of cands) if (c && String(c).trim()) return String(c).trim();
            } catch { }
        }
        return null;
    };

    const sanitize = (t) => {
        const div = document.createElement('div');
        div.textContent = t || '';
        return div.innerHTML;
    };

    const name = getName();

    nameEls.forEach((nameEl, i) => {
        const linkEl = linkEls[i] || linkEls[0];
        if (!linkEl) return;

        if (name) {
            nameEl.innerHTML = sanitize(name);
            linkEl.href = 'configuracion.html';
            linkEl.title = name;
        } else {
            nameEl.textContent = 'Registrarse';
            linkEl.href = 'configuracion.html';
            linkEl.title = 'Configurar cuenta / registro';
        }
    });
})();
