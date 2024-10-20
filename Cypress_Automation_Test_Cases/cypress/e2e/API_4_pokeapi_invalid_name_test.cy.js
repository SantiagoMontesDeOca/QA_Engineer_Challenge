describe('PokeAPI Invalid Name Test', () => {
    it('Check error is appearing when calling with invalid name', () => {
      // Make a GET request to the PokeAPI with an invalid name
      cy.request({
        method: 'GET',
        url: 'https://pokeapi.co/api/v2/berry/invalid-name',
        failOnStatusCode: false, // Prevent Cypress from failing the test on a non-2xx response
      }).then((response) => {
        // Check that the status code is 404
        expect(response.status).to.eq(404); // Expect 404 status code
  
        // Optionally, check the response body for the expected error message
        expect(response.body).to.eq('Not Found'); // Validate the error message
      });
    });
  });
  