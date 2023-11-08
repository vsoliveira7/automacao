const url = Cypress.config("baseUrl");

describe("Teste de API com Cypress - Sempre IT", () => {
  it("Consultar um único livro igual a 1", () => {
    const bookId = 1; // bookId desejado

    const url1 = `${url}/books/${bookId}`; //URL com o bookId

    cy.request(url1).then((response) => {
      expect(response.status).to.eq(200); // Resposta status 200 

      cy.log("Resposta da consulta com bookId: " + JSON.stringify(response.body)); // Response no console

      // Verifica o conteúdo da resposta
      const livroEsperado = {
        id: 1,
        name: "The Russian",
        author: "James Patterson and James O. Born",
        isbn: "1780899475",
        type: "fiction",
        price: 12.98,
        "current-stock": 12,
        available: true,
      };
      expect(response.body).to.deep.equal(livroEsperado);
    });
  });

  it("Consultar um único livro igual a 4", () => {
    const bookId = 4; // bookId desejado

    const url2 = `${url}/books/${bookId}`; //URL com o bookId

    cy.request(url2).then((response) => {
      expect(response.status).to.eq(200); // Resposta status 200 

      cy.log( "Resposta da consulta com bookId: " + JSON.stringify(response.body)); // Response no console

      // Verifica o conteúdo da resposta
      const livroEsperado = {
        id: 4,
        name: "The Midnight Library",
        author: "Matt Haig",
        type: "fiction",
        price: 15.6,
        "current-stock": 87,
        available: true,
      };
      expect(response.body).to.deep.equal(livroEsperado);
    });
  });

  it("Consultar um único livro igual a 9 inexistente", () => {
    const bookId = 9; // bookId desejado

    const url3 = `${url}/books/${bookId}`; //URL com o bookId

    cy.request({
      url: url3,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);  //Resposta status 404 (Not Found)

      cy.log("Resposta da consulta com bookId inexistente: " + JSON.stringify(response.body)); // Response no console

      // Valida o conteúdo da resposta
      expect(response.body).to.deep.equal({ error: "No book with id 9" });
    });
  });
});
