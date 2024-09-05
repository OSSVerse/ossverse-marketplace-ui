import page from '../pages/factory';

context('Search item', () => {
  beforeEach(() => {
    page.home.visit();
    cy.then(() => {
      window.localStorage.setItem('__search__', '');
    });
  });
  it(['e2e', 'happypath'], 'Should get search item', () => {
    page.home.visit();
    // page.home.header.locationInputDiv.click();
    // page.home.locationModal.locationInputDiv.click();
    // page.home.locationSideBar.sideBarInput.type('j p nagar');
    // page.home.locationSideBar.sideBarFirstOption.then(($temp)=>{
    //   const text = $temp.text();
    //   cy.log(text);
    //   page.home.locationSideBar.sideBarFirstOption.click();
    // });

    // page.home.openSearch.getSearchHomeInput.should('exist');
    // page.home.openSearch.getSearchHomeInput.type('orange');
    // page.home.openSearch.getSearchButton.should('exist');
    // page.home.openSearch.getSearchButton.click();
    // page.search.getTotalResult.should('be.visible');
    // page.search.addTocart.getAddToCart.first().click();
    // page.search.footer.getFooterButton.click();
    // page.cart.getCartProduct.should('be.visible');
    // page.cart.footer.getFooterButton.contains('checkout').click();
    // page.checkout.checkOut.getHead.should('be.visible');
    // page.checkout.checkOut.getAddShippingButton.click();
    // page.checkout.checkOut.fillAddress();
    // page.checkout.checkOut.footer.getFooterButton.contains('Proceed To Pay').click();

    // Proceed To Pay
    // page.cart.footer.getFooterButton.click();

    // page.home.header.searchBox.should('exist');
    // page.home.header.searchInputField.should('exist');
    // page.home.header.searchInputField.should('not.be.focused');
    // page.home.header.searchInputField.invoke('val').should('eq', '');
    // click and type input
    // page.home.header.searchInputField.click();
    // page.home.searchResult.getBeforeResult.should('exist');
    // page.home.header.searchInputField.type('coffee{enter}');
  });
});
