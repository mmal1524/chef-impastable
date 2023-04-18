import React from "react"

describe('Meal Planning', () => {

    // Logs in
    it("Logging in", () => {
        cy.visit('/')
        cy.get("[data-test='UsernameField']").type("current")
        cy.get("[data-test='PasswordField']").type("Password1!")
        cy.get("[data-test='LoginButton']").click()
    })

    
})