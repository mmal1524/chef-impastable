import React from "react"

describe('Review Page', () => {

  it("Logging in", () => {
    cy.visit('/')
    cy.get("[data-test='UsernameField']").type("reviewedrecipes")
    cy.get("[data-test='PasswordField']").type("Password1!")
    cy.get("[data-test='LoginButton']").click()
    //cy.location("pathname", {timeout: 5000}).should("eq", "/homepage")
    cy.get("[data-test='0']", {timeout: 10000}).click()
    
  })
})