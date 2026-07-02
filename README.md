📦 Funcionalidades
➕ Cadastro de Materiais

Você pode adicionar novos materiais informando o nome e a quantidade em estoque.
Assim que o formulário é enviado, os dados são enviados para a API usando uma requisição POST, e ficam salvos no MockAPI.

📋 Listagem de Materiais

Quando a aplicação abre, ela busca automaticamente todos os materiais cadastrados na API com uma requisição GET e mostra tudo em uma tabela organizada.

🔎 Pesquisa em Tempo Real

Existe uma barra de pesquisa que facilita encontrar qualquer material rapidamente.

A busca funciona enquanto você digita, filtrando os resultados automaticamente pelo campo:

input-busca
📊 Painel de Controle

O sistema mostra um resumo com a quantidade total de materiais cadastrados.

Esse valor aparece no elemento:

total-itens

Ele é atualizado automaticamente sempre que um item é adicionado, editado ou removido.

✏️ Edição de Materiais

Qualquer material pode ser editado a qualquer momento.

Quando isso acontece, o sistema envia uma requisição PUT atualizando os dados direto na API.

📉 Baixa de Estoque

É possível registrar retiradas de materiais diretamente na tabela.

Antes de atualizar o estoque, o sistema usa a função:

validarRetirada(estoqueAtual, quantidadeRetirada)

Ela impede erros como:

retirada negativa
retirada igual a zero
retirada maior que o estoque

Se estiver tudo certo, o novo valor é calculado e atualizado na API com PUT.

🗑️ Exclusão de Materiais

Os materiais podem ser removidos permanentemente pelo botão de exclusão.

Isso é feito com uma requisição DELETE, e a lista é atualizada automaticamente depois.

⚠️ Controle de Estoque Baixo

Para facilitar o controle, o sistema destaca automaticamente materiais com menos de 10 unidades.

Quando isso acontece, a linha recebe a classe:

estoque-critico

Isso ajuda a identificar rapidamente o que precisa ser reposto.

🔗 Integração com API

O projeto usa o MockAPI como banco de dados.

As operações são:

GET → buscar materiais
POST → cadastrar novos materiais
PUT → atualizar materiais e estoque
DELETE → remover materiais

Tudo é feito usando Fetch API com JavaScript assíncrono.

🧱 Estrutura do Sistema

O projeto segue o padrão CRUD:

Create → adicionar materiais
Read → listar materiais
Update → editar e dar baixa
Delete → remover materiais
🧪 Validação de Estoque

Existe uma validação simples para evitar erros:

validarRetirada(estoqueAtual, quantidadeRetirada)

Ela garante que:

a retirada seja válida
o estoque nunca fique negativo
os dados permaneçam consistentes
⚠️ Tratamento de Erros

Todas as requisições possuem proteção com try/catch.

Isso garante que:

falhas de conexão sejam tratadas
erros da API não quebrem o sistema
o usuário receba feedback quando algo der errado
🛠️ Tecnologias Usadas
HTML5 → estrutura da aplicação
CSS3 → estilização e responsividade
JavaScript → lógica e regras do sistema
Fetch API → comunicação com a API
MockAPI → armazenamento dos dados