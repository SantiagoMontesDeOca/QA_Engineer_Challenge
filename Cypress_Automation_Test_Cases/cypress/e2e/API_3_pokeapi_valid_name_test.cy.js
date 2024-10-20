// This is a Cypress test file to check if we can get a berry by its valid name
describe('PokeAPI Berry Name Test', () => {
    it('Get berry using a valid name', () => {
      // Define a valid berry name
      const berryName = 'cheri'; // 'cheri' is a valid berry name in the API
  
      // Make a GET request to the PokeAPI with the berry name
      cy.request(`https://pokeapi.co/api/v2/berry/${berryName}`)
        .then((response) => {
          // Check if the response status is 200 (OK)
          expect(response.status).to.eq(200); // We expect a successful response
  
          // Check if the response body contains the expected berry name
          expect(response.body.name).to.eq(berryName); // The name should match the input
        });
    });
  });
  