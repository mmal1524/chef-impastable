import React from "react"

describe('Shopping List', () => {

    // logs in
    it ('Logging in', () => {
        cy.visit('/',{timeout: 60000})
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

    // adds item to shopping list
    it ('Add Item to Shopping List', () => {
        cy.get("#for-search").click()
        cy.get("#for-search").type("buttermilk").get("li[data-option-index='0']", {timeout: 60000}).click();
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
            .get("[data-test='ListItem-0']")
            .get("[data-test='ListText']")
            .contains(/^buttermilk$/)
        cy.get("[data-test='EditDisplay']")
            .get("[data-test='ListItem-0']")
            .get("[data-test='DeleteButton-0']").click();
        cy.wait(2000)
        cy.get("[data-test='BackToView']").click()
        cy.get("[data-test='ViewList']").contains("Empty")
    })

    // add several items to shopping list
    it ('Add Multiple Items to Shopping List', () => {
        cy.get("[data-test='EditList']").click()

        cy.get("#for-search").click()
        cy.wait(1000)
        cy.get("#for-search").type("{selectall}{backspace}butter").get("li[data-option-index='0']", {timeout: 60000}).click();
        cy.get("[data-test='AddItem']").click()
        cy.wait(1000)

        cy.get("#for-search").click()
        cy.wait(1000)
        cy.get("#for-search")
            .type("{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}")
            .type("olive oil")
            .get("li[data-option-index='0']", {timeout: 60000}).click();
        cy.get("[data-test='AddItem']").click()   
        cy.wait(1000) 

        cy.get("#for-search").click()
        cy.wait(1000)
        cy.get("#for-search")
            .type("{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}")
            .type("milk").get("li[data-option-index='1']", {timeout: 60000}).click();
        cy.get("[data-test='AddItem']").click()   
        cy.wait(1000)  

        cy.get("#for-search").click()
        cy.wait(1000)
        cy.get("#for-search")
            .type("{backspace}{backspace}{backspace}{backspace}")
            .type("paprika").get("li[data-option-index='0']", {timeout: 60000}).click();
        cy.get("[data-test='AddItem']").click()   
        cy.wait(1000)

        // check added all 4 ingredients

        cy.get("[data-test='EditDisplay']").find('div.MuiBox-root.css-0').its('length').should('eq', 4)
        cy.get("[data-test='BackToView']").click()
        cy.get("[data-test='ViewList']")
            .get("#ViewDisplay")
            .get("#PopulatedList").find('div.MuiBox-root.css-0').its('length').should('eq', 4)
        cy.get("[data-test='ViewList']").contains("butter")
        cy.get("[data-test='ViewList']").contains("olive oil")
        cy.get("[data-test='ViewList']").contains("milk")
        cy.get("[data-test='ViewList']").contains("paprika")
    }) 


    // attempt to add item already in shopping list
    it ('Try to add item already in shopping list', () => {
        cy.get("[data-test='EditList']").click()
        cy.get("#for-search").click()
        cy.wait(50)
        cy.get("#for-search").type("butter").should('not.eq', /^butter$/)
        cy.wait(1000)
        cy.get("[data-test='CloseEdit']").click()

    })
    // attempt to add already owned item to shopping list
    // naviate to fridge and confirm clear
    it ('Navigate to Fridge and Confirm Salt', () => {
        cy.visit('/fridge-kitchen', {timeout: 60000})
        cy.get("#simple-tabpanel-0")
            .get("#FridgeItem")
            .should('contain', "salt")
    })

    // attempt to add already owned item to shopping list
    it ('Search to add Owned Item', () => {
        cy.get("[data-test='ShopList']").click()
        cy.get("[data-test='EditList']").click()
        cy.get("#for-search").click()
        cy.wait(50)
        cy.get("#for-search").type("salt").should('not.eq', /^salt$/)
        cy.wait(1000)

    })

    // clear shopping list
    it ('Clear List with Items', () => {
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
        cy.get("[data-test='CloseView']", {timeout: 60000}).click()
    })
})
