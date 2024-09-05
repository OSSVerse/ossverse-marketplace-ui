
class OpenSearch {
  get getSearchHomeInput(): Cypress.Chainable {
    return cy.get('[data-e2e="home-search-input"]');
  }

  get getSearchButton(): Cypress.Chainable {
    return cy.get('[data-e2e="home-search-button"]');
  }
}

export default new OpenSearch;
