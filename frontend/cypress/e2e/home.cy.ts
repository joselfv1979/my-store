describe.only('open home page', () => {
    it('passes', () => {
      cy.visit('/');
      cy.contains('Product categories');
    })
  })