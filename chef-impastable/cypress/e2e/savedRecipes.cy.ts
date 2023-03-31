import React from "react"

describe('Saved Recipes', () => {

    var numReviews;

    // Logs in
    it("Logging in", () => {
        cy.visit('/')
        cy.get("[data-test='UsernameField']").type("unitTestSave")
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

    // it("Click Save and then close Dialog", () => {
    //     cy.get("[data-test='SaveRecipe-2']").click()

    //     // checks that Save Dialog Pops up
    //     cy.get("[data-test='SaveDialogAuto']").should('exist')
    //     cy.get("[data-test='SaveDialogTextField']").should('exist')
    //     cy.get("[data-test='SaveDialog'").should('exist').children(".MuiDialog-container").blur()

    // })

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

    it("Save Recipe with 'none' from recipe view", () => {
        cy.get("[data-test='SaveRecipe']", {timeout: 60000}).children("svg").should("have.attr", "data-testid").and("eq", "FavoriteBorderOutlinedIcon");
        cy.get("[data-test='SaveRecipe']").click()

        // checks that Save Dialog Pops up
        cy.get("[data-test='SaveDialog'").should('exist')
        cy.get("[data-test='SaveDialogAuto']").should('exist')
        cy.get("[data-test='SaveDialogTextField']").should('exist').click().type("none{enter}")
        cy.get("[data-test='SaveDialogSubmit']").click()

        cy.wait(500)
        cy.get("[data-test='SaveRecipe']").children("svg").should("have.attr", "data-testid").and("eq", "FavoriteIcon")
    })
  
    it("View Saved Recipes", () => {
        cy.visit('/profile-page?username=testSave')
        cy.get("[data-test='ProfileSavedTab']", {timeout: 60000}).should('exist').click()
        cy.get("[data-test='SavedRecipesView']").should('exist').children().should("have.length", 1)
        cy.get("[data-test='SavedRecipeFolderView']").should('exist').children().should("have.length.at.least", 2) // 1 folder, 1 add button
        
        // go to folder
        cy.get("[data-test='SavedRecipeFolder-1']").should('exist').click()
        cy.get("[data-test='SavedRecipesView']").should('exist').children().should("have.length", 1)
        cy.get("[data-test='ExitFolderButton']").should('exist').click()

        // take you back to view none and folder options
        cy.get("[data-test='SavedRecipeFolderView']").should('exist').children().should("have.length.at.least", 2) // 1 folder, 1 add button
    })

    it("Switch Recipe to Folder", () => {
        cy.get("[data-test='SaveRecipe-0']").children("svg").should("have.attr", "data-testid").and("eq", "FavoriteBorderOutlinedIcon")
        cy.get("[data-test='SaveRecipe-0']").click()

        // checks that Save Dialog Pops up
        cy.get("[data-test='SaveDialog'").should('exist')
        cy.get("[data-test='SaveDialogAuto']").should('exist')
        cy.get("[data-test='SaveDialogUnsaveButton']").should('exist')
        cy.get("[data-test='SaveDialogTextField']").should('exist').click().type('dinner{enter}')
        cy.get("[data-test='SaveDialogSubmit']").should('exist').click()

        cy.wait(500)
        cy.get("[data-test='SavedRecipesView']").should('exist').children().should("have.length", 0)

        // go to folder
        cy.get("[data-test='SavedRecipeFolder-1']").should('exist').click()
        cy.get("[data-test='SavedRecipesView']").should('exist').children().should("have.length", 2)

        cy.get("[data-test='ExitFolderButton']").should('exist').click()
    })

    it("Switch Recipe to New Folder", () => {
        
        cy.get("[data-test='SavedRecipeFolderView']").should('exist').children().should("have.length.at.least", 2).then(($count) => { // 1 folder, 1 add button

            cy.get("[data-test='SavedRecipeFolder-1']").should('exist').click()

            cy.get("[data-test='SavedRecipesView']").should('exist').children().should("have.length", 2)
            cy.get("[data-test='SaveRecipe-0']").children("svg").should("have.attr", "data-testid").and("eq", "FavoriteBorderOutlinedIcon")
            cy.get("[data-test='SaveRecipe-0']").click()
    
            // checks that Save Dialog Pops up
            cy.get("[data-test='SaveDialog'").should('exist')
            cy.get("[data-test='SaveDialogAuto']").should('exist')
            cy.get("[data-test='SaveDialogUnsaveButton']").should('exist')
            cy.get("[data-test='SaveDialogTextField']").should('exist').click().type(`${$count.length - 1}`)
            cy.get("[data-test='SaveDialogSubmit']").should('exist').click()

            cy.get("[data-test='SavedRecipesView']").should('exist').children().should("have.length", 1)
            cy.get("[data-test='ExitFolderButton']").should('exist').click()

            cy.get("[data-test='SavedRecipeFolderView']").should('exist').children().should("have.length", $count.length + 1) // 1 new folder, 1 add button
            cy.get(`[data-test='SavedRecipeFolder-${$count.length}']`).should('exist').click()
            cy.get("[data-test='SavedRecipesView']").should('exist').children().should("have.length", 1)
            
            cy.get("[data-test='ExitFolderButton']").should('exist').click()
        })
    })

    it("Add New Folder (checks no input, existing folder, new folder)", () => {
        cy.get("[data-test='SavedRecipeFolderView']").should('exist').children().then(($obj) => {
            cy.get("[data-test='AddSavedRecipeFolderButton']").should('exist').click()
            cy.get("[data-test='AddFolderTextField']").should('exist')
            cy.get("[data-test='AddFolderSubmitButton']").should('be.disabled')

            cy.get("[data-test='AddFolderTextField']").should('exist').type("dinner{enter}")
            cy.get("[data-test='AddFolderSubmitButton']").should('be.disabled')

            cy.get("[data-test='AddFolderTextField']").should('exist').type(`{selectall}{backspace}${$obj.length - 1}`)
            cy.get("[data-test='AddFolderSubmitButton']").should('not.be.disabled').click()
            cy.wait(500)
            cy.get("[data-test='SavedRecipeFolderView']").should('exist').children().should('have.length', $obj.length + 1)
        })
    })

    it ("Unsave Recipe from Saved View", () => {
        cy.get("[data-test='SavedRecipeFolder-1']").should('exist').click()
        cy.get("[data-test='SavedRecipesView']").should('exist').children().should("have.length.at.least", 1).then(($obj) => {
            cy.get("[data-test='SaveRecipe-0']").click()
            cy.get("[data-test='SaveDialogUnsaveButton']").click()
            cy.get("[data-test='SavedRecipesView']").should('exist').children().should("have.length", $obj.length - 1)
        })
    })
})