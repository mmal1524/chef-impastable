import React from "react"

describe('Meal Plan to ShoppingList', () => {

    var recipeName: string;
    var mealPlanName: string;

    // Logs in
    it("Logging in", () => {
        cy.visit('/', {timeout: 90000})
        cy.get("[data-test='UsernameField']").type("testHouse2")
        cy.get("[data-test='PasswordField']").type("Password!1")
        cy.get("[data-test='LoginButton']").click()
    })

    // confirm that ingredient pepper is in user fridge
    it ('Navigate to fridge and confirm pepper in fridge', () => {
        cy.visit('/fridge-kitchen', {timeout: 90000})
        cy.get("#simple-tabpanel-0")
            .get("#FridgeItem")
            .should('contain', "pepper")
    })

    // (USER STORY 10)

    // Clicks on a recipe
    it("Clicking a recipe on homepage", () => {
        cy.visit('/homepage', {timeout: 60000})
        cy.wait(10000)
        cy.get("[data-test='Recipe-1']", {timeout: 90000}).click()
    })

    // Clicks on meal plan button
    it("Click meal plan button", () => {
        cy.get("[data-test='RecipeTitle']", {timeout: 90000}).then(($recipetitle) => {
            recipeName = $recipetitle.text()
        })
        cy.get("[data-test='MealPlanButton']")
            .should("exist")
            .click()
        
        cy.get("[data-test='ChooseMealPlanDialog']").should("exist")
    })

    // Chooses a meal plan
    it("Choose meal plan", () => {
        cy.get("[data-test='ChooseMealPlan']").should("contain", "Choose Meal Plan")
        cy.get("[data-test='MealPlan-0']")
            .should("exist")
            .find("[data-test='MealPlanText-0']").then(($mealPlan) => {
                mealPlanName = $mealPlan.text()
            })
        cy.get("[data-test='MealPlan-0']").click()

        cy.get("[data-test='ChooseDayDialog']").should("exist")
    })

    // Chooses day of week
    it("Choose day of week", () => {
        cy.get("[data-test='MealPlan']")
            .should("exist")
            .should("contain", mealPlanName)

        cy.get("[data-test='Recipe']")
            .should("exist")
            .should("contain", "Add " + recipeName + " to:")

        cy.get("[data-test='Days']").find("[data-test='Day-0']").should("contain", "Sunday")
        cy.get("[data-test='Days']").find("[data-test='Day-1']").should("contain", "Monday")
        cy.get("[data-test='Days']").find("[data-test='Day-2']").should("contain", "Tuesday")
        cy.get("[data-test='Days']").find("[data-test='Day-3']").should("contain", "Wednesday")
        cy.get("[data-test='Days']").find("[data-test='Day-4']").should("contain", "Thursday")
        cy.get("[data-test='Days']").find("[data-test='Day-5']").should("contain", "Friday")
        cy.get("[data-test='Days']").find("[data-test='Day-6']").should("contain", "Saturday")

        cy.get("[data-test='Day-0']").click()

        cy.get("[data-test='ChooseDayDialog']").should("not.exist")
        cy.get("[data-test='ChooseMealPlanDialog']").should("not.exist")
        
    })

    // USER STORY 13 
    it("Go to meal plan page", () => {
        cy.visit('/mealplan-view', {timeout: 60000})
        cy.wait(5000)
    })

    // clear shopping list
    it ('Clear shopping list', () => {
        cy.get("[data-test='ShopList']", {timeout: 60000}).click()
        cy.get("[data-test='EditList']").click()
        cy.get("[data-test='ClearItem']").click()
        cy.wait(2000)
        // check empty
        cy.get("[data-test='BackToView']").click()
        cy.get("[data-test='ViewList']").should("contain", "Your List is Empty, add something!")
        cy.get("[data-test='CloseView']", {timeout: 10000}).click()
    })

    // add ingredients from recipe, confirm didn't add item in fridge
    it ('Add from Meal Plan and Confirm Accuracy (exclude fridge items)', () => {
        cy.get("[data-test='AddToShopList']", {timeout: 30000}).click()
        cy.get("[data-test='ConfirmAddButton']", {timeout: 30000}).click()
        cy.wait(5000)
        cy.get("[data-test='ShopList']").click()
        cy.get("[data-test='ViewList']")
            .get("#ViewDisplay")
            .get("#PopulatedList").find('div.MuiBox-root.css-0').its('length').should('eq', 5)
        //cy.wait(10000)
    })

    // clear shopping list
    it ('Clear shopping list', () => {
        cy.get("[data-test='EditList']").click()
        cy.get("[data-test='ClearItem']").click()
        cy.wait(2000)
        // check empty
        cy.get("[data-test='BackToView']").click()
        cy.get("[data-test='ViewList']").should("contain", "Your List is Empty, add something!")
        cy.get("[data-test='CloseView']", {timeout: 10000}).click()
    })

    // add ingredients from recipe, confirm added item in fridge after toggle switch
    it ('Add from Meal Plan and Confirm Accuracy (include fridge items)', () => {
        cy.get("[data-test='AddToShopList']", {timeout: 30000}).click()
        cy.get("[data-test='Toggle']", {timeout: 30000}).click()
        cy.get("[data-test='ConfirmAddButton']", {timeout: 30000}).click()
        cy.wait(5000)
        cy.get("[data-test='ShopList']").click()
        cy.get("[data-test='ViewList']")
            .get("#ViewDisplay")
            .get("#PopulatedList").find('div.MuiBox-root.css-0').its('length').should('eq', 6)
        //cy.wait(10000)
        cy.get("[data-test='CloseView']", {timeout: 10000}).click()
    })

    // attempt add ingredients when its already in the shopping list
    it ('Add from Meal Plan and Confirm Accuracy (include fridge items)', () => {
        cy.get("[data-test='AddToShopList']", {timeout: 30000}).click()
        cy.get("[data-test='Toggle']", {timeout: 30000}).click()
        cy.get("[data-test='ConfirmAddButton']", {timeout: 30000}).should('be.disabled')
        // cy.wait(5000)
        // cy.get("[data-test='ShopList']").click()
        // cy.get("[data-test='ViewList']")
        //     .get("#ViewDisplay")
        //     .get("#PopulatedList").find('div.MuiBox-root.css-0').its('length').should('eq', 6)
        // //cy.wait(10000)
        // cy.get("[data-test='CloseView']", {timeout: 10000}).click()
    })







})