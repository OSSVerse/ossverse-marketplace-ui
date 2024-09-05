import page from '../pages/factory';

context('Change location when location not set', () => {
  beforeEach(()=>{
    page.home.visit();
    cy.then(()=>{
      window.localStorage.setItem('__location__', '');
    });
  });
  it(['e2e', 'happypath'], 'Should successfully change location', ()=>{
    page.home.visit();
    // page.home.header.location.should('exist');
    // page.home.header.locationInputDiv.should('exist');
    // page.home.header.locationInput.should('be.disabled');
    // page.home.header.locationInput.invoke('val').should('eq','');
    // //before click
    // page.home.locationModal.modal.should('not.exist');
    // page.home.locationSideBar.sideBar.should('not.exist');
    // page.home.header.locationInputDiv.click();
    // //after first click
    // page.home.locationModal.modal.should('exist');
    // page.home.locationModal.locationInput.should('be.disabled');
    // //after second click
    // page.home.locationModal.locationInputDiv.click();
    // page.home.locationSideBar.sideBar.should('exist');
    // page.home.locationSideBar.sideBarInput.should('exist');
    // page.home.locationSideBar.sideBarInput.type('2');
    // page.home.locationSideBar.sideBarFirstOption.then(($temp)=>{
    //   const text = $temp.text()
    //   cy.log(text)
    //   page.home.locationSideBar.sideBarFirstOption.click();
    //   page.home.locationModal.modal.should('not.exist');
    //   page.home.locationSideBar.sideBar.should('not.exist');
    //   page.home.header.locationInput.should('be.disabled');
    //   page.home.header.locationInput.invoke('val').then((inputText)=>{
    //     //todo: fix the way the text is chosen from google. Seems to have a lot of special characters
    //     const val = text.replace(/[^a-zA-Z]/g, "").trim();
    //     if (inputText.replace(/[^a-zA-Z]/g, "").trim() !== val)
    //       throw new Error;
    //   });
    // });
  });
});
