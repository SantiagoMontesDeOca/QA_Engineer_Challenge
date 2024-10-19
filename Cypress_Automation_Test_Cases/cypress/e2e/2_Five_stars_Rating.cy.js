describe('IMDb Top Box Office Rating Test', () => {
  const sizes = [
    { width: 1280, height: 800 }, // Desktop
    { width: 1024, height: 768 }, // Tablet
    { width: 768, height: 1024 }, // Tablet in portrait mode
/*  Create a new cy.get for these sizes:
    { width: 375, height: 667 },   // Mobile (iPhone 6/7/8) 
    { width: 414, height: 896 },   // Mobile (iPhone XR/11)
    { width: 360, height: 640 }    // Mobile (Android)
*/  
  ];

  // Reuse the beforeEach hook to clear cookies and visit IMDb
  beforeEach(() => {
    cy.clearCookies(); // Clear cookies
    cy.clearLocalStorage(); // Clear local storage
    cy.visit('/?language=en'); // Visit IMDb in English
  });

  sizes.forEach(size => {
    it(`Navigates to Top Box Office and rates the 2nd movie on ${size.width}x${size.height}`, () => {
      // Change the window size
      cy.viewport(size.width, size.height);

      // Decline the consent banner if it appears
      cy.get('[data-testid="consent-banner"]')
        .find('button')
        .contains('Decline')
        .should('be.visible')
        .click();
      
      // Open the navigation drawer
      cy.get('[aria-label="Open Navigation Drawer"]')
        .should('exist') // Ensure the button exists
        .click(); // Click to open the navigation drawer
      
      // Navigate to the "Top Box Office" section
      cy.contains('Top Box Office')
        .scrollIntoView()
        .click();
      
      // Wait for the Top Box Office list to load
      cy.get('[data-testid="chart-layout-main-column"]') // Select the main column container
        .find('ul') // Find the unordered list inside the container
        .children('li') // Get all list items directly under the ul
        .eq(1) // Select the second item (index 1)
        .should('be.visible') // Ensure the element is visible
        .find('a') // Find the link (anchor tag) within the selected item
        .contains('2') // Ensure the link contains the number '2'
        .should('be.visible') // Ensure the link is visible
        .click(); // Click on the link

      // Select the IMDb rating container and click the first button
      cy.get('[data-testid="hero-rating-bar__aggregate-rating"]')
        .first() // Select the first button if there are multiple
        .should('exist')
        .click();

      // Open the modal to rate
      cy.get('[data-testid="rating-button__user-rating"]')
        .first() // Select the first button if there are multiple
        .should('exist')
        .click();
            
      cy.wait(1000); //WAit for pop up to load

      cy.get('.ipc-rating-prompt__container', { timeout: 10000 }) 
        .should('be.visible') // Ensure the container is visible
        .find('[aria-label*="5"]') // Find the button within the container whose aria-label contains "5"
        .should('exist') // Ensure the button exists
        .scrollIntoView() // Scroll the element into view
        .click({ force: true }); // Force the click if necessary

      // Verify that the rating was submitted successfully
      cy.get('.ipc-rating-display__rating', { timeout: 10000 }) // Wait for the rating display
         .should('contain', '5'); // Check that the rating contains "5"
            
      cy.get('button.ipc-btn--rounded.ipc-rating-prompt__rate-button[aria-disabled="false"]') // Select button
        .should('be.visible') // Make sure it is visible 
        .click({ force: true }); //Force click

    });
  });
});
