const url = Cypress.config("baseUrl");

describe("Teste de API com Cypress - Sempre IT", () => {
  it("Verificar o status da API", () => {
    cy.request(`${url}/status`).then((response) => {
      expect(response.status).to.eq(200);   // Resposta status 200
      expect(response.body.status).to.eq("OK"); // Verifica o valor "OK" no corpo da resposta

      cy.log("Mensagem da resposta da API: " + JSON.stringify(response.body));  // Response no console
    });
  });
});
