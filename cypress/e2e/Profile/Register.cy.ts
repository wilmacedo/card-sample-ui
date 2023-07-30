describe("Register case", () => {
  beforeEach(() => {
    cy.setCookie(
      "willpay@auth",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRjNTk0N2RjOWMyMzFlMzg5YTZkODdjIiwiZW1haWwiOiJ3aWwubWFjZWRvLnNhQGdtYWlsLmNvbSIsIm5hbWUiOiJXaWwgTWFjZWRvIiwicGFzc3dvcmQiOiIkMmIkMDYkdjdrLjNFVXVjYjNtVlFxTE1Nb1pIdWk0c0h1UHc1MTAuRGFHSWhoaWlacmE0SE1YTUdMcG0ifSwiaWF0IjoxNjkwNzQ3Nzc1fQ.qhyd_b4bucsH6vzqChGG7xGFxxYZN5OX2OVIrNTJpUY"
    );
    cy.visit("/profile");

    cy.get("button").contains("Register").click();
  });

  it("should be able to fill input", () => {
    cy.get('input[name="number"]').type("1234567890123452");
    cy.get('input[name="cardholder"]').type("Wil Macedo");
    cy.get('input[name="expiration"]').type("1123");
    cy.get('input[name="cvv"]').type("123");

    cy.get('button[type="submit"]').should("not.be.disabled");
  });
});
