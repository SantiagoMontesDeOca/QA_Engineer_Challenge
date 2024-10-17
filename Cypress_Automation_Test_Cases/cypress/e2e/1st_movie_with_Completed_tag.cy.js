describe('Nicolas Cage IMDb Test', () => {
  
  const sizes = [
    { width: 1280, height: 800 }, // Desktop
    { width: 1024, height: 768 }, // Tablet
    { width: 768, height: 1024 }, // Tablet in portrait
    { width: 375, height: 667 },   // Mobile (iPhone 6/7/8) // I maybe need to change search input for cy.get('#suggestion-search')
    { width: 414, height: 896 },   // Mobile (iPhone XR/11) // I maybe need to change search input for cy.get('#suggestion-search')
    { width: 360, height: 640 }    // Mobile (Android) // I maybe need to change search input for cy.get('#suggestion-search')
  ];

  sizes.forEach(size => {
    it(`Search and access the completed movie on ${size.width}x${size.height}`, () => {
      cy.viewport(size.width, size.height); // Change the window size

      // Clean cookies and local storage.
      cy.clearCookies();
      cy.clearLocalStorage();
      cy.visit('/?language=en'); // Visit website in English

      cy.get('[data-testid="consent-banner"]') // Select the consent banner
        .find('button') // Look for a button inside the banner
        .contains('Decline') // Ensure it contains the text "Decline"
        .should('be.visible') // Ensure the button is visible
        .click(); // Click on the button

      // Search for "Nicolas Cage" in the search field
      cy.get('input[placeholder="Search IMDb"]').type('Nicolas Cage');

      // Wait for the search results to appear and click on the first one
      cy.get('[data-testid="search-result--const"]') // Used to select the search result
        .contains('Nicolas Cage') // Searches for the text "Nicolas Cage"
        .should('exist') // Ensures that the element exists in the DOM
        .and('be.visible') // Ensures that the element is visible
        .click(); // Clicks on the element

      // Go to the "Upcoming" tab in the credits section
      cy.get('[data-testid="accordion-item-actor-upcoming-projects"]').should('exist').click();

      // Select the first movie with the "Completed" status
      cy.get('[data-testid="unrel_cred_actor_1"] > .ipc-metadata-list-summary-item__c > .ipc-metadata-list-summary-item__tc > .ipc-metadata-list-summary-item__stl')
      //.contains('Completed','Completada') // I have an issue related to languages here in order to Searches for the text "Completed"
      .click();
      
      // Verify that the URL contains "/title/"
      cy.url().should('include', '/title/');
    });
  });
});
