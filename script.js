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

let idEdicao = null;
let timeoutBusca = null;

function mostrarErro(msg) {
    alert(msg);
}

function atualizarLista() {
    carregarMateriais();
}

function validarRetirada(estoqueAtual, qtd) {
    if (!Number.isInteger(qtd)) return false;
    if (qtd <= 0) return false;
    if (qtd > estoqueAtual) return false;
    return true;
}

function debounceBusca(callback, delay = 400) {
    clearTimeout(timeoutBusca);
    timeoutBusca = setTimeout(callback, delay);
}

function destacarTexto(texto, termo) {
    if (!termo) return texto;
    const regex = new RegExp(`(${termo})`, "gi");
    return texto.replace(regex, `<span class="highlight">$1</span>`);
}

async function carregarMateriais() {
    try {
        loadingRow.style.display = "table-row";
        tbody.innerHTML = "";
        tbody.style.display = "none";

        const res = await fetch(API_URL);
        if (!res.ok) throw new Error();

        const materiais = await res.json();

        const termoBusca = inputBusca.value.trim().toLowerCase();

        const filtrados = materiais.filter(m =>
            m.nome.toLowerCase().includes(termoBusca)
        );

        totalItens.textContent = filtrados.length;

        const linhaVazia = document.getElementById("linha-vazia");

        if (linhaVazia) {
            linhaVazia.style.display = filtrados.length === 0 ? "table-row" : "none";
        }

        filtrados.forEach(material => {
            const tr = document.createElement("tr");

            if (Number(material.quantidade) < 10) {
                tr.classList.add("estoque-critico");
            }

            tr.innerHTML = `
                <td>${destacarTexto(material.nome, termoBusca)}</td>
                <td>${material.quantidade}</td>
                <td>
                    <input type="number" class="input-retirada" min="1" placeholder="Qtd">
                </td>
                <td>
                    <button type="button" class="btn-baixar"
                        onclick="baixarMaterial('${material.id}', '${material.nome}', ${material.quantidade}, this)">
                        Baixar
                    </button>

                    <button type="button" class="btn-editar"
                        onclick="editarMaterial('${material.id}')">
                        Editar
                    </button>

                    <button type="button" class="btn-excluir"
                        onclick="excluirMaterial('${material.id}')">
                        Excluir
                    </button>
                </td>
            `;

            tbody.appendChild(tr);
        });

        loadingRow.style.display = "none";
        tbody.style.display = "table-row-group";

    } catch (error) {
        loadingRow.style.display = "none";
        tbody.innerHTML = "";
        totalItens.textContent = "0";
        mostrarErro("Erro ao carregar materiais.");
    }
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome = inputNome.value.trim();
    const quantidade = Number(inputQuantidade.value);

    if (!nome) return mostrarErro("Informe o nome.");
    if (isNaN(quantidade) || quantidade < 0) return mostrarErro("Quantidade inválida.");

    const dados = { nome, quantidade };

    try {
        btnCadastrar.disabled = true;

        if (idEdicao) {
            await fetch(`${API_URL}/${idEdicao}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dados)
            });

            idEdicao = null;
            btnCadastrar.textContent = "Cadastrar Material";

        } else {
            await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dados)
            });
        }

        form.reset();
        btnCadastrar.disabled = false;
        atualizarLista();

    } catch {
        btnCadastrar.disabled = false;
        mostrarErro("Erro ao salvar.");
    }
});

async function editarMaterial(id) {
    try {
        const res = await fetch(`${API_URL}/${id}`);
        const material = await res.json();

        inputNome.value = material.nome;
        inputQuantidade.value = material.quantidade;

        inputNome.classList.add("modo-edicao");
        inputQuantidade.classList.add("modo-edicao");

        idEdicao = id;
        btnCadastrar.textContent = "Atualizar Material";

    } catch {
        mostrarErro("Erro ao editar.");
    }
}

async function excluirMaterial(id) {
    if (!confirm("Confirmar exclusão?")) return;

    try {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        atualizarLista();
    } catch {
        mostrarErro("Erro ao excluir.");
    }
}

async function baixarMaterial(id, nome, estoque, btn) {
    const linha = btn.closest("tr");
    const input = linha.querySelector(".input-retirada");
    const qtd = Number(input.value);

    if (!validarRetirada(estoque, qtd)) {
        return mostrarErro("Retirada inválida.");
    }

    try {
        await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                nome,
                quantidade: estoque - qtd
            })
        });

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

inputNome.addEventListener("input", () => inputNome.classList.remove("input-erro"));
inputQuantidade.addEventListener("input", () => inputQuantidade.classList.remove("input-erro"));

inputBusca.addEventListener("input", () => debounceBusca(atualizarLista));

atualizarLista();