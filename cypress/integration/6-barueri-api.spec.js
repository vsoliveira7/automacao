describe('Teste de API para Localidade Barueri', () => {
  it('Deve validar a existência da localidade Barueri', () => {
    cy.request({
      method: 'GET',
      url: 'https://viacep.com.br/ws/06454000/json/',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      expect(response.status).to.eq(200);

      // Campo localidade contém Barueri
      expect(response.body.localidade).to.eq('Barueri');
    });
  });
});
