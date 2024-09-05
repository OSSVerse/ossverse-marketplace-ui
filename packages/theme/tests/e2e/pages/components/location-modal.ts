class LocationModal {
  get modal(): Cypress.Chainable {
    return cy.get('[data-e2e="app-header-location-modal"]');
  }
  get locationInputDiv(): Cypress.Chainable {
    return cy.get('[data-e2e="app-header-location-modal-input-div"]');
  }
  get locationInput(): Cypress.Chainable {
    return cy.get('[data-e2e="app-header-location-modal-input"]');
  }
}
export default new LocationModal();