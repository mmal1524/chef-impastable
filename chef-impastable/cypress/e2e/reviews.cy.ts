import React from "react"

it('Review Page', () => {

  describe("Logging in", () => {
    cy.visit('/')
    cy.get("[data-test='UsernameField']").type("reviewedrecipes")
    cy.get("[data-test='PasswordField']").type("Password1!")
    cy.get("[data-test='LoginButton']").click()
  })

  describe("Clicking a recipe", () => {
    cy.get("[data-test='Recipe-0']", {timeout: 15000}).click()
  })

  describe('Leave a review', () => {
    cy.get("[data-test='LeaveAReview']", {timeout: 15000}).should("exist").should("contain", "Leave a Review").click()

    cy.get("[role='dialog']").should("exist").should("contain", "Leave a Review")

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