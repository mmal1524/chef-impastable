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
    it ('Clear Shopping List UI', () => {
        cy.get("[data-test='ShopList']", {timeout: 60000}).click()
        cy.get("[data-test='EditList']").click()
        cy.get("[data-test='ClearItem']").click()
        cy.wait(2000)
        cy.get("[data-test='CloseEdit']", {timeout: 6000}).click()
    })

    // click on a recipe
    it ('Clicking a Recipe', () => {
        cy.get("[data-test='Recipe-0']", {timeout: 60000}).click()
        //cy.wait(10000)
    })

    // add ingredients from recipe and confirm no duplicates
    it ('Adding Ingredients from Recipe', () => {
        cy.get("[data-test='AddFromRButton']", {timeout: 60000}).click()
        cy.get("[data-test='ConfirmAddButton']", {timeout: 6000}).click()
        cy.wait(2000)

        cy.get("[data-test='ShopList']").click()
        cy.get("[data-test='ViewList']")
            .get("#ViewDisplay")
            .get("#PopulatedList").find('div.MuiBox-root.css-0').its('length').should('eq', 8)
    })

    // delete second item from shopping list
    it ('Delete 2nd Item to Shopping List', () => {
        cy.get("[data-test='EditList']").click()
        cy.wait(1000)
        cy.get("[data-test='EditDisplay']")
            .get("[data-test='ListItem-1']")
            .get("[data-test='DeleteButton-1']").click();
        cy.wait(2000)
        cy.get("[data-test='BackToView']").click()
        // checks that the length of list is one less
        cy.get("[data-test='ViewList']")
            .get("#ViewDisplay")
            .get("#PopulatedList").find('div.MuiBox-root.css-0').its('length').should('eq', 7)
    })

    // add ingredients from recipe and confirm only added the one
    it ('Adding Ingredients from Recipe Again', () => {
        cy.get("[data-test='AddFromRButton']", {timeout: 60000}).click()
        cy.get("[data-test='ConfirmAddButton']", {timeout: 6000}).click()
        cy.wait(2000)

        cy.get("[data-test='ShopList']").click()
        cy.get("[data-test='ViewList']")
            .get("#ViewDisplay")
            .get("#PopulatedList").find('div.MuiBox-root.css-0').its('length').should('eq', 8)
    })

    // add ingredient to fridge and clear shopping list
    // it ('Clear List with Items', () => {
    //     //cy.get("[data-test='EditList']").click()
    //     cy.get("[data-test='ClearItem']").click()
    //     cy.wait(2000)
    //     // check empty
    //     cy.get("[data-test='BackToView']").click()
    //     cy.get("[data-test='ViewList']").should("contain", "Your List is Empty, add something!")
    // })

    // add ingredients from recipe, confirm didn't add item in fridge

    // close view shopping list
    it ('Click to Close Edit Shopping List UI', () => {
        cy.get("[data-test='CloseView']", {timeout: 10000}).click()
    })
})
