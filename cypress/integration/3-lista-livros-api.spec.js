const url = Cypress.config("baseUrl");

describe("Teste de API com Cypress - Sempre IT", () => {
  it("Listar todos livros", () => {
    cy.request(`${url}/books`).then((response) => {
      expect(response.status).to.eq(200); // Resposta status 200

      cy.log("Resposta da rota /books: " + JSON.stringify(response.body)); // Response no console

      // Verifica o conteúdo da resposta
      expect(response.body).to.deep.equal([
        { id: 1, name: "The Russian", type: "fiction", available: true },
        { id: 2, name: "Just as I Am", type: "non-fiction", available: false },
        { id: 3, name: "The Vanishing Half", type: "fiction", available: true },
        {
          id: 4,
          name: "The Midnight Library",
          type: "fiction",
          available: true,
        },
        { id: 5, name: "Untamed", type: "non-fiction", available: true },
        {
          id: 6,
          name: "Viscount Who Loved Me",
          type: "fiction",
          available: true,
        },
      ]);
    });
  });

  it("Consultar livros com parâmetros de consulta opcionais", () => {
    // Parâmetros de consulta desejados
    const queryParams = {
      tipo: "ficção", // Pode ser ajustado para "não ficção"
      limite: 10, // Pode ser ajustado o limite conforme necessário (entre 1 e 20)
    };

    // URL com os parâmetros de consulta
    const finalUrl = `${url}/books?${new URLSearchParams(
      queryParams
    ).toString()}`;

    cy.request(finalUrl).then((response) => {
      expect(response.status).to.eq(200); // Resposta status 200

      cy.log( "Resposta da consulta com parâmetros de consulta: " + JSON.stringify(response.body) // Resposta no console
      );
    });
  });
});
