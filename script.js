const API_URL = "https://6a2a04b1f59cb8f65f1df4a8.mockapi.io/AMOXIRIFADO/MATERIAS";

const form = document.getElementById("form-cadastro");
const inputNome = document.getElementById("input-nome");
const inputQuantidade = document.getElementById("input-quantidade");
const inputBusca = document.getElementById("input-busca");
const totalItens = document.getElementById("total-itens");
const tbody = document.querySelector("#lista-materiais tbody");
const loadingRow = document.getElementById("loading-row");
loadingRow.style.display = "table-row";
tbody.style.display = "none";
let idEdicao = null;



functionfunction atualizarLista() {
    carregarMateriais();
} mostrarErro(mensagem) {
    alert(mensagem);
}
function validarRetirada(estoqueAtual, quantidadeRetirada) {

   if (!Number.isInteger(quantidadeRetirada)) {
    return false;
}
    if (quantidadeRetirada <= 0) {
        return false;
    }

    if (quantidadeRetirada > estoqueAtual) {
        return false;
    }

    return true;
}

async function carregarMateriais() {
    try {
        const resposta = await fetch(API_URL);

        if (!resposta.ok) {
            throw new Error();
        }

        const materiais = await resposta.json();

    tbody.style.opacity = "0.4";
    tbody.innerHTML = "";
        loadingRow.style.display = "none";
tbody.style.display = "table-row-group";

    tbody.style.opacity = "1";

const termoBusca = inputBusca.value.trim().toLowerCase();

totalItens.textContent = materiais.length;

const materiaisFiltrados = materiais.filter(material =>
    material.nome.toLowerCase().includes(termoBusca)
);

inputBusca.value = "";
materiaisFiltrados
            .forEach((material) => {

                const linhaVazia = document.getElementById("linha-vazia");

if (materiaisFiltrados.length === 0) {
    linhaVazia.style.display = "table-row";
} else {
    linhaVazia.style.display = "none";
}
const tr = document.createElement("tr");
const estoqueBaixo = Number(material.quantidade) < 10;

if (estoqueBaixo) {
    tr.classList.add("estoque-critico");
}

tr.innerHTML = ` `
                    <td>${material.nome}</td>
                    <td>${material.quantidade}</td>
                    <td>
                        <input
                            type="number"
                            id="inpFut-retirada"
                            min="1"
                            placeholder="Qtd"
                        >
                    </td>
                    <td>
                        <button
                            type="button"
onclick="baixarMaterial('${material.id}', '${material.nome}', ${material.quantidade}, this)"                            class="btn-baixar"
                        >
                            Baixar
                        </button>

                        <button
    type="button"
    class="btn-editar"
    onclick="editarMaterial('${material.id}')"
>
    ✏️ Editar
</button>
                            Editar
                        </button>

                        <button
                            type="button"
                            onclick="excluirMaterial('${material.id}')"
                            class="btn-excluir"
                        >
                            Excluir
                        </button>
                    </td>
                `;

                tbody.appendChild(tr);
            });

   } catch (error) {
    tbody.innerHTML = "";
    totalItens.textContent = "0";

mostrarErro("Erro ao carregar materiais. Verifique sua conexão e tente novamente.");}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome = inputNome.value.trim();
const quantidade = Number(inputQuantidade.value);

if (nome === "") {
    inputNome.classList.add("input-erro");
    alert("Informe o nome do material.");
    inputNome.focus();
    return;
}

if (isNaN(quantidade) || quantidade < 0) {
    inputQuantidade.classList.add("input-erro");
    alert("Informe uma quantidade válida.");
    inputQuantidade.focus();
    return;
}
const dados = {
    nome,
    quantidade
};

    try {
    const btnCadastrar = document.getElementById("btn-cadastrar");

btnCadastrar.disabled = true;
        if (idEdicao) {
        const resposta = await fetch(`${API_URL}/${idEdicao}`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(dados)
});

if (!resposta.ok) {
    throw new Error();
}

idEdicao = null;
            document.getElementById("btn-cadastrar").textContent = "Cadastrar Material";
        } else {
            const resposta = await fetch(API_URL, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(dados)
});

if (!resposta.ok) {
    throw new Error();
}
        }

        form.reset();

btnCadastrar.disabled = false;

const valorRetirado = quantidadeRetirada;

atualizarLista();

setTimeout(() => {
    const inputs = document.querySelectorAll("#input-retirada");
    inputs.forEach(input => input.value = "");
}, 50);

catch {
    btnCadastrar.disabled = false;
   mostrarErro("Não foi possível salvar o material.");
}

async function editarMaterial(id) {
    try {
       const resposta = await fetch(`${API_URL}/${id}`);

if (!resposta.ok) {
    throw new Error();
}

const material = await resposta.json();
inputNome.value = material.nome;
inputQuantidade.value = material.quantidade;

inputNome.classList.add("modo-edicao");
inputQuantidade.classList.add("modo-edicao");

idEdicao = id;

document.getElementById("btn-cadastrar").textContent = "Atualizar Material";
    } catch {
alert("Não foi possível carregar os dados do material.");    }
}

async function excluirMaterial(id) {
    const confirmacao = confirm("Tem certeza que deseja excluir este material?");

if (!confirmacao) {
    return;
}    

try {
       const resposta = await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
});

if (!resposta.ok) {
    throw new Error();
}

atualizarLista();

    } catch {
mostrarErro("Não foi possível excluir o material.");}

async function baixarMaterial(id, nomeMaterial, estoqueAtual, botao)
    const linha = botao.closest("tr");
const inputRetirada = linha.querySelector("#input-retirada");
const quantidadeRetirada = Number(inputRetirada.value);
const retiradaValida = validarRetirada(estoqueAtual, quantidadeRetirada);

if (!retiradaValida) {
        alert(
            `Retirada inválida.\n\nEstoque atual: ${estoqueAtual}\nQuantidade informada: ${quantidadeRetirada}`
        );
        return;
    }

    const novaQuantidade = estoqueAtual - quantidadeRetirada;

    try {
       await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        nome: nomeMaterial,
        quantidade: novaQuantidade
    })
});
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome: material.nome,
                quantidade: novaQuantidade
            })
        });

        carregarMateriais();

    } catch {
mostrarErro("Não foi possível atualizar o estoque.");    }
}
const btnLimpar = document.getElementById("btn-limpar");

btnLimpar.addEventListener("click", () => {
    form.reset();
    inputNome.classList.remove("input-erro");
    inputQuantidade.classList.remove("input-erro");
    idEdicao = null;

    inputNome.classList.remove("modo-edicao");
inputQuantidade.classList.remove("modo-edicao");

    document.getElementById("btn-cadastrar").textContent = "Cadastrar Material";
});
inputBusca.addEventListener("input", atualizarLista);

inputNome.addEventListener("input", () => {
    inputNome.classList.remove("input-erro");
});

inputQuantidade.addEventListener("input", () => {
    inputQuantidade.classList.remove("input-erro");
});

atualizarLista();