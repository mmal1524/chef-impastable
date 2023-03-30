import React from "react"

describe('Shopping List', () => {

  // logs in
  it ('Logging in', () => {
    cy.visit('/')
    cy.get("[data-test='UsernameField']").type("Shopping")
    cy.get("[data-test='PasswordField']").type("Password@2")
    cy.get("[data-test='LoginButton']").click()
  })

  // naviigate to edit shopping list
  it ('Nav to Edit Shopping List UI', () => {
    cy.get("[data-test='ShopList']", {timeout: 60000}).click()
    cy.get("[data-test='EditList']").click()
  })

  // adds item to shopping list
 it ('Add Item to Shopping List', () => {
    cy.get("#for-search").click()
    cy.get("#for-search").type("/^buttermilk$/").get("li[data-option-index='0']").click();
    cy.get("[data-test='AddItem']").click()
    cy.get("[data-test='EditDisplay']")
  })

  // delete item from shopping list


  // add several items to shopping list


  // attempt to add item already in shopping list
  // attempt to add already owned item to shopping list

  // clear shopping list


  // clear empty shopping list


  // close view shopping list
  it ('Click to Close Shopping List UI', () => {
    cy.get("[data-test='CloseEdit']", {timeout: 10000}).click()
  })
})
