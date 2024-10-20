describe('IMDb Birthday Search Test', () => {
    // Before each test, visit the IMDb homepage
    beforeEach(() => {
        cy.visit('/'); // Visit IMDb website
    });

    it('Navigates to Celebrities born yesterday and takes a screenshot', () => {
        // Open the menu by clicking the button
        cy.get('[data-testid="nav-menu"]').click(); // Click on the menu button

        // Navigate to the 'Born Today' section
        cy.contains('Born Today').click(); // Click on the 'Born Today' link

        // Clear the default search input if it exists
        cy.get('input[name="q"]').clear(); // Clear the search input

        // Unfold the Birthday options and search for 'Celebrities born yesterday'
        cy.contains('Birthday').click(); // Click to unfold the Birthday options
        cy.contains('Celebrities born yesterday').click(); // Click on the 'Celebrities born yesterday' option

        // Select the 3rd name in the list and click it
        cy.get('.findResult') // Adjust the selector based on the actual structure
          .eq(2) // Select the 3rd element (index 2)
          .find('a') // Find the link within the result
          .click(); // Click on the link

        // Take a screenshot of the page
        cy.screenshot('celebrity-born-yesterday'); // Take a screenshot and save it
    });
});
