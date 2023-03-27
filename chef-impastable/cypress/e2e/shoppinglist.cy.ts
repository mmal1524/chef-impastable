import React from "react"

describe('Shopping List', () => {
  cy.visit('/')
  cy.get("[data-test='UsernameField']").type("Shopping")
  cy.get("[data-test='PasswordField']").type("Password@2")
})
