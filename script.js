const form = document.getElementById("form-cadastro");
const inputNome = document.getElementById("input-nome");
const inputQuantidade = document.getElementById("input-quantidade");
const tbody = document.querySelector("#lista-materiais tbody");

let materiais = JSON.parse(localStorage.getItem("materiais")) || [];
let indiceEdicao = null;

function salvarDados() {
    localStorage.setItem("materiais", JSON.stringify(materiais));
}

function renderizarTabela() {
    tbody.innerHTML = "";

    materiais.forEach((material, index) => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${material.nome}</td>
            <td>${material.quantidade}</td>
            <td>
                <button onclick="editarMaterial(${index})">✏️ Editar</button>
                <button onclick="excluirMaterial(${index})">🗑️ Excluir</button>
            </td>
        `;

        tbody.appendChild(tr);
    });

    salvarDados();
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = inputNome.value.trim();
    const quantidade = Number(inputQuantidade.value);

    if (!nome) return;

    if (indiceEdicao !== null) {
        materiais[indiceEdicao] = {
            nome,
            quantidade
        };

        indiceEdicao = null;
        document.getElementById("btn-cadastrar").textContent =
            "Cadastrar Material";
    } else {
        materiais.push({
            nome,
            quantidade
        });
    }

    form.reset();
    renderizarTabela();
});

function editarMaterial(index) {
    inputNome.value = materiais[index].nome;
    inputQuantidade.value = materiais[index].quantidade;

    indiceEdicao = index;

    document.getElementById("btn-cadastrar").textContent =
        "Atualizar Material";
}

function excluirMaterial(index) {
    if (confirm(`Deseja excluir "${materiais[index].nome}"?`)) {
        materiais.splice(index, 1);
        renderizarTabela();
    }
}

renderizarTabela();