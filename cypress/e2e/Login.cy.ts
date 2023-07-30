describe("Register case", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("should be able to register", () => {
    cy.get('input[name="email"]').type("wil.macedo.sa@gmail.com");
    cy.get('input[name="password"]').type("123456{enter}");

    cy.url().should("include", "/profile");

    cy.getCookie("willpay@auth").should("exist");
  });

  it("should be redirect to register page when click in Register", () => {
    cy.get('a[href*="register"]').click();

    cy.url().should("include", "/register");
  });
});
