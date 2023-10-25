describe.only("login page", () => {
  it("contains login form", () => {
    cy.visit("/login");
    cy.contains("Log In");
    cy.get('[placeholder="Username"]').should('have.value', '');
    cy.get('[placeholder="Password"]').should('have.value', '');
    cy.get('#form-login-button').should('contain', 'Log in');
  });
    

  it("while logging should be visible loading spinner", () => {
    cy.visit("/login");
    cy.get('[placeholder="Username"]').type("admin");
    cy.get('[placeholder="Password"]').type("renaido");
    cy.get('#form-login-button').click();
    cy.intercept('/');
    cy.get('#loader').should('be.visible');
  })

  it("login success", () => {
    cy.visit("/login");
    cy.get('[placeholder="Username"]').type("admin");
    cy.get('[placeholder="Password"]').type("renaido");
    cy.get('#form-login-button').click();
    cy.contains("Product categories");
    cy.contains("admin");
    expect(localStorage.getItem('token')).not.equal('');
  });

  it("login failed", () => {
    cy.visit("/login");
    cy.get('[placeholder="Username"]').type("admin");
    cy.get('[placeholder="Password"]').type("wrongPassword");
    cy.get('#form-login-button').click();
    cy.get('.alert-danger').should('have.css', 'color', 'rgb(88, 21, 28)')
    cy.get('.alert-danger').should('contain', 'Invalid credentials');
  })
});
