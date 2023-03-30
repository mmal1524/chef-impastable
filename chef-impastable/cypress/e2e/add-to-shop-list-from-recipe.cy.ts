import React from "react"

describe('Shopping List', () => {

  // logs in
  it ('Logging in', () => {
    cy.visit('/')
    cy.get("[data-test='UsernameField']").type("Shopping")
    cy.get("[data-test='PasswordField']").type("Password@2")
    cy.get("[data-test='LoginButton']").click()
  })

  // navigate to edit shopping list, clear, and close
  it ('Nav to Edit Shopping List UI', () => {
    cy.get("[data-test='ShopList']", {timeout: 60000}).click()
    cy.get("[data-test='EditList']").click()
    cy.get("[data-test='ClearItem']").click()
    cy.wait(2000)
    cy.get("[data-test='CloseEdit']", {timeout: 6000}).click()
  })

  // click on a recipe
 it ('Clicking a Recipe', () => {
    cy.get("[data-test='Recipe-0']", {timeout: 60000}).click()
  })

  // add ingredients from recipe and confirm no duplicates

  // delete one item from shopping list

  // add ingredients from recipe and confirm only added the one


  // add ingredient to fridge and clear shopping list
  it ('Clear List with Items', () => {
    //cy.get("[data-test='EditList']").click()
    cy.get("[data-test='ClearItem']").click()
    cy.wait(2000)
    // check empty
    cy.get("[data-test='BackToView']").click()
    cy.get("[data-test='ViewList']").should("contain", "Your List is Empty, add something!")
  })

  // add ingredients from recipe, confirm didn't add item in fridge

  // close view shopping list
  it ('Click to Close Edit Shopping List UI', () => {
    cy.get("[data-test='CloseEdit']", {timeout: 10000}).click()
  })
})
