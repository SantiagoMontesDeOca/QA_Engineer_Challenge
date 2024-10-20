describe('PokeAPI Berry Flavor Valid Name Test', () => {
    it('Check we can call with a valid name', () => {
      // Define a valid name for the berry flavor
      const validName = 'sweet'; // Example of a valid berry flavor name
  
      // Make a GET request to the API using the valid name
      cy.request(`https://pokeapi.co/api/v2/berry-flavor/${validName}`).then((response) => {
        // Check if the response status is 200 (OK)
        expect(response.status).to.eq(200); // Ensure the status is 200
  
        // Optionally, check that the response body contains the expected name
        expect(response.body.name).to.eq(validName); // Ensure the name matches
      });
    });
  });
  