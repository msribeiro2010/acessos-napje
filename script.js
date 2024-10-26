document.addEventListener("DOMContentLoaded", function () {
    // Inicializa o calendário com a data atual
    flatpickr("#calendar", {
        dateFormat: "d/m/Y",
        locale: "pt",
        defaultDate: new Date(),
    });

    // Função para atualizar o relógio
    function updateClock() {
        const DateTime = luxon.DateTime;
        const now = DateTime.local().setLocale("pt-BR");
        document.getElementById("clock").innerHTML = now.toLocaleString(
            DateTime.TIME_24_WITH_SECONDS
        );
    }

    // Atualiza o relógio a cada segundo
    setInterval(updateClock, 1000);
    updateClock(); // Atualiza imediatamente ao carregar a página

    // Funcionalidade de exibição de grupos
    const navbarLinks = document.querySelectorAll('.sidebar-links a');
    const groups = document.querySelectorAll('.group');

    // Função para ocultar todos os grupos
    function hideAllGroups() {
        groups.forEach(group => {
            group.classList.remove('active');
        });
    }

    // Função para remover a classe 'active' de todos os links
    function deactivateAllLinks() {
        navbarLinks.forEach(link => {
            link.classList.remove('active');
        });
    }

    // Função para mostrar o grupo selecionado
    function showGroup(groupName) {
        const targetGroup = document.querySelector(`.group[data-group="${groupName}"]`);
        if (targetGroup) {
            targetGroup.classList.add('active');
            // Rolagem suave para o grupo ativo
            targetGroup.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Inicializar: Mostrar o primeiro grupo e ativar o primeiro link
    if (navbarLinks.length > 0 && groups.length > 0) {
        hideAllGroups();
        deactivateAllLinks();
        navbarLinks[0].classList.add('active');
        const firstGroupName = navbarLinks[0].getAttribute('data-group');
        showGroup(firstGroupName);
    }

    // Adicionar event listeners aos links
    navbarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Evita o comportamento padrão do link

            const groupName = link.getAttribute('data-group');

            if (groupName) {
                hideAllGroups();
                deactivateAllLinks();
                link.classList.add('active');
                showGroup(groupName);
            }
        });
    });
});
