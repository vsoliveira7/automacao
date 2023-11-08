## Configurando o Ambiente

1. Instalar Node.js: acesse o site oficial, baixe e instale a versão para seu computador.
 - [Node.js](https://nodejs.org/en/)

2. Escolher uma IDE de JavaScript para programar: sugestão VS Code.
- [VSCode](https://code.visualstudio.com/)

### Instalar o Cypress:

1. Clone o repositório

> git clone https://github.com/vsoliveira7/automacao.git

2. Instale as dependências
> npm install cypress --save-dev
> npm install chai --save-dev
> npm i faker@2.1.3

3. Run the app
> npx cypress open


## Tecnologias

- [Cypress.js](https://www.cypress.io/)
- [Node.js](https://nodejs.org/en/)
- [JavaScript.js](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)

## Lib

- [Faker.js](https://www.npmjs.com/package/faker/v/2.1.3)


## Linha de comando

Para abrir o navegador e rodar os testes, executar o comando: `npx cypress open`

Para rodar todos os testes sem navegador, executar o comando:`npx cypress run`

Para rodar um teste específico, basta colocar o nome do arquivo que deseja executar, como por exemplo: `npx cypress run --spec 'cypress\integration\1-visit-page.spec.js'`


## Resumo dos arquivos

> Arquivo: [1-visitar-pagina-api.spec.js]
Visita API da página https://simple-books-api.glitch.me e verifica os retorno {"message":"Welcome to the Simple Books API."}

> Arquivo: [2-status-api.spec.js]
Visita API da página https://simple-books-api.glitch.me/status e verifica os retorno {"status":"OK"}

> Arquivo: [3-lista-livros-api.spec.js]

No cenário 1, visita API da página https://simple-books-api.glitch.me/books e verifica os retorno [{"id":1,"name":"The Russian","type":"fiction","available":true},{"id":2,"name":"Just as I Am","type":"non-fiction","available":false},{"id":3,"name":"The Vanishing Half","type":"fiction","available":true},{"id":4,"name":"The Midnight Library","type":"fiction","available":true},{"id":5,"name":"Untamed","type":"non-fiction","available":true},{"id":6,"name":"Viscount Who Loved Me","type":"fiction","available":true}]

Além disso, no cenário 2 consulta livros com parâmetros de consulta opcionais.


> Arquivo: [4-unico-livro-api.spec.js]

No cenário 1, consulta o livro 1 da página;
No cenário 2, consulta o livro 2 da página;
No cenário 3,consulta um livro 9 que não existe na página.

> Arquivo: [5-processo-pedido-api.spec.js]

No cenário 1, eu crio registro o cliente na API e obtenho o token 
No cenátio 2, com o token criado no cenário 1 eu envio os pedidos 
No cenário 3, com o token criado no cenário 1 eu listo todos os pedidos 
No cenário 4, com o token criado no cenário 1, consulto somente um único pedido do cenário 3
No cenário 5, com o token criado no cenário 1, atualizo somente um único pedido 
No cenário 6, com o token criado no cenário 1, excluo um único pedido desejado 