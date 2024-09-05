import Base from './base';
import Header from './components/header';
import LocationModal from './components/location-modal';
import locationSidebar from './components/location-sidebar';
// import SearchResult from './components/search-result';
import openSearch from './components/open-search';

class Home extends Base {
  get header() {
    return Header;
  }

  get locationModal() {
    return LocationModal;
  }

  get locationSideBar() {
    return locationSidebar;
  }

  get openSearch() {
    return openSearch;
  }

  visit(): Cypress.Chainable {
    return cy.visit('/');
  }
}

export default new Home();
