/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

describe("Books Feature E2E Tests", () => {
  beforeEach(() => {
    cy.intercept(`${Cypress.env("HOST")}/api/books?_expand=author&_expand=genre`, {
      fixture: "booksExtended.json",
    }).as("getBooks");
    cy.intercept(`${Cypress.env("HOST")}/api/authors`, { fixture: "authors.json" }).as(
      "getAuthors",
    );
    cy.intercept(`${Cypress.env("HOST")}/api/genres`, { fixture: "genres.json" }).as("getGenres");

    cy.visit(Cypress.env("HOST"));
    cy.wait(["@getBooks", "@getAuthors", "@getGenres"]);
  });

  it("should display the book table with fixture data", () => {
    cy.get('[data-testid="book-table"]').should("be.visible");
    cy.get('[data-testid="book-table-title"]').should("contain", "Your Literary Collection");
    cy.get('[data-testid="book-table-data-container"]').should("be.visible");

    cy.get('[data-testid="book-table-data-container"]').within(() => {
      cy.contains("Twenty Thousand Leagues Under the Sea").should("be.visible");
      cy.contains("The Lord of the Rings").should("be.visible");
      cy.contains("A Game of Thrones").should("be.visible");
      cy.contains("Journey to the Center of the Earth").should("be.visible");
      cy.contains("The Hobbit").should("be.visible");
    });
  });
  it("should open view book dialog", () => {
    cy.get('[data-testid="book-table-data-row-view-button-1"]').first().click();
    cy.get('[data-testid="book-table-detail-dialog-content"]').should("be.visible");
    cy.contains("Book Details").should("be.visible");
    cy.contains("Twenty Thousand Leagues Under the Sea").should("be.visible");
    cy.get('[data-testid="book-table-detail-dialog-content"]')
      .first()
      .within(() => {
        cy.get("button").contains("Close").click({ force: true });
      });
    cy.get('[data-testid="book-table-detail-dialog-content"]').should("not.exist");
  });
});
