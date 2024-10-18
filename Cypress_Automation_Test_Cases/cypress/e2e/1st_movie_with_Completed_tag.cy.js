describe('Nicolas Cage IMDb Test', () => {
  
  const sizes = [
    { width: 1280, height: 800 }, // Desktop
    { width: 1024, height: 768 }, // Tablet
    { width: 768, height: 1024 }, // Tablet in portrait
    { width: 375, height: 667 },   // Mobile (iPhone 6/7/8)
    { width: 414, height: 896 },   // Mobile (iPhone XR/11)
    { width: 360, height: 640 }    // Mobile (Android)
  ];

  sizes.forEach(size => {
    // Hook que se ejecuta antes de cada prueba
    beforeEach(() => {
      cy.clearCookies(); // Limpia las cookies
      cy.clearLocalStorage(); // Limpia el almacenamiento local
      cy.visit('/?language=en'); // Visita el sitio web en inglés

      // Cambia el tamaño de la ventana para cada prueba
      cy.viewport(size.width, size.height);

      // Aceptar el banner de consentimiento
      cy.get('[data-testid="consent-banner"]') // Selecciona el banner de consentimiento
        .find('button') // Busca un botón dentro del banner
        .contains('Decline') // Asegura que contenga el texto "Decline"
        .should('be.visible') // Asegura que el botón sea visible
        .click(); // Hace clic en el botón
    });

    it(`Search and access the completed movie on ${size.width}x${size.height}`, () => {
      // Search for "Nicolas Cage" in the search field
      cy.get('input[placeholder="Search IMDb"]').type('Nicolas Cage');

      // Wait for the search results to appear and click on the first one
      cy.get('[data-testid="search-result--const"]') // Selecciona el resultado de búsqueda
        .contains('Nicolas Cage') // Busca el texto "Nicolas Cage"
        .should('exist') // Asegura que el elemento exista en el DOM
        .and('be.visible') // Asegura que el elemento sea visible
        .click(); // Hace clic en el elemento

      // Go to the "Upcoming" tab in the credits section
      cy.get('[data-testid="accordion-item-actor-upcoming-projects"]').should('exist').click();

      // Select the first movie with the "Completed" status
      cy.get('[data-testid="unrel_cred_actor_1"] > .ipc-metadata-list-summary-item__c > .ipc-metadata-list-summary-item__tc > .ipc-metadata-list-summary-item__stl')
      //.contains('Completed','Completada') // Problema relacionado con idiomas
      .click();
      
      // Verify that the URL contains "/title/"
      cy.url().should('include', '/title/');
    });
  });
});
