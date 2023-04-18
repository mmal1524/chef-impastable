import React from "react"

describe('Meal Planning', () => {

    // Logs in
    it("Logging in", () => {
        cy.visit('/')
        cy.get("[data-test='UsernameField']").type("current")
        cy.get("[data-test='PasswordField']").type("Password1!")
        cy.get("[data-test='LoginButton']").click()
    })

    // Clicks on a recipe
    it("Clicking a recipe", () => {
        cy.get("[data-test='Recipe-4']", {timeout: 60000}).click()
    })

    it("Click meal plan button", () => {
        cy.get("[data-test='MealPlanButton']", {timeout: 60000}).click()
    })


})