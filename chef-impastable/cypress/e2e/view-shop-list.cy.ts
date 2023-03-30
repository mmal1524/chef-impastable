import React from "react"

describe('Shopping List', () => {

  // logs in
  it ('Logging in', () => {
    cy.visit('/')
    cy.get("[data-test='UsernameField']").type("Shopping")
    cy.get("[data-test='PasswordField']").type("Password@2")
    cy.get("[data-test='LoginButton']").click()
  })

  // clicks on shopping list to view
  it ('Click to View Shopping List UI', () => {
    cy.get("[data-test='ShopList']", {timeout: 60000}).click()
  })

  // confirm that is empty and checks message
  it ('Check Shopping List Empty', () => {
    cy.get("[data-test='ViewList']")
    cy.get("#ViewDisplay", { timeout: 100 }).then(($display) => {
        console.log($display)
        if ($display.children("#PopulatedList").length) {
          // populated, clear
          cy.get("[data-test='EditList']", {timeout: 10000}).click()
          cy.get("[data-test='ClearItem']").click()
          cy.wait(2000)
          cy.get("[data-test='BackToView']", {timeout: 2000}).click()
          cy.get("[data-test='ViewList']", {timeout:3000}).should("contain", "Your List is Empty, add something!")
        } else {
          // not populated
          cy.get("[data-test='ViewList']").should("contain", "Your List is Empty, add something!")
        }

      })
  })

  // add something to the shopping list
  it ('Click to View Edit Shopping List UI', () => {
    cy.get("[data-test='EditList']", {timeout: 10000}).click()
    cy.get("#for-search").click()
    cy.get("#for-search").type("buttermilk").get("li[data-option-index='0']").click();
    cy.get("[data-test='AddItem']").click()
    cy.wait(2000)
    cy.get("[data-test='BackToView']").click()
    cy.get("[data-test='ViewList']").contains(/^buttermilk$/)
  })

  // close view shopping list
  it ('Click to Close Shopping List UI', () => {
    cy.get("[data-test='CloseView']", {timeout: 60000}).click()
  })
})
