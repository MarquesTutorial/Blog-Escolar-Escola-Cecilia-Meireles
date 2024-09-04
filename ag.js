document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('agendamentoForm');
    const agendamentosList = document.getElementById('agendamentosList');

    let agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
    let editar = false;
    let idEditar = null;

    function renderAgendamentos() {
        agendamentosList.innerHTML = '';
        agendamentos.forEach(agendamento => {
            const agendamentoDiv = document.createElement('div');
            agendamentoDiv.className = 'agendamento';
            agendamentoDiv.innerHTML = `
                <div>
                    <h2>${agendamento.nome}</h2>
                    <p>Material: ${agendamento.material}</p>
                    <p>Data: ${agendamento.data}</p>
                    <p>Hora Inicial: ${agendamento.horaInicial}</p>
                    <p>Hora Final: ${agendamento.horaFinal}</p>
                    <p>Tempo restante: ${calcularTempoRestante(agendamento.horaInicial, agendamento.horaFinal)}</p>
                </div>
                <div class="buttons">
                    <button onclick="editarAgendamento(${agendamento.id})">Editar</button>
                    <button onclick="excluirAgendamento(${agendamento.id})">Excluir</button>
                </div>
            `;
            agendamentosList.appendChild(agendamentoDiv);
        });
        localStorage.setItem('agendamentos', JSON.stringify(agendamentos));
    }

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const nome = document.getElementById('nome').value;
            const material = document.getElementById('material').value;
            const data = document.getElementById('data').value;
            const horaInicial = document.getElementById('horaInicial').value;
            const horaFinal = document.getElementById('horaFinal').value;

            if (editar) {
                const agendamento = agendamentos.find(ag => ag.id === idEditar);
                agendamento.nome = nome;
                agendamento.material = material;
                agendamento.data = data;
                agendamento.horaInicial = horaInicial;
                agendamento.horaFinal = horaFinal;
                editar = false;
                idEditar = null;
                document.getElementById('submitBtn').textContent = 'Cadastrar';
            } else {
                const newAgendamento = {
                    id: agendamentos.length + 1,
                    nome,
                    material,
                    data,
                    horaInicial,
                    horaFinal
                };
                agendamentos.push(newAgendamento);
            }

            form.reset();
            renderAgendamentos();
            window.location.href = 'listagem.html';
        });
    }

    window.editarAgendamento = function (id) {
        window.location.href = 'cadastro.html';
        localStorage.setItem('editarId', id);
    };

    window.excluirAgendamento = function (id) {
        agendamentos = agendamentos.filter(ag => ag.id !== id);
        renderAgendamentos();
    };

    function calcularTempoRestante(horaInicial, horaFinal) {
        const inicio = new Date(`1970-01-01T${horaInicial}:00`);
        const fim = new Date(`1970-01-01T${horaFinal}:00`);
        const tempoRestante = fim.getTime() - inicio.getTime();
        const horas = Math.floor(tempoRestante / 3600000);
        const minutos = Math.floor((tempoRestante % 3600000) / 60000);
        return `${horas}h ${minutos}m`;
    }

    if (window.location.pathname.includes('listagem.html')) {
        renderAgendamentos();
    }

    const editarId = localStorage.getItem('editarId');
    if (editarId && form) {
        const agendamento = agendamentos.find(ag => ag.id === Number(editarId));
        if (agendamento) {
            document.getElementById('nome').value = agendamento.nome;
            document.getElementById('material').value = agendamento.material;
            document.getElementById('data').value = agendamento.data;
            document.getElementById('horaInicial').value = agendamento.horaInicial;
            document.getElementById('horaFinal').value = agendamento.horaFinal;
            editar = true;
            idEditar = Number(editarId);
            document.getElementById('submitBtn').textContent = 'Editar';
        }
        localStorage.removeItem('editarId');
    }
});
