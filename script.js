const API_URL = "https://6a2a04b1f59cb8f65f1df4a8.mockapi.io/AMOXIRIFADO/MATERIAS";

const form = document.getElementById("form-cadastro");
const inputNome = document.getElementById("input-nome");
const inputQuantidade = document.getElementById("input-quantidade");
const inputBusca = document.getElementById("input-busca");
const totalItens = document.getElementById("total-itens");
const tbody = document.querySelector("#lista-materiais tbody");

let idEdicao = null;

function validarRetirada(estoqueAtual, quantidadeRetirada) {

    if (isNaN(quantidadeRetirada)) {
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

       tbody.innerHTML = "";

const termoBusca = inputBusca.value.trim().toLowerCase();

totalItens.textContent = materiais.length;

const materiaisFiltrados = materiais.filter(material =>
    material.nome.toLowerCase().includes(termoBusca)
);

materiaisFiltrados
            .forEach((material) => {
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

    } catch {
        alert("Erro ao conectar com a API. Verifique sua conexão com a internet.");
    }
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const dados = {
        nome: inputNome.value.trim(),
        quantidade: Number(inputQuantidade.value)
    };

    try {
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

    } catch {
        alert("Erro ao salvar material.");
    }
});

async function editarMaterial(id) {
    try {
        const resposta = await fetch(`${API_URL}/${id}`);
        const material = await resposta.json();

        inputNome.value = material.nome;
        inputQuantidade.value = material.quantidade;

        idEdicao = id;

        document.getElementById("btn-cadastrar").textContent = "Atualizar Material";

    } catch {
        alert("Erro ao carregar material.");
    }
}

async function excluirMaterial(id) {
    try {
        await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        carregarMateriais();

    } catch {
        alert("Erro ao excluir material.");
    }
}

async function baixarMaterial(id, nomeMaterial, estoqueAtual, botao)
    const linha = botao.closest("tr");

    const inputRetirada = linha.querySelector("#input-retirada");

    const quantidadeRetirada = Number(inputRetirada.value);

    if (!validarRetirada(estoqueAtual, quantidadeRetirada)) {
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
        alert("Erro ao atualizar estoque.");
    }
}

inputBusca.addEventListener("input", carregarMateriais);

carregarMateriais();