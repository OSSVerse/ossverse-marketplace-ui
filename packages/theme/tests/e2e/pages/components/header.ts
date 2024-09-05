import { el } from '../utils/element';

class Header {
  get cart(): Cypress.Chainable {
    return el('app-header-cart');
  }

  get categories(): Cypress.Chainable {
    return cy.get('[data-e2e*="app-header"]');
  }

  get category() {
    return {
      women: () => el('app-header-url_women'),
      men: () => el('app-header-url_men')
    };
  }

  get location(): Cypress.Chainable {
    return cy.get('[data-e2e="app-header-location"]');
  }

  get locationInputDiv(): Cypress.Chainable {
    return cy.get('[data-e2e="app-header-location-input-div"]');
  }

  get locationInput(): Cypress.Chainable {
    return cy.get('[data-e2e="app-header-location-input"]');
  }

  // Search

  get searchBox(): Cypress.Chainable {
    return cy.get('[data-e2e="app-header-search-box"]');
  }

  get searchInputField(): Cypress.Chainable {
    return cy.get('input[aria-label="Search"]');
  }

  openCart(): Cypress.Chainable {
    const click = $el => $el.click();
    return this.cart.pipe(click).should(() => {
      expect(Cypress.$('[data-e2e="sidebar-cart"]')).to.exist;
    });
  }
}

export default new Header();
