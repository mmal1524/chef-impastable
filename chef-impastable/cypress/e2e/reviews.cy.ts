import React from "react"

describe('Reviews', () => {

  var numReviews;

  // Logs in
  it("Logging in", () => {
    cy.visit('/')
    cy.get("[data-test='UsernameField']").type("reviewedrecipes")
    cy.get("[data-test='PasswordField']").type("Password1!")
    cy.get("[data-test='LoginButton']").click()
  })

  // Clicks on a recipe
  it("Clicking a recipe", () => {
    cy.get("[data-test='Recipe-6']", {timeout: 60000}).click()
  })

  // Checks that the number of reviews is displayed and stores the current number of reviews
  it("Number of reviews", () => {
    cy.get("[data-test='NumReviews']", {timeout: 60000}).then(($reviews) => {
      var header = $reviews.text().split(' ')
      numReviews = header[0]
      expect(header[1]).to.eq("Reviews")
    })
  })

  it("Leave a review button", () => {
    cy.get("[data-test='LeaveAReview']").should("contain", "Leave a Review").click()
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