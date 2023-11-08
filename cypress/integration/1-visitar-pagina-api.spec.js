const url = Cypress.config("baseUrl");

describe("Teste de API com Cypress - Sempre IT", () => {
  it("Acesar a API e verificar a mensagem de bem vindo", () => {
    cy.request(url).then((response) => {
      expect(response.status).to.eq(200);  // Resposta status 200 (OK)
      expect(response.body).to.have.property("message"); // Verifica a presença da propriedade "message" na resposta

      cy.log("Mensagem da resposta da API: " + JSON.stringify(response.body)); // Response no console
    });
  });
});
