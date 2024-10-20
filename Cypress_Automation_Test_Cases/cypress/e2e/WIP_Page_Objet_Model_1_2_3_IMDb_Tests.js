import { IMDbPage } from "../Page-objects/WIP_IMDbPage.js";

describe('IMDb Tests', () => {
  const imdbPage = new IMDbPage();
  const sizes = [
    { width: 1280, height: 800 },
    { width: 1024, height: 768 },
    { width: 768, height: 1024 },
  ];

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    imdbPage.visitHomePage();
  });

  sizes.forEach(size => {
    it(`Search and access the completed movie on ${size.width}x${size.height}`, () => {
      cy.viewport(size.width, size.height);
      imdbPage.declineConsentBanner();
      imdbPage.searchFor('Nicolas Cage');
      imdbPage.selectFirstSearchResult();
      cy.get('[data-testid="accordion-item-actor-upcoming-projects"]').should('exist').scrollIntoView().click();
      cy.get('[data-testid="unrel_cred_actor_1"]').should('exist').scrollIntoView().click();
      cy.url().should('include', '/title/');
    });

    it(`Navigates to Top Box Office and rates the 2nd movie on ${size.width}x${size.height}`, () => {
      cy.viewport(size.width, size.height);
      imdbPage.declineConsentBanner();
      imdbPage.openTopBoxOffice();

      // Esperar a que la lista de "Top Box Office" se cargue
      cy.get('[data-testid="chart-layout-main-column"]')
        .find('ul')
        .children('li')
        .eq(1)
        .should('be.visible')
        .find('a')
        .contains('2')
        .should('be.visible')
        .click();

      imdbPage.rateMovie();
      imdbPage.verifyRatingSubmission();
    });

    it(`Navigates to Top 250 TV Shows and clicks on Danny Trejo photo on ${size.width}x${size.height}`, () => {
      cy.viewport(size.width, size.height);
      imdbPage.declineConsentBanner();
      imdbPage.openTopBoxOffice(); // Usar el mismo método para abrir el menú

      imdbPage.navigateToShow('Breaking Bad');
      imdbPage.clickPhotosSection();
      imdbPage.verifyDannyTrejoPhotos();
      imdbPage.clickOnPhoto(1); // Clic en la segunda foto
    });
  });
});
