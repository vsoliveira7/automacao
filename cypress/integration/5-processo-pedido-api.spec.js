const url = Cypress.config("baseUrl");

describe("Teste de API com Cypress - Sempre IT", () => {
  let authToken; // Variável para armazenar o token
  let orderIDs = []; // Array para armazenar os IDs dos pedidos

  const faker = require("faker");
  const person = {
    userName: faker.internet.userName(),
    email: faker.internet.email(),
  };

  it("Cenário 1: Registrar o cliente na API e obter o token", () => {
    cy.request({
      method: "POST",
      url: `${url}/api-clients/`,
      body: {
        clientName: person.userName,
        clientEmail: person.email,
      },
    }).then((response) => {
      cy.log("Response status (Cenário 1): " + response.status); // Response no console
      cy.log("Response body (Cenário 1): " + JSON.stringify(response.body)); // Response no console

      expect(response.status).to.eq(201);  // Resposta status 201 Created

      authToken = response.body.accessToken; // Armazene o accessToken na variável authToken
    });
  });

  it("Cenário 2: Enviar um pedido ou enviar cinco pedidos diferentes", () => {
    // Certifique-se de que authToken foi definido no cenário 1
    if (!authToken) {
      cy.log(
        "Token não encontrado. Certifique-se de executar o cenário 1 primeiro."
      );
      return;
    }

    // Dados do pedido
    const orderData = {
      bookId: 1,
      customerName: "John",
    };

    // Loop para enviar o pedido várias vezes
    for (let i = 0; i < 5; i++) {
      cy.request({
        method: "POST",
        url: `${url}/orders/`,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: orderData,
      }).then((response) => {
        cy.log(`Response status (Cenário 2 - Envio ${i + 1}): ` + response.status); // Response no console
        cy.log(`Response body (Cenário 2 - Envio ${i + 1}): ` + JSON.stringify(response.body) ); // Response no console

        expect(response.status).to.eq(201); // Resposta status 201 Created

        // Verifica o conteúdo da resposta, como o campo "created"
        expect(response.body.created).to.be.true;
        expect(response.body.orderId).to.exist;

        orderIDs.push(response.body.orderId); // Armazene o valor do orderId no array orderIDs
      });
    }
  });

  it("Cenário 3: Listar todos os pedidos", () => {
    // Certifique-se de que authToken foi definido nos cenários anteriores
    if (!authToken) {
      cy.log(
        "Token não encontrado. Certifique-se de executar o cenário 1 primeiro."
      );
      return;
    }

    cy.request({
      method: "GET",
      url: `${url}/orders/`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      cy.log("Response status (Cenário 3): " + response.status); // Response no console
      cy.log("Response body (Cenário 3): " + JSON.stringify(response.body)); // Response no console

      expect(response.status).to.eq(200); // Resposta status 200 
    });
  });

  it("Cenário 4: Consultar um único pedido", () => {
    // Certifique-se de que authToken e orderIDs foram definidos nos cenários anteriores
    if (!authToken || orderIDs.length === 0) {
      cy.log(
        "Token ou IDs de pedidos não encontrados. Certifique-se de executar os cenários anteriores primeiro."
      );
      return;
    }

    // Pego o primeiro ID do array orderIDs
    const firstOrderID = orderIDs[0];

    cy.request({
      method: "GET",
      url: `${url}/orders/${firstOrderID}`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      cy.log("Response status (Cenário 4): " + response.status); // Response no console
      cy.log("Response body (Cenário 4): " + JSON.stringify(response.body)); // Response no console

      expect(response.status).to.eq(200); // Resposta status 200 
    });
  });

  it("Cenário 5: Atualizar um único pedido", () => {
    // Certifique-se de que authToken e orderIDs foram definidos nos cenários anteriores
    if (!authToken || orderIDs.length === 0) {
      cy.log(
        "Token ou IDs de pedidos não encontrados. Certifique-se de executar os cenários anteriores primeiro."
      );
      return;
    }

    // Pego o primeiro ID do array orderIDs, mas pode pegar qualquer ID 
    const orderIDToUpdate = orderIDs[0];

    // Dados de atualização
    const updateData = {
      customerName: "NovoNome",
    };

    cy.request({
      method: "PATCH", 
      url: `${url}/orders/${orderIDToUpdate}`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      body: updateData,
    }).then((response) => {
      cy.log("Response status (Cenário 5): " + response.status); // Response no console
      cy.log("Response body (Cenário 5): " + JSON.stringify(response.body)); // Response no console

      expect(response.status).to.eq(204); // Resposta status 204 
    });
  });

  it("Cenário 6: Excluir um único pedido", () => {
    // Certifique-se de que authToken e orderIDs foram definidos nos cenários anteriores
    if (!authToken || orderIDs.length === 0) {
      cy.log(
        "Token ou IDs de pedidos não encontrados. Certifique-se de executar os cenários anteriores primeiro."
      );
      return;
    }

    // Pego o primeiro ID do array orderIDs, mas pode pegar qualquer I
    const orderIDToDelete = orderIDs[0];

    cy.request({
      method: "DELETE",
      url: `${url}/orders/${orderIDToDelete}`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      cy.log("Response status (Cenário 6): " + response.status); // Response no console
      cy.log("Response body (Cenário 6): " + JSON.stringify(response.body)); // Response no console
 
      expect(response.status).to.eq(204); // Resposta status 204
    });
  });
});
