import Base from './base';
import Footer from './components/footer';

class Cart extends Base {
  get getCartProduct() {
    return cy.get('[data-e2e="cart-product"]', { timeout: 60000 }).first();
  }

  get footer() {
    return Footer;
  }
}

export default new Cart();
