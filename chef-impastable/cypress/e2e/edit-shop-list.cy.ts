import React from "react"

describe('Shopping List', () => {

  // logs in
  it ('Logging in', () => {
    cy.visit('/')
    cy.get("[data-test='UsernameField']").type("Shopping")
    cy.get("[data-test='PasswordField']").type("Password@2")
    cy.get("[data-test='LoginButton']").click()
  })

  // navigate to edit shopping list and clear
  it ('Nav to Edit Shopping List UI', () => {
    cy.get("[data-test='ShopList']", {timeout: 60000}).click()
    cy.get("[data-test='EditList']").click()
    cy.get("[data-test='ClearItem']").click()
    cy.wait(2000)
  })

  // naviate to fridge and confirm clear

  // adds item to shopping list
 it ('Add Item to Shopping List', () => {
    cy.get("#for-search").click()
    cy.get("#for-search").type("buttermilk").get("li[data-option-index='0']").click();
    cy.get("[data-test='AddItem']").click()
    cy.wait(2000)
    cy.get("[data-test='EditDisplay']").contains("buttermilk")
    cy.get("[data-test='BackToView']").click()
    cy.get("[data-test='ViewList']").contains(/^buttermilk$/)
  })

  // delete item from shopping list
  it ('Delete Item to Shopping List', () => {
    cy.get("[data-test='EditList']").click()
    cy.get("[data-test='EditDisplay']")
    cy.get("['data-test='ListItem-0']").contains("buttermilk")
    cy.get("['data-test='DeleteButton']").click()
    cy.wait(2000)
    cy.get("[data-test='BackToView']").click()
    cy.get("[data-test='ViewList']").contains(/^buttermilk$/)
  })

  // add several items to shopping list


  // attempt to add item already in shopping list
  // attempt to add already owned item to shopping list

  // clear shopping list
  it ('Clear List with Items', () => {
    //cy.get("[data-test='EditList']").click()
    cy.get("[data-test='ClearItem']").click()
    cy.wait(2000)
    // check empty
    cy.get("[data-test='BackToView']").click()
    cy.get("[data-test='ViewList']").should("contain", "Your List is Empty, add something!")
  })

  // clear empty shopping list
  it ('Clear Empty List', () => {
    cy.get("[data-test='EditList']").click()
    cy.get("[data-test='ClearItem']").click()
    cy.wait(2000)
    // check still empty
    cy.get("[data-test='BackToView']").click()
    cy.get("[data-test='ViewList']").should("contain", "Your List is Empty, add something!")
  })

  // close view shopping list
  it ('Click to Close Edit Shopping List UI', () => {
    cy.get("[data-test='CloseEdit']", {timeout: 10000}).click()
  })
})
