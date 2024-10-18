describe('Nicolas Cage IMDb Test', () => {
  const sizes = [
    { width: 1280, height: 800 }, // Desktop
    { width: 1024, height: 768 }, // Tablet
    { width: 768, height: 1024 }, // Tablet en modo retrato
/*  Create a new cy.get('input[placeholder="Search IMDb"]') for this zies:
    { width: 375, height: 667 },   // Móvil (iPhone 6/7/8)
    { width: 414, height: 896 },   // Móvil (iPhone XR/11)
    { width: 360, height: 640 }    // Móvil (Android)
*/  
  ];

  // This hook runs before each test
  beforeEach(() => {
    cy.clearCookies(); // Clear cookies
    cy.clearLocalStorage(); // Clear local storage
    cy.visit('/?language=en'); // Visit the IMDb website in English
  });

  sizes.forEach(size => {
    it(`Search and access the completed movie on ${size.width}x${size.height}`, () => {
      // Change the window size for each test
      cy.viewport(size.width, size.height); // Cambia el tamaño de la ventana aquí

      // Decline the consent banner
      cy.get('[data-testid="consent-banner"]') // Select the consent banner
        .find('button') // Look for a button inside the banner
        .contains('Decline') // Ensure it contains the text "Decline"
        .should('be.visible') // Ensure the button is visible
        .click(); // Click on the button
      
      // Search for "Nicolas Cage" in the search field
      cy.get('input[placeholder="Search IMDb"]').type('Nicolas Cage');

      // Wait for the search results to appear and click on the first one
      cy.get('[data-testid="search-result--const"]') // Select the search result
        .contains('Nicolas Cage') // Look for the text "Nicolas Cage"
        .should('exist') // Ensure the element exists in the DOM
        .and('be.visible') // Ensure the element is visible
        .click(); // Click on the element

        cy.get('[data-testid="accordion-item-actor-upcoming-projects"]') // Selecciona el ítem del acordeón
    .should('exist') // Asegúrate de que el elemento existe en el DOM
    .scrollIntoView() // Desplaza el elemento a la vista
    .should('be.visible') // Asegúrate de que el elemento es visible
    .wait(500) // Espera medio segundo
    .click(); // Haz clic en el elemento

        cy.get('[data-testid="unrel_cred_actor_1"]') // Selecciona el elemento
        .should('exist') // Asegúrate de que el elemento exista en el DOM
        .scrollIntoView() // Desplaza el elemento a la vista si es necesario
        .and('be.visible') // Asegúrate de que el elemento sea visible
        .click(); // Haz clic en el elemento
      
      // Verify that the URL contains "/title/"
      cy.url().should('include', '/title/');
    });
  });
});