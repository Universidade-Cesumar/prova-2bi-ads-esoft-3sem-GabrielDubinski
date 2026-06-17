# Funcionalidades

## Cadastro de Materiais

Permite cadastrar novos materiais informando o nome e a quantidade disponível em estoque. Os dados são enviados para a API através de uma requisição POST e armazenados no MockAPI.

---

## Consulta de Materiais

Ao carregar a aplicação, uma requisição GET busca todos os materiais cadastrados na API e exibe as informações em uma tabela organizada.

---

## Edição de Materiais

Os registros podem ser alterados a qualquer momento. Ao editar um material, o sistema realiza uma requisição PUT para atualizar os dados diretamente na API.

---

## Baixa de Estoque

O sistema permite registrar retiradas de materiais através da funcionalidade de baixa de estoque.

Antes da atualização, é executada a função:

validarRetirada(estoqueAtual, quantidadeRetirada)

Essa validação impede que sejam realizadas operações inválidas, como:

* Retirada de valores negativos;
* Retirada de quantidade igual a zero;
* Retirada superior ao estoque disponível.

Quando a operação é válida, o sistema calcula automaticamente o novo saldo e envia uma requisição PUT para atualizar o estoque na API.

---

## Exclusão de Materiais

Materiais podem ser removidos permanentemente através do botão de exclusão.

A remoção é realizada utilizando uma requisição DELETE para a API, atualizando automaticamente a tabela após a exclusão.

---

# Integração com API

A aplicação utiliza o MockAPI como serviço de armazenamento de dados.

Operações implementadas:

* GET: consulta dos materiais cadastrados;
* POST: cadastro de novos materiais;
* PUT: atualização de materiais e baixa de estoque;
* DELETE: remoção de materiais.

Todas as operações são realizadas utilizando Fetch API e JavaScript assíncrono.

---

# Tecnologias Utilizadas

## HTML5

Estrutura da aplicação e organização dos elementos da interface.

## CSS3

Responsável pela estilização da aplicação utilizando tema escuro com detalhes dourados e layout responsivo.

## JavaScript

Implementação das regras de negócio, manipulação do DOM e comunicação com a API.

## Fetch API

Utilizada para realizar as requisições HTTP entre a aplicação e o MockAPI.

## MockAPI

Responsável pelo armazenamento e gerenciamento dos dados utilizados pela aplicação.

---

# Estrutura da Aplicação

A aplicação segue o modelo CRUD completo:

* Create (POST) - Cadastro de materiais;
* Read (GET) - Consulta de materiais;
* Update (PUT) - Edição e baixa de estoque;
* Delete (DELETE) - Exclusão de materiais.

---

# Validação de Estoque

Para garantir a integridade dos dados foi implementada a função:

validarRetirada(estoqueAtual, quantidadeRetirada)

A função retorna:

* true quando a retirada é válida;
* false quando a retirada é inválida.

Essa validação impede inconsistências no estoque e garante que o saldo nunca fique negativo.
