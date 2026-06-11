const materiais = [];

const formCadastro = document.getElementById('form-cadastro');
const inputNome = document.getElementById('input-nome');
const inputQuantidade = document.getElementById('input-quantidade');
const listaMateriaisBody = document.querySelector('#lista-materiais tbody');

function renderizarMateriais() {
    listaMateriaisBody.innerHTML = '';

    materiais.forEach((material, indice) => {
        const linha = document.createElement('tr');

        const colunaNome = document.createElement('td');
        colunaNome.textContent = material.nome;

        const colunaQuantidade = document.createElement('td');
        colunaQuantidade.textContent = material.quantidade;

        const colunaAcoes = document.createElement('td');
        const botaoExcluir = document.createElement('button');
        botaoExcluir.textContent = 'Excluir';
        botaoExcluir.className = 'btn-excluir';
        botaoExcluir.addEventListener('click', () => {
            excluirMaterial(indice);
        });

        colunaAcoes.appendChild(botaoExcluir);
        linha.appendChild(colunaNome);
        linha.appendChild(colunaQuantidade);
        linha.appendChild(colunaAcoes);
        listaMateriaisBody.appendChild(linha);
    });
}

function cadastrarMaterial(nome, quantidade) {
    const nomeFormatado = nome.trim();
    if (!nomeFormatado || quantidade < 0 || Number.isNaN(quantidade)) {
        return;
    }

    const materialExistente = materiais.find((item) => item.nome.toLowerCase() === nomeFormatado.toLowerCase());

    if (materialExistente) {
        materialExistente.quantidade += quantidade;
    } else {
        materiais.push({ nome: nomeFormatado, quantidade });
    }

    renderizarMateriais();
}

function excluirMaterial(indice) {
    materiais.splice(indice, 1);
    renderizarMateriais();
}

formCadastro.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const nome = inputNome.value;
    const quantidade = Number(inputQuantidade.value);

    cadastrarMaterial(nome, quantidade);

    formCadastro.reset();
    inputNome.focus();
});

renderizarMateriais();
