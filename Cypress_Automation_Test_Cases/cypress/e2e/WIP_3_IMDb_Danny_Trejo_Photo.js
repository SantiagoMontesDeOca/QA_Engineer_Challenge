describe('3_IMDb Danny Trejo Photo', () => {
  const sizes = [
    { width: 1280, height: 800 }, // Desktop
    { width: 1024, height: 768 }, // Tablet / Desktop
  ];

  // This hook runs before each test
  beforeEach(() => {
    cy.clearCookies(); // Clear cookies before each test
    cy.clearLocalStorage(); // Clear local storage before each test
    cy.visit('/'); // Visit IMDb
  });

  sizes.forEach(size => {
    it(`Navigates to Top 250 TV Shows and clicks on Danny Trejo photo on ${size.width}x${size.height}`, () => {
      // Change the window size to test different viewports
      cy.viewport(size.width, size.height);

      // Decline the consent banner
      cy.get('[data-testid="consent-banner"]') // Select the consent banner
        .find('[data-testid="reject-button"]') // Look for the button using its data-testid
        .should('be.visible') // Ensure the button is visible
        .click(); // Click on the button
      
      // Open the navigation drawer
      cy.get('[aria-label="Open Navigation Drawer"]')
        .should('exist') // Ensure the button exists before clicking
        .click(); // Click to open the navigation drawer
      
      // Navigate to the "Top 250 TV Shows" section
      cy.contains('Top 250 TV Shows')
        .scrollIntoView() // Scroll to make the element visible
        .click(); // Click on the Top 250 TV Shows link

      // Click on Breaking Bad
      cy.contains('Breaking Bad').click(); // Click on the Breaking Bad link

      // Go to the Photos section
      cy.get('div[data-testid="photos-title"] a')
      .click();


      // Search for Danny Trejo's photos
    cy.get('img') // Select all image elements
      .filter('[alt*="Danny Trejo"]') // Filter images that have "Danny Trejo" in the alt text
      
      .should('be.visible'); // Check that each image is visible
      });

      // Click on the 2nd photo in the list
      cy.get('.CLASS UL LIST XXXX') // Select the list of photos
        .find('XXXX') // Find all image elements in the list
        .eq(1) // Select the second photo (index 1)
        .click(); // Click on the second photo
    });
  });
