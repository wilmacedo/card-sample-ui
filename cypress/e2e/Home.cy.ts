describe("Home case", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should click in Log in button and redirect to login page", () => {
    cy.get('a[href*="login"]').click();

    cy.url().should("include", "/login");

    cy.get("span").contains("Do not have account?");
  });

  it("should click in Get Started button in navbar and redirect to register page", () => {
    cy.get('a[href*="register"]').click();

    cy.url().should("include", "/register");

    cy.get("span").contains("Already have account?");
  });

  it("should fill input and click in Get Started button and redirect to register page with search query", () => {
    cy.get('input[name="email"]').type("wil.macedo.sa@gmail.com{enter}");

    cy.url().should("include", "/register?email=wil.macedo.sa@gmail.com");

    cy.get("span").contains("Already have account?");
  });
});
