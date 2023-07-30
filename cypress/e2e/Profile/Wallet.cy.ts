describe("Wallet case", () => {
  beforeEach(() => {
    cy.setCookie(
      "willpay@auth",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRjNTk0N2RjOWMyMzFlMzg5YTZkODdjIiwiZW1haWwiOiJ3aWwubWFjZWRvLnNhQGdtYWlsLmNvbSIsIm5hbWUiOiJXaWwgTWFjZWRvIiwicGFzc3dvcmQiOiIkMmIkMDYkdjdrLjNFVXVjYjNtVlFxTE1Nb1pIdWk0c0h1UHc1MTAuRGFHSWhoaWlacmE0SE1YTUdMcG0ifSwiaWF0IjoxNjkwNzQ3Nzc1fQ.qhyd_b4bucsH6vzqChGG7xGFxxYZN5OX2OVIrNTJpUY"
    );
    cy.visit("/profile");
  });

  it("should be able to enter in page", () => {
    cy.url().should("include", "/profile");

    cy.get("button").contains("Wallet");
    cy.get("button").contains("Register");
  });

  it("should be able to log out and redirect to home page", () => {
    cy.get("button").contains("Log out").click();

    cy.url().should("include", "/logout");
    cy.get("span").contains("Redirecting...");

    cy.url().should("include", "/");
  });

  it("should be able to change tab", () => {
    cy.url().should("include", "/profile");

    cy.get("button").contains("Register").click();
    cy.url().should("include", "/profile#register");
  });
});
