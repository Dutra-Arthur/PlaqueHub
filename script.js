// JavaScript mínimo apenas para abrir/fechar o formulário com classe .open
const btn = document.getElementById('btnFiltro');
const form = document.getElementById('formBusca');


function toggleForm() {
    const isOpen = form.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(isOpen));
    form.setAttribute('aria-hidden', String(!isOpen));
    // opcional: mudar o rótulo do botão
    btn.textContent = isOpen ? 'Fechar filtros' : 'Filtrar';
}


btn.addEventListener('click', toggleForm);