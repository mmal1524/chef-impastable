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

    //
    // USER STORY 10
    //

    // Clicks on a recipe
    it("Clicking a recipe", () => {
        cy.wait(5)
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

    //
    // USER STORY 11
    //

    // Go to meal plans page
    it("Go to Meal Plan Page", () => {
        cy.get("[data-test='Navbar']").find("[data-test='DrawerButton']").click()
        cy.get("[data-test='Drawer-3'").click()
    })

    // Calendar is seen
    it("Displays Calendar", () => {
        cy.get("[data-test='Mealplan-0']", {timeout: 60000}).find("[data-test='Mealplan']").should("contain", mealPlanName)
        cy.get("[data-test='Mealplan-0']").find("[data-test='Calendar']").should("exist")
        cy.get("[data-test='Day-Sunday']").should("contain", "Sunday")
        cy.get("[data-test='Day-Monday']").should("contain", "Monday")
        cy.get("[data-test='Day-Tuesday']").should("contain", "Tuesday")
        cy.get("[data-test='Day-Wednesday']").should("contain", "Wednesday")
        cy.get("[data-test='Day-Thursday']").should("contain", "Thursday")
        cy.get("[data-test='Day-Friday']").should("contain", "Friday")
        cy.get("[data-test='Day-Saturday']").should("contain", "Saturday")
    })

    // Recently added recipe is there
    it("Recipe added to Meal Plan", () => {
        cy.get("[data-test='Sunday']")
            .find("[data-test='Sunday-Recipes']")
            .find("[data-test='Sunday-1']")
            .find("[data-test='RecipeName']").should("contain", recipeName)
        
    })

    // Switch Recipe Day
    it("Change Day Recipe is on", () => {
        cy.get("[data-test='Sunday-Recipes']").find("[data-test='Sunday-1']").find("[data-test='SwitchButton']")
            .should("exist")
            .click()

        cy.get("[data-test='ChooseDayDialog']").should("exist")
        cy.get("[data-test='DialogTitle']").should("contain", mealPlanName)
        cy.get("[data-test='RecipeTitle']").should("contain", "Switch " + recipeName + " to:")

        cy.get("[data-test='Days']").find("[data-test='Day-0']").should("contain", "Sunday")
        cy.get("[data-test='Days']").find("[data-test='Day-1']").should("contain", "Monday")
        cy.get("[data-test='Days']").find("[data-test='Day-2']").should("contain", "Tuesday")
        cy.get("[data-test='Days']").find("[data-test='Day-3']").should("contain", "Wednesday")
        cy.get("[data-test='Days']").find("[data-test='Day-4']").should("contain", "Thursday")
        cy.get("[data-test='Days']").find("[data-test='Day-5']").should("contain", "Friday")
        cy.get("[data-test='Days']").find("[data-test='Day-6']").should("contain", "Saturday")

        cy.get("[data-test='Day-3']").click()

        cy.get("[data-test='ChooseDayDialog']").should("not.exist")
    })

    // Delete Recipe
    it("Delete Recipe from Meal Plan", () => {
        cy.get("[data-test='Wednesday-Recipes']").find("[data-test='Wednesday-0']").find("[data-test='DeleteButton']")
            .should("exist")
            .click()

        cy.get("[data-test='DeleteDialog']").should("exist")
        cy.get("[data-test='DialogTitle']").should("contain", mealPlanName)
        cy.get("[data-test='DeleteText']").should("contain", "Delete " + recipeName + "?")
        cy.get("[data-test='DeleteDialog']").find("[data-test='CancelButton']").should("contain", "Cancel")
        cy.get("[data-test='DeleteDialog']").find("[data-test='DeleteButton']").should("contain", "delete").click()

        cy.get("[data-test='Wednesday']")
            .find("[data-test='Wednesday-Recipes']")
            .find("[data-test='Wednesday-0']")
            .should("not.exist")
    })

    // Click on a recipe
    it("Click on a Recipe", () => {
        cy.get("[data-test='Tuesday-Recipes']").find("[data-test='Tuesday-0']").then(($Tuesday) => {
            recipeName = $Tuesday.text()
            cy.get("[data-test='Tuesday-Recipes']").find("[data-test='Tuesday-0']").click()
            cy.get("[data-test='RecipeTitle']", {timeout: 60000}).should("contain", recipeName)
        })
    })

    //
    // USER STORY 12
    //

    // Clicks on meal plan button
    it("Click meal plan button", () => {
        cy.get("[data-test='MealPlanButton']")
            .should("exist")
            .click()
        
        cy.get("[data-test='ChooseMealPlanDialog']").should("exist")
    })

    // Create New Meal Plan
    it("Create New Meal Plan", () => {
        cy.get("[data-test='ChooseMealPlan']").should("contain", "Choose Meal Plan")
        cy.get("[data-test='CreateButton']")
            .should("exist")
            .find("[data-test='Avatar']").should("exist")
            
        cy.get("[data-test='CreateButton']").find("[data-test='CreateText']").should("contain", "Create New Meal Plan")
            .click()
    
        cy.get("[data-test='CreateDialog']").should("exist")

        cy.get("[data-test='CreateDialog']").find("[data-test='CreateText']").should("contain", "Create New Meal Plan")
        cy.get("[data-test='CreateDialog']").find("[data-test='NewMealPlanTextField']").should("exist")
            .type("High Protein")

        cy.get("[data-test='Cancel']").should("exist")
        cy.get("[data-test='Create']").should("exist").click()

        cy.get("[data-test='CreateDialog']").should("not.exist")
    })

    // Chooses a meal plan
    it("Choose New Meal Plan", () => {
        cy.get("[data-test='ChooseMealPlan']").should("contain", "Choose Meal Plan")
        cy.get("[data-test='MealPlan-1']")
            .should("exist")
            .find("[data-test='MealPlanText-1']").should("contain", "High Protein")
        cy.get("[data-test='MealPlan-1']").click()

        cy.get("[data-test='ChooseDayDialog']").should("exist")
    })

    // Chooses day of week
    it("Choose Day of Week", () => {
        cy.get("[data-test='MealPlan']")
            .should("exist")
            .should("contain", "High Protein")

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

        cy.get("[data-test='Day-5']").click()

        cy.get("[data-test='ChooseDayDialog']").should("not.exist")
        cy.get("[data-test='ChooseMealPlanDialog']").should("not.exist")
    })

    // Go to meal plans page
    it("Go to Meal Plan Page", () => {
        cy.get("[data-test='Navbar']").find("[data-test='DrawerButton']").click()
        cy.get("[data-test='Drawer-3'").click()
    })

    // New meal plan listed
    it("New Meal Plan listed", () => {
        cy.get("[data-test='Tab-2']")
            .should("exist")
            .should("contain", "High Protein")
            .click()
        
    })

    // Make current meal plan
    it("Make the current meal plan", () => {
        cy.get("[data-test='Star']")
            .should("exist")
            .click()

        cy.get("[data-test='CurrentTab']").click()

        cy.get("[data-test='Mealplan']").should("contain", "High Protein")

        cy.get("[data-test='Tab-2']").click()
    })

    // Delete the meal plan
    it("Delete Meal Plan", () => {
        cy.get("[data-test='DeleteMealPlanButton']").click()
        cy.get("[data-test='DeletePlanDialog']").find("[data-test='Delete']").click()
    })


})