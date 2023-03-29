import React from "react"

describe('Shopping List', () => {

  // logs in
  it ('Logging in', () => {
    cy.visit('/')
    cy.get("[data-test='UsernameField']").type("Shopping")
    cy.get("[data-test='PasswordField']").type("Password@2")
    cy.get("[data-test='LoginButton']").click()
  })

  // clicks on shopping list (it's empty)
  it ('View Shopping List UI', () => {
    cy.get("[data-test='ShopList']").click()
  })

  // confirm that is empty and checks message

  // clicks on edit shopping list

  // adds item to shopping list
})
