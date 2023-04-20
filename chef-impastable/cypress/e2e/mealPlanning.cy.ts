import React from "react"

describe('Meal Planning', () => {

    var recipeName: string;
    var mealPlanName: string;

    // Logs in
    it("Logging in", () => {
        cy.visit('/')
        cy.get("[data-test='UsernameField']").type("testingmealplans")
        cy.get("[data-test='PasswordField']").type("Password1!")
        cy.get("[data-test='LoginButton']").click()
    })

    // USER STORY 10

    // Clicks on a recipe
    it("Clicking a recipe", () => {
        cy.get("[data-test='Recipe-4']", {timeout: 60000}).click()
    })

    // Clicks on meal plan button
    it("Click meal plan button", () => {
        cy.get("[data-test='RecipeTitle']", {timeout: 60000}).then(($recipetitle) => {
            recipeName = $recipetitle.text()
        })
        cy.get("[data-test='MealPlanButton']")
            .should("exist")
            .click()
        
        cy.get("[data-test='ChooseMealPlanDialog']").should("exist")
    })

    // Chooses a meal plan
    it("Choose Meal Plan", () => {
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
    it("Choose Day of Week", () => {
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

    // USER STORY 11
    it("Go to Meal Plan Page", () => {
        cy.get("[data-test='Navbar']").find("[data-test='DrawerButton']").click()
        cy.get("[data-test='Drawer-4'").click()
    })

    it("Displays Calendar", () => {
        cy.get("[data-test='Mealplan-0']", {timeout: 60000}).find("[data-test='Calendar']").should("exist")
        cy.get("[data-test='Day-Sunday']").should("contain", "Sunday")
        cy.get("[data-test='Day-Monday']").should("contain", "Monday")
        cy.get("[data-test='Day-Tuesday']").should("contain", "Tuesday")
        cy.get("[data-test='Day-Wednesday']").should("contain", "Wednesday")
        cy.get("[data-test='Day-Thursday']").should("contain", "Thursday")
        cy.get("[data-test='Day-Friday']").should("contain", "Friday")
        cy.get("[data-test='Day-Saturday']").should("contain", "Saturday")
    })

})