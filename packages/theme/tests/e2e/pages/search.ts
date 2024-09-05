import Base from './base';
import addToCart from './components/addToCart';
import Footer from './components/footer';

class Search extends Base {
  get getTotalResult() {
    return cy.get('[data-e2e="total-result"]', { timeout: 60000 });
  }

  get addTocart() {
    return addToCart;
  }

  get footer() {
    return Footer;
  }
}

export default new Search();
