
class AddToCart {
  get getAddToCart(): Cypress.Chainable {
    return cy.get('[data-e2e="add-to-cart"]');
  }
}

export default new AddToCart;
