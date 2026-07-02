const API_URL = "https://6a2a04b1f59cb8f65f1df4a8.mockapi.io/AMOXIRIFADO/MATERIAS";

const form = document.getElementById("form-cadastro");
const inputNome = document.getElementById("input-nome");
const inputQuantidade = document.getElementById("input-quantidade");
const inputBusca = document.getElementById("input-busca");
const totalItens = document.getElementById("total-itens");
const tbody = document.querySelector("#lista-materiais tbody");
const loadingRow = document.getElementById("loading-row");
const btnLimpar = document.getElementById("btn-limpar");
const btnCadastrar = document.getElementById("btn-cadastrar");
document.getElementById("total-itens").textContent = materiaisFiltrados.length;
btnCadastrar.disabled = true;

setTimeout(() => {
    btnCadastrar.disabled = false;
}, 800);

let idEdicao = null;



function destacarTexto(texto, termo) {
    if (!termo) return texto;

    const regex = new RegExp(`(${termo})`, "gi");

    return texto.replace(regex, `<span class="highlight">$1</span>`);
}

function mostrarErro(mensagem) {
    alert(mensagem);
}

function atualizarLista() {
    carregarMateriais();
}

function validarRetirada(estoqueAtual, quantidadeRetirada) {
    if (!Number.isInteger(quantidadeRetirada)) return false;
    if (quantidadeRetirada <= 0) return false;
    if (quantidadeRetirada > estoqueAtual) return false;
    return true;
}


let timeoutBusca = null;

function debounceBusca(callback, delay = 400) {
    clearTimeout(timeoutBusca);

    timeoutBusca = setTimeout(() => {
        callback();
    }, delay);
}
async function carregarMateriais() {
    try {
        loadingRow.style.display = "table-row";
        tbody.style.display = "none";

        const resposta = await fetch(API_URL);

        if (!resposta.ok) throw new Error();

        const materiais = await resposta.json();

        tbody.innerHTML = "";
        totalItens.textContent = materiais.length;

        const termoBusca = inputBusca.value.trim().toLowerCase();

        const materiaisFiltrados = materiais.filter(material =>
            material.nome.toLowerCase().includes(termoBusca)
        );

        const linhaVazia = document.getElementById("linha-vazia");

        if (materiaisFiltrados.length === 0 && linhaVazia) {
            linhaVazia.style.display = "table-row";
        } else if (linhaVazia) {
            linhaVazia.style.display = "none";
        }

        materiaisFiltrados.forEach((material) => {
            const tr = document.createElement("tr");

            if (Number(material.quantidade) < 10) {
                tr.classList.add("estoque-critico");
            }

            tr.innerHTML = `
                <td>${material.nome}</td>
                <td>${material.quantidade}</td>
                <td>

                inputRetirada.addEventListener("input", (e) => {
    if (e.target.value < 0) e.target.value = 0;
});
                    <input type="number" id="input-retirada" min="1" placeholder="Qtd">
                </td>
                <td>
                    <button type="button"
                        onclick="baixarMaterial('${material.id}', '${material.nome}', ${material.quantidade}, this)"
                        class="btn-baixar">
                        Baixar
                    </button>

                    <button type="button"
                        onclick="editarMaterial('${material.id}')"
                        class="btn-editar">
                        Editar
                    </button>

                    <button type="button"
                        onclick="excluirMaterial('${material.id}')"
                        class="btn-excluir">
                        botao.disabled = false;
                        Excluir
                    </button>
                </td>
            `;

            tbody.appendChild(tr);
        });

        loadingRow.style.display = "none";
        tbody.style.display = "table-row-group";

    } catch (error) {
        tbody.innerHTML = "";
        totalItens.textContent = "0";
        loadingRow.style.display = "none";
        mostrarErro("Erro ao carregar materiais. Verifique sua conexão.");
    }
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome = inputNome.value.trim();
    const quantidade = Number(inputQuantidade.value);

    if (nome === "") {
        inputNome.classList.add("input-erro");
        return mostrarErro("Informe o nome do material.");
    }

    if (isNaN(quantidade) || quantidade < 0) {
        inputQuantidade.classList.add("input-erro");
        return mostrarErro("Informe uma quantidade válida.");
    }

    const dados = { nome, quantidade };

    try {
        btnCadastrar.disabled = true;

        if (idEdicao) {
            const res = await fetch(`${API_URL}/${idEdicao}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dados)
            });

            if (!res.ok) throw new Error();

            idEdicao = null;
            btnCadastrar.textContent = "Cadastrar Material";

        } else {
            const res = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dados)
            });

            if (!res.ok) throw new Error();
        }

        form.reset();
        btnCadastrar.disabled = false;

        atualizarLista();

    } catch (error) {
        btnCadastrar.disabled = false;
        mostrarErro("Não foi possível salvar o material.");
    }
});

async function editarMaterial(id) {
    try {
        const res = await fetch(`${API_URL}/${id}`);
        if (!res.ok) throw new Error();

        const material = await res.json();

        inputNome.value = material.nome;
        inputQuantidade.value = material.quantidade;

        inputNome.classList.add("modo-edicao");
        inputQuantidade.classList.add("modo-edicao");

        idEdicao = id;
        btnCadastrar.textContent = "Atualizar Material";

    } catch {
        mostrarErro("Não foi possível carregar o material.");
    }
}

async function excluirMaterial(id) {
    if (!confirm("Tem certeza que deseja excluir?")) return;

    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (!res.ok) throw new Error();

        atualizarLista();

    } catch {
        mostrarErro("Erro ao excluir material.");
    }
}

async function baixarMaterial(id, nomeMaterial, estoqueAtual, botao) {
    const linha = botao.closest("tr");
    const inputRetirada = linha.querySelector(".input-retirada");
    const quantidadeRetirada = Number(inputRetirada.value);

    if (!validarRetirada(estoqueAtual, quantidadeRetirada)) {
        return mostrarErro("Retirada inválida.");
    }

    const novaQuantidade = estoqueAtual - quantidadeRetirada;

    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                nome: nomeMaterial,
                quantidade: novaQuantidade
            })
        });

        if (!res.ok) throw new Error();

        atualizarLista();

    } catch {
        mostrarErro("Erro ao atualizar estoque.");
    }
}

btnLimpar.addEventListener("click", () => {
    form.reset();
    inputNome.classList.remove("input-erro", "modo-edicao");
    inputQuantidade.classList.remove("input-erro", "modo-edicao");
    idEdicao = null;
    btnCadastrar.textContent = "Cadastrar Material";
});

inputNome.addEventListener("input", () => {
    inputNome.classList.remove("input-erro");
});

inputQuantidade.addEventListener("input", () => {
    inputQuantidade.classList.remove("input-erro");
});

inputBusca.addEventListener("input", () => {
    debounceBusca(atualizarLista);
});
atualizarLista();