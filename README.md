# 📦 Controle de Almoxarifado

## Visão Geral

O Controle de Almoxarifado é uma aplicação web desenvolvida para auxiliar no gerenciamento de materiais de forma simples, prática e eficiente. O sistema permite registrar itens em estoque, acompanhar suas quantidades, atualizar informações e remover registros quando necessário.

O projeto foi desenvolvido utilizando tecnologias web nativas, dispensando a necessidade de bancos de dados, servidores ou instalações complexas. Todas as informações são armazenadas localmente no navegador, proporcionando uma experiência rápida e acessível.

---

# Objetivo

O principal objetivo deste sistema é facilitar o controle de materiais em pequenos estoques, almoxarifados ou ambientes organizacionais que necessitam de uma solução leve para registro e acompanhamento de itens.

Além de substituir controles manuais e planilhas simples, a aplicação oferece uma interface intuitiva que permite visualizar e gerenciar os materiais de forma centralizada.

---

# Funcionalidades

## Cadastro de Materiais

Permite registrar novos itens informando:

* Nome do material;
* Quantidade disponível em estoque.

Após o cadastro, o material é imediatamente exibido na tabela de controle.

---

## Consulta de Estoque

Todos os materiais cadastrados são apresentados em uma tabela organizada contendo:

* Nome do material;
* Quantidade disponível;
* Ações disponíveis para gerenciamento.

Essa visualização facilita a localização e o acompanhamento dos itens cadastrados.

---

## Edição de Registros

O sistema permite alterar informações já cadastradas, possibilitando a correção de dados ou atualização das quantidades sempre que necessário.

---

## Exclusão de Materiais

Itens que não fazem mais parte do estoque podem ser removidos através da funcionalidade de exclusão, mantendo o controle sempre atualizado.

---

## Armazenamento Local

Os dados são armazenados utilizando a tecnologia LocalStorage do navegador.

Dessa forma:

* As informações permanecem salvas mesmo após fechar o navegador;
* Não é necessário utilizar banco de dados;
* Não há necessidade de conexão com a internet para funcionamento;
* O sistema permanece leve e de fácil utilização.

---

# Tecnologias Utilizadas

## HTML5

Responsável pela estruturação dos elementos da aplicação e organização do conteúdo apresentado ao usuário.

## CSS3

Utilizado para estilização da interface, proporcionando um visual moderno baseado em tema escuro com detalhes dourados, garantindo melhor experiência visual e identidade profissional.

## JavaScript

Responsável pela implementação das regras de negócio e funcionalidades do sistema, incluindo:

* Cadastro de materiais;
* Edição de registros;
* Exclusão de itens;
* Atualização dinâmica da tabela;
* Persistência dos dados através do LocalStorage.

---

# Estrutura do Projeto

```text
Controle-Almoxarifado/
│
├── index.html
├── styles.css
├── script.js
└── README.md
```

### index.html

Contém toda a estrutura da interface do sistema.

### styles.css

Responsável pela aparência visual, cores, layout e responsividade.

### script.js

Implementa toda a lógica de funcionamento da aplicação.

### README.md

Documentação do projeto.

---

# Como Utilizar

### 1. Abrir o Sistema

Abra o arquivo `index.html` em qualquer navegador moderno.

### 2. Cadastrar um Material

Preencha:

* Nome do material;
* Quantidade disponível.

Em seguida, clique em **Cadastrar Material**.

### 3. Gerenciar Itens

Após o cadastro, utilize os botões disponíveis para:

* Editar informações;
* Atualizar quantidades;
* Excluir registros.

---

# Benefícios da Solução

* Interface simples e intuitiva;
* Fácil aprendizado e utilização;
* Não requer instalação;
* Não utiliza banco de dados;
* Funciona localmente;
* Baixo consumo de recursos;
* Fácil manutenção;
* Possibilidade de expansão futura.

---

# Melhorias Futuras

O sistema foi estruturado para permitir a implementação de novos recursos, como:

* Pesquisa de materiais;
* Filtro por categorias;
* Controle de estoque mínimo;
* Registro de entradas e saídas;
* Cadastro de fornecedores;
* Histórico de movimentações;
* Geração de relatórios;
* Exportação para Excel;
* Exportação para PDF;
* Dashboard com indicadores de estoque;
* Controle de usuários e permissões;
* Integração com banco de dados.

---

# Conclusão

O Controle de Almoxarifado demonstra a aplicação prática das tecnologias HTML, CSS e JavaScript na construção de uma solução funcional para gerenciamento de estoque.

Mesmo sendo uma aplicação simples, ela oferece os principais recursos necessários para o controle de materiais e estabelece uma base sólida para futuras evoluções e integrações, podendo ser adaptada para diferentes cenários organizacionais.

---

**Versão:** 1.0

**Status:** Em funcionamento

**Tecnologias:** HTML5 • CSS3 • JavaScript

**Tipo de Projeto:** Aplicação Web para Controle de Estoque e Almoxarifado
