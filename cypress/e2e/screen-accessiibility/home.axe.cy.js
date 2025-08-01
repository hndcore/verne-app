/// <reference types="cypress" />
/// <reference types="cypress-axe" />
/// <reference types="@testing-library/cypress" />

describe("Accessibility Test on Home", () => {
  it("accessibility check in Home screen", () => {
    cy.visit(Cypress.env("HOST"));
    // I know we should not use wait, but I have a forced delay for load in the app
    cy.wait(3000);
    cy.injectAxe();
    cy.customCheckA11y();
  });
});
