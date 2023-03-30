import React from "react"

describe('Saved Recipes', () => {

    var numReviews;

    // Logs in
    it("Logging in", () => {
        cy.visit('/')
        cy.get("[data-test='UsernameField']").type("save")
        cy.get("[data-test='PasswordField']").type("Password1!")
        cy.get("[data-test='LoginButton']").click()
    })

    var saved = false;
    it("Recipe is Saved or Unsaved", () => {
        cy.get("[data-test='SaveRecipe-2']", {timeout:60000}).should('exist')
        cy.wait(500)
        cy.get("[data-test='SaveRecipe-2']").children("svg").should("have.attr", "data-testid").and("be.oneOf", ["FavoriteBorderOutlinedIcon", "FavoriteIcon"]).then(($obj) => {
            // console.log("FavoriteIcon" == $obj.toString())
            if ("FavoriteIcon".toString() == $obj.toString()) {
                // console.log("change saved")
                saved = true;
            }
        })
    })

    it("Save Recipe with empty string (Unsave first if necessary)", () => {
        if (saved) {
            cy.get("[data-test='SaveRecipe-2']").click()
            cy.wait(500)
            cy.get("[data-test='SaveRecipe-2']").children("svg").should("have.attr", "data-testid").and("eq", "FavoriteBorderOutlinedIcon")
        }
        cy.get("[data-test='SaveRecipe-2']").children("svg").should("have.attr", "data-testid").and("eq", "FavoriteBorderOutlinedIcon")
        cy.get("[data-test='SaveRecipe-2']").click()

        // checks that Save Dialog Pops up
        cy.get("[data-test='SaveDialog'").should('exist')
        cy.get("[data-test='SaveDialogAuto']").should('exist')
        cy.get("[data-test='SaveDialogTextField']").should('exist')
        cy.get("[data-test='SaveDialogSubmit']").click()

        cy.wait(500)
        cy.get("[data-test='SaveRecipe-2']").children("svg").should("have.attr", "data-testid").and("eq", "FavoriteIcon")
    })

    it("Unsave Recipe from Homepage", () => {
        cy.get("[data-test='SaveRecipe-2']").click()
        cy.wait(500)
        cy.get("[data-test='SaveRecipe-2']").children("svg").should("have.attr", "data-testid").and("eq", "FavoriteBorderOutlinedIcon")
    })

    it("Save Recipe with existing folder (Unsave first if necessary)", () => {
        saved = false;
        cy.get("[data-test='SaveRecipe-3']").children("svg").should("have.attr", "data-testid").and("be.oneOf", ["FavoriteBorderOutlinedIcon", "FavoriteIcon"]).then(($obj) => {
            console.log("FavoriteIcon".toString() == $obj.toString())
            if ("FavoriteIcon".toString() == $obj.toString()) {
                cy.get("[data-test='SaveRecipe-3']").click()
                cy.wait(500)
                cy.get("[data-test='SaveRecipe-3']").children("svg").should("have.attr", "data-testid").and("eq", "FavoriteBorderOutlinedIcon")
            }
        })
        // if (saved) {
        //     cy.get("[data-test='SaveRecipe-3']").click()
        //     cy.wait(500)
        //     cy.get("[data-test='SaveRecipe-3']").children("svg").should("have.attr", "data-testid").and("eq", "FavoriteBorderOutlinedIcon")
        // }
        cy.get("[data-test='SaveRecipe-3']").children("svg").should("have.attr", "data-testid").and("eq", "FavoriteBorderOutlinedIcon")
        cy.get("[data-test='SaveRecipe-3']").click()

        // checks that Save Dialog Pops up
        cy.get("[data-test='SaveDialog'").should('exist')
        cy.get("[data-test='SaveDialogAuto']").should('exist')
        cy.get("[data-test='SaveDialogTextField']").should('exist').click().type('dinner{enter}')
        cy.get("[data-test='SaveDialogSubmit']").click()

        cy.wait(500)
        cy.get("[data-test='SaveRecipe-3']").children("svg").should("have.attr", "data-testid").and("eq", "FavoriteIcon")
    })    

    it("Clicking a recipe", () => {
        cy.get("[data-test='Recipe-2']").click();
    })

    it("Save Recipe with empty string (Unsave first if necessary)", () => {
        cy.get("[data-test='SaveRecipe']", {timeout: 60000}).children("svg").should("have.attr", "data-testid").and("eq", "FavoriteBorderOutlinedIcon");
        cy.get("[data-test='SaveRecipe']").click()

        // checks that Save Dialog Pops up
        cy.get("[data-test='SaveDialog'").should('exist')
        cy.get("[data-test='SaveDialogAuto']").should('exist')
        cy.get("[data-test='SaveDialogTextField']").should('exist')
        cy.get("[data-test='SaveDialogSubmit']").click()

        cy.wait(500)
        cy.get("[data-test='SaveRecipe']").children("svg").should("have.attr", "data-testid").and("eq", "FavoriteIcon")
    })

    it("Unsave Recipe from Recipe Page", () => {
        cy.get("[data-test='SaveRecipe']").click()
        cy.wait(500)
        cy.get("[data-test='SaveRecipe']").children("svg").should("have.attr", "data-testid").and("eq", "FavoriteBorderOutlinedIcon")
    })
  
  
})