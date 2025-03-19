<script>
        // Simulação de banco de dados
        let db = {
            celebrantes: [],
            participantes: [],
            celebracoes: []
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

        function adicionarCelebrante() {
            const nome = document.getElementById("celebrante_nome").value;
            const nascimento = document.getElementById("celebrante_nascimento").value;
            
            const id = db.celebrantes.length + 1;
            db.celebrantes.push({ id, nome, nascimento });
            salvarDados();
            listarCelebrantes();
            listarAniversariantes();
        }

        function adicionarParticipante() {
            const nome = document.getElementById("participante_nome").value;
            const nascimento = document.getElementById("participante_nascimento").value;
            
            const id = db.participantes.length + 1;
            db.participantes.push({ id, nome, nascimento });
            salvarDados();
            listarParticipantes();
            listarAniversariantes();
        }

        function adicionarCelebracao() {
            const data = document.getElementById("celebracao_data").value;
            const horario = document.getElementById("celebracao_horario").value;
            const id_celebrante = document.getElementById("celebracao_celebrante").value;
            
            const id = db.celebracoes.length + 1;
            db.celebracoes.push({ id, data, horario, id_celebrante });
            salvarDados();
            listarCelebracoes();
        }

        function listarCelebrantes() {
            let lista = "";
            db.celebrantes.forEach(c => {
                lista += `<li>${c.nome} - ${c.nascimento} <button onclick='excluirCelebrante(${c.id})'>Excluir</button></li>`;
            });
            document.getElementById("lista_celebrantes").innerHTML = lista;
            carregarCelebrantesDropdown();
        }

        function listarParticipantes() {
            let lista = "";
            db.participantes.forEach(p => {
                lista += `<li>${p.nome} - ${p.nascimento} <button onclick='excluirParticipante(${p.id})'>Excluir</button></li>`;
            });
            document.getElementById("lista_participantes").innerHTML = lista;
        }

        function listarCelebracoes() {
            let lista = "";
            db.celebracoes.forEach(c => {
                const celebrante = db.celebrantes.find(x => x.id == c.id_celebrante)?.nome || 'Desconhecido';
                lista += `<li>${c.data} - ${c.horario} - Celebrante: ${celebrante} <button onclick='excluirCelebracao(${c.id})'>Excluir</button></li>`;
            });
            document.getElementById("lista_celebracoes").innerHTML = lista;
        }

        function excluirCelebrante(id) {
            db.celebrantes = db.celebrantes.filter(c => c.id !== id);
            salvarDados();
            listarCelebrantes();
            listarAniversariantes();
        }

        function excluirParticipante(id) {
            db.participantes = db.participantes.filter(p => p.id !== id);
            salvarDados();
            listarParticipantes();
            listarAniversariantes();
        }

        function excluirCelebracao(id) {
            db.celebracoes = db.celebracoes.filter(c => c.id !== id);
            salvarDados();
            listarCelebracoes();
        }

        function carregarCelebrantesDropdown() {
            let options = "";
            db.celebrantes.forEach(c => {
                options += `<option value='${c.id}'>${c.nome}</option>`;
            });
            document.getElementById("celebracao_celebrante").innerHTML = options;
        }

        function listarAniversariantes() {
            const hoje = new Date();
            const diaAtual = hoje.getDate();
            const mesAtual = hoje.getMonth() + 1;
            let aniversariantes = "";

            [...db.celebrantes, ...db.participantes].forEach(p => {
                const [ano, mes, dia] = p.nascimento.split("-");
                if (parseInt(dia) === diaAtual && parseInt(mes) === mesAtual) {
                    aniversariantes += `<li>${p.nome} - ${p.nascimento} (Hoje!)</li>`;
                } else if (parseInt(mes) === mesAtual) {
                    aniversariantes += `<li>${p.nome} - ${p.nascimento}</li>`;
                }
            });

            document.getElementById("lista_aniversariantes").innerHTML = aniversariantes;
        }

        window.onload = function () {
            carregarDados();
            listarCelebrantes();
            listarParticipantes();
            listarCelebracoes();
            listarAniversariantes();
        };
    </script>

