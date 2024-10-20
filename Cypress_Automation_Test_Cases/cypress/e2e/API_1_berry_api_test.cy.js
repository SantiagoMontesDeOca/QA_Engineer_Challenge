describe('PokeAPI Berry Tests', () => {
  let berryId = 1; // Set a valid berry ID (1 is a common ID for testing)

  // Test to check berry information using the ID
  it('should return information for berry ID 1', () => {
    // Make a request to the API with the berry ID
    cy.request(`https://pokeapi.co/api/v2/berry/${berryId}`)
      .then((response) => {
        // Check if the response status is 200 (success)
        expect(response.status).to.eq(200); 

        // Check that the response has an ID property
        expect(response.body).to.have.property('id'); 

        // Check that the ID is the same as the one we used
        expect(response.body.id).to.eq(berryId); 

        // Check that the response has a name property
        expect(response.body).to.have.property('name'); 
      });
  });

  // Test to check berry information using a valid berry name
  it('should return information for berry name "cheri"', () => {
    const berryName = 'cheri'; // Set a valid berry name

    // Make a request to the API with the berry name
    cy.request(`https://pokeapi.co/api/v2/berry/${berryName}`)
      .then((response) => {
        // Check if the response status is 200 (success)
        expect(response.status).to.eq(200); 

        // Check that the response has a name property
        expect(response.body).to.have.property('name'); 

        // Check that the name is the same as the one we used
        expect(response.body.name).to.eq(berryName); 
      });
  });
});
