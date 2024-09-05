class AddressInput {
  get getNameInput(): Cypress.Chainable {
    return cy.get('[data-e2e="name-input"]');
  }

  get getMobileInput(): Cypress.Chainable {
    return cy.get('[data-e2e="mobile-input"]');
  }

  get getCompleteAddInput(): Cypress.Chainable {
    return cy.get('[data-e2e="full-address-input"]');
  }

  get getBuildingInput(): Cypress.Chainable {
    return cy.get('[data-e2e="building-input"]');
  }

  get getPintInput(): Cypress.Chainable {
    return cy.get('[data-e2e="pin-input"]');
  }

  get getLandMarkInput(): Cypress.Chainable {
    return cy.get('[data-e2e="landmark-input"]');
  }

  get getAddButton(): Cypress.Chainable {
    return cy.get('[data-e2e="add-address"]');
  }
}

export default new AddressInput();
