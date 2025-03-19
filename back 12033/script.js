let db = {
    funcionarios: [],
    clientes: [],
    servicos: []
};

function salvarDados() {
    localStorage.setItem('db', JSON.stringify(db));
}

function carregarDados() {
    const dados = localStorage.getItem('db');
    if (dados) {
        db = JSON.parse(dados);
    }
}

function mostrarTela(tela) {
    const telas = document.querySelectorAll('.tela');
    telas.forEach(t => {
        t.style.display = 'none';
    });

    const telaAtiva = document.getElementById(tela);
    if (telaAtiva) {
        telaAtiva.style.display = 'block';
    }
}

function adicionarFuncionario() {
    const nome = document.getElementById("funcionario_nome").value;
    const id = db.funcionarios.length + 1;
    db.funcionarios.push({ id, nome });
    salvarDados();
    listarFuncionarios();
}

function adicionarCliente() {
    const nome = document.getElementById("cliente_nome").value;
    const veiculo = document.getElementById("cliente_veiculo").value;
    const placa = document.getElementById("cliente_placa").value;

    // Valida se a placa tem o formato correto (7 caracteres e padrão ABC1D23)
    const placaRegex = /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/;

    if (!placaRegex.test(placa)) {
        alert("A placa do veículo deve ter o formato correto (ABC1D23).");
        return;
    }

    const id = db.clientes.length + 1;
    db.clientes.push({ id, nome, veiculo, placa });
    salvarDados();
    listarClientes();
}

function adicionarServico() {
    const data = document.getElementById("servico_data").value;
    const horario = document.getElementById("servico_horario").value;
    const id_funcionario = document.getElementById("servico_funcionario").value;
    const id_cliente = document.getElementById("servico_cliente").value;
    const tipo = document.getElementById("servico_tipo").value;

    const id = db.servicos.length + 1;
    db.servicos.push({ id, data, horario, id_funcionario, id_cliente, tipo });
    salvarDados();
    listarServicos();

    mostrarMensagemSucesso();
}

function mostrarMensagemSucesso() {
    const mensagem = document.getElementById("mensagem-sucesso");
    mensagem.classList.remove("hidden");
    mensagem.classList.add("visible");

    setTimeout(() => {
        mensagem.classList.remove("visible");
        mensagem.classList.add("hidden");
    }, 3000);
}

function listarFuncionarios() {
    let lista = "";
    db.funcionarios.forEach(f => {
        lista += `<li>${f.nome} <button onclick='excluirFuncionario(${f.id})'>Excluir</button></li>`;
    });
    document.getElementById("lista_funcionarios").innerHTML = lista;
    carregarFuncionariosDropdown();
}

function listarClientes() {
    let lista = "";
    db.clientes.forEach(c => {
        lista += `<li>${c.nome} - Veículo: ${c.veiculo} (Placa: ${c.placa}) <button onclick='excluirCliente(${c.id})'>Excluir</button></li>`;
    });
    document.getElementById("lista_clientes").innerHTML = lista;
    carregarClientesDropdown();
}

function listarServicos() {
    let lista = "";
    db.servicos.forEach(s => {
        const funcionario = db.funcionarios.find(x => x.id == s.id_funcionario)?.nome || 'Desconhecido';
        const cliente = db.clientes.find(x => x.id == s.id_cliente)?.nome || 'Desconhecido';
        lista += `<li>${s.data} - ${s.horario} - Tipo: ${s.tipo} - Funcionário: ${funcionario} - Cliente: ${cliente} <button onclick='excluirServico(${s.id})'>Excluir</button></li>`;
    });
    document.getElementById("lista_servicos").innerHTML = lista;
}

function listarAgendamentos() {
    const agendamentosOrdenados = db.servicos.sort((a, b) => {
        const dataA = new Date(`${a.data}T${a.horario}`);
        const dataB = new Date(`${b.data}T${b.horario}`);
        return dataA - dataB;
    });

    let lista = "";
    agendamentosOrdenados.forEach(s => {
        const funcionario = db.funcionarios.find(x => x.id == s.id_funcionario)?.nome || 'Desconhecido';
        const cliente = db.clientes.find(x => x.id == s.id_cliente)?.nome || 'Desconhecido';
        lista += `<li>${s.data} - ${s.horario} - Tipo: ${s.tipo} - Funcionário: ${funcionario} - Cliente: ${cliente}</li>`;
    });
    document.getElementById("lista_agendamentos").innerHTML = lista;
}

function excluirFuncionario(id) {
    db.funcionarios = db.funcionarios.filter(f => f.id !== id);
    salvarDados();
    listarFuncionarios();
}

function excluirCliente(id) {
    db.clientes = db.clientes.filter(c => c.id !== id);
    salvarDados();
    listarClientes();
}

function excluirServico(id) {
    db.servicos = db.servicos.filter(s => s.id !== id);
    salvarDados();
    listarServicos();
}

function carregarFuncionariosDropdown() {
    let options = "<option value='' disabled selected>Selecione um funcionário</option>";
    db.funcionarios.forEach(f => {
        options += `<option value='${f.id}'>${f.nome}</option>`;
    });
    document.getElementById("servico_funcionario").innerHTML = options;
}

function carregarClientesDropdown() {
    let options = "<option value='' disabled selected>Selecione um cliente</option>";
    db.clientes.forEach(c => {
        options += `<option value='${c.id}'>${c.nome}</option>`;
    });
    document.getElementById("servico_cliente").innerHTML = options;
}

window.onload = function () {
    carregarDados();
    listarFuncionarios();
    listarClientes();
    listarServicos();
    listarAgendamentos();
};
