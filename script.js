const API_URL = "https://6a2a04b1f59cb8f65f1df4a8.mockapi.io/AMOXIRIFADO/MATERIAS";

const form = document.getElementById("form-cadastro");
const inputNome = document.getElementById("input-nome");
const inputQuantidade = document.getElementById("input-quantidade");
const tbody = document.querySelector("#lista-materiais tbody");

let idEdicao = null;

function validarRetirada(estoqueAtual, quantidadeRetirada) {
    if (quantidadeRetirada <= 0) {
        return false;
    }

    if (quantidadeRetirada > estoqueAtual) {
        return false;
    }

    return true;
}

async function carregarMateriais() {
    const resposta = await fetch(API_URL);
    const materiais = await resposta.json();

    tbody.innerHTML = "";

    materiais.forEach((material) => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${material.nome}</td>
            <td>${material.quantidade}</td>
            <td>
                <input
                    type="number"
                    id="input-retirada"
                    min="1"
                    placeholder="Qtd"
                >
            </td>
            <td>
                <button
                    type="button"
                    onclick="baixarMaterial('${material.id}', ${material.quantidade}, this)"
                    class="btn-baixar"
                >
                    Baixar
                </button>

                <button
                    type="button"
                    onclick="editarMaterial('${material.id}')"
                >
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
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const dados = {
        nome: inputNome.value.trim(),
        quantidade: Number(inputQuantidade.value)
    };

    if (idEdicao) {
        await fetch(`${API_URL}/${idEdicao}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        });

        idEdicao = null;
        document.getElementById("btn-cadastrar").textContent = "Cadastrar Material";
    } else {
        await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        });
    }

    form.reset();
    carregarMateriais();
});

async function editarMaterial(id) {
    const resposta = await fetch(`${API_URL}/${id}`);
    const material = await resposta.json();

    inputNome.value = material.nome;
    inputQuantidade.value = material.quantidade;

    idEdicao = id;

    document.getElementById("btn-cadastrar").textContent = "Atualizar Material";
}

async function excluirMaterial(id) {
    await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    carregarMateriais();
}

async function baixarMaterial(id, estoqueAtual, botao) {
    const linha = botao.closest("tr");

    const inputRetirada = linha.querySelector("#input-retirada");

    const quantidadeRetirada = Number(inputRetirada.value);

    if (!validarRetirada(estoqueAtual, quantidadeRetirada)) {
        alert("Quantidade inválida.");
        return;
    }

    const novaQuantidade = estoqueAtual - quantidadeRetirada;

    await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            quantidade: novaQuantidade
        })
    });

    carregarMateriais();
}

carregarMateriais();