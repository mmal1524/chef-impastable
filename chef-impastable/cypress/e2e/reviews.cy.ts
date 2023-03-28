import React from "react"

describe('Reviews', () => {

  it("Logging in", () => {
    cy.visit('/')
    cy.get("[data-test='UsernameField']").type("reviewedrecipes")
    cy.get("[data-test='PasswordField']").type("Password1!")
    cy.get("[data-test='LoginButton']").click()
  })

  it("Clicking a recipe", () => {
    cy.get("[data-test='Recipe-6']", {timeout: 60000}).click()
  })

  it("Leave a review button", () => {
    cy.get("[data-test='LeaveAReview']", {timeout: 60000}).should("contain", "Leave a Review").click()
  })

  it("UI dialog popup", () => {
    cy.get("[role='dialog']").should("contain", "Leave a Review")

    cy.get("[data-test='ReviewUI']")
      .should("contain", "Rating")
      .should("contain", "Description/Comments")

    cy.get("[data-test='Stars']").should("exist")
      .get("[data-test='Star1']").should("exist")
      .get("[data-test='Star2']").should("exist")
      .get("[data-test='Star3']").should("exist")
      .get("[data-test='Star4']").should("exist")
      .get("[data-test='Star5']").should("exist")

    cy.get("[data-test='description']").should("exist")
  })

  
})