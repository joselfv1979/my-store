describe.only('open register page', () => {
    it('contains register from', () => {
      cy.visit('/register');
      cy.contains('Register');
    })
  })