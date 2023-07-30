describe("Register case", () => {
  beforeEach(() => {
    cy.visit("/register");
  });

  it("should be able to register", () => {
    cy.get('input[name="email"]').type("wil.macedo.sa@gmail.com");
    cy.get('input[name="name"]').type("Wil Macedo");
    cy.get('input[name="password"]').type("123456{enter}");
  });

  it("should be redirect to login page when click in Log in", () => {
    cy.get('a[href*="login"]').click();

    cy.url().should("include", "/login");
  });
});
