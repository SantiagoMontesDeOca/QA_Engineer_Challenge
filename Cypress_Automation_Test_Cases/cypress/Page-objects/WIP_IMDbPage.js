/// <reference types="cypress"/>

export class IMDbPage {
    visitHomePage() {
      cy.visit('/'); // Visit IMDb website
    }
  
    declineConsentBanner() {
      cy.get('[data-testid="consent-banner"]')
        .find('[data-testid="reject-button"]')
        .should('be.visible')
        .click();
    }
  
    searchFor(term) {
      cy.get('input[placeholder="Search IMDb"]').type(term);
    }
  
    selectFirstSearchResult() {
      cy.get('[data-testid="search-result--const"]')
        .contains('Nicolas Cage')
        .should('exist')
        .and('be.visible')
        .click();
    }
  
    openTopBoxOffice() {
      cy.get('[aria-label="Open Navigation Drawer"]')
        .should('exist').click();
      cy.contains('Top Box Office')
        .scrollIntoView().click();
    }
  
    rateMovie() {
      cy.get('[data-testid="hero-rating-bar__aggregate-rating"]')
        .first()
        .should('exist')
        .click();
  
      cy.get('[data-testid="rating-button__user-rating"]')
        .first()
        .should('exist')
        .click();
      
      cy.wait(1000); // Esperar que se cargue el pop-up
  
      cy.get('.ipc-rating-prompt__container', { timeout: 10000 })
        .should('be.visible')
        .find('[aria-label*="5"]')
        .should('exist')
        .scrollIntoView()
        .click({ force: true });
    }
  
    verifyRatingSubmission() {
      cy.get('.ipc-rating-display__rating', { timeout: 10000 })
        .should('contain', '5');
  
      cy.get('button.ipc-btn--rounded.ipc-rating-prompt__rate-button[aria-disabled="false"]')
        .should('be.visible')
        .click({ force: true });
    }
  
    navigateToShow(title) {
      cy.contains(title).click();
    }
  
    clickPhotosSection() {
      cy.get('div[data-testid="photos-title"] a').click();
    }
  
    verifyDannyTrejoPhotos() {
      cy.get('img')
        .filter('[alt*="Danny Trejo"]')
        .should('have.length.greaterThan', 0)
        .each(($img) => {
          cy.wrap($img).should('be.visible');
        });
    }
  
    clickOnPhoto(index) {
      cy.get('.photo-list').find('img').eq(index).click();
    }
  };
  