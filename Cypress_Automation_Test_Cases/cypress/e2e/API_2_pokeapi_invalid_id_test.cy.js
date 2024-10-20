describe('PokeAPI - Invalid ID Test', () => {
    it('Check error is appearing when calling with an invalid ID', () => {
      // Make a GET request to the PokeAPI with an invalid berry ID
      cy.request({
        method: 'GET', // Specify the HTTP method
        url: 'https://pokeapi.co/api/v2/berry/9999', // Invalid ID
        failOnStatusCode: false // Prevent Cypress from failing the test on non-2xx status codes
      }).then((response) => {
        // Check that the response status is 404
        expect(response.status).to.eq(404); // Validate that we received a 404 status code
      });
    });
  });
  