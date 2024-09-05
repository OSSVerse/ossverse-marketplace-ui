class Footer {
  get getFooterButton(): Cypress.Chainable {
    return cy.get('[data-e2e="footer-button"]');
  }
}

export default new Footer();
