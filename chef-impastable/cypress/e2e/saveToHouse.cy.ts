import React from "react"

describe('Saved Recipes to House', () => {

    // Logs in
    it("Logging in", () => {
        cy.visit('/')
        cy.get("[data-test='UsernameField']").type("carmen")
        cy.get("[data-test='PasswordField']").type("carmen")
        cy.get("[data-test='LoginButton']").click()
    })

    it("Save Recipe to House (already saved)", () => {
        cy.request({
            method: 'POST',
            url: '/api/saveRecipe', // baseUrl is prepend to URL
            // form: true, // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
            body: {
                id: 'house5: carmen,save',
                folder: "none",
                recipeID: "63fbf4eb3a9d1633ad56154d",
                isHouse: true
            },
        }).then((response) => {
            expect(response.body).to.eq(false)           
        })
    })

    it("Unsave Recipe to House", () => {
        cy.request({
            method: 'POST',
            url: '/api/unsaveRecipe', // baseUrl is prepend to URL
            // form: true, // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
            body: {
                username: "644192e70dc108bbd7d6ff03",
                recipeID: "63fbf4eb3a9d1633ad56154d",
                isHouse: true
            },
        }).then((response) => {
            // console.log(response)
            expect(response.body.recipes).not.to.contain("63fbf4eb3a9d1633ad56154d")
        })
    })

    it("Save Recipe to House (success)", () => {
        cy.request({
            method: 'POST',
            url: '/api/saveRecipe', // baseUrl is prepend to URL
            // form: true, // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
            body: {
                id: 'house5: carmen,save',
                folder: "none",
                recipeID: "63fbf4eb3a9d1633ad56154d",
                isHouse: true
            },
        }).then((response) => {
            expect(response.body).to.eq(true)           
        })
    })

    it("Can not save without choosing house", () => {
        cy.get("[data-test='SaveRecipeHouse-0']", {timeout:60000}).click()
        cy.wait(500)
        cy.get("[data-test='SaveHouseDialog'").should('exist')
        cy.get("[data-test='SaveHouseSelect']").should('exist')
        cy.get("[data-test='SaveHouseDialogSubmit']").should('exist').and('be.disabled')
    })

    it("Choose 3 houses to save to", () => {
        cy.get("[data-test='SaveHouseSelect']").click()
        cy.get("li").should('have.length', 4).click({multiple:true})
        cy.get('ul').type('{esc}')
        cy.get("[data-test='SaveHouseDialogSubmit']").should('exist').and('not.be.disabled').click()
    })

    it("Check if recipe is saved", () => {
        cy.visit("http://localhost:3000/household?id=6438ab3d42af480031aaf53f")
        cy.get("[data-test='SavedRecipesHouse']", {timeout:60000}).click()
        cy.request({
            method: 'POST',
            url: '/api/getSavedRecipes', // baseUrl is prepend to URL
            // form: true, // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
            body: {
                user: '6438ab3d42af480031aaf53f',
                getData: true,
                isHouse: true
            },
        }).then((response) => {
            console.log(response);
            cy.get("[class='MuiGrid-root MuiGrid-item css-13i4rnv-MuiGrid-root']").should('have.length', response.body[0].recipes.length)
            cy.get(`[data-test='Recipe-Title-${response.body[0].recipes.length - 1}']`).then(($title) => {
                console.log($title.text)
                expect($title.text()).to.match(/Air Fryer Lemon Pepper Shrimp/i)
            })
        })
    })

    it("Unsave Recipe", () => {
        cy.request({
            method: 'POST',
            url: '/api/getSavedRecipes', // baseUrl is prepend to URL
            // form: true, // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
            body: {
                user: '6438ab3d42af480031aaf53f',
                getData: true,
                isHouse: true
            },
        }).then((response) => {
            console.log(response);
            // cy.get("[class='MuiGrid-root MuiGrid-item css-13i4rnv-MuiGrid-root']").should('have.length', response.body[0].recipes.length)
            cy.get(`[data-test='SaveRecipeHouse-${response.body[0].recipes.length - 1}']`).click()
            cy.wait(500);
            cy.get("[data-test='UnsaveHouseConfirm']", {timeout: 50000}).click();
            cy.request({
                method: 'POST',
                url: '/api/getSavedRecipes', // baseUrl is prepend to URL
                // form: true, // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
                body: {
                    user: '6438ab3d42af480031aaf53f',
                    getData: true,
                    isHouse: true
                },
            }).then((response2) => {
                // console.log(response);
                expect(response2.body[0].recipes.length).to.eq(response.body[0].recipes.length - 1)     
            })
        })
    })

    // var saved = true;

    // it("Save Recipe with empty string (Unsave first if necessary)", () => {
    //     if (saved) {
    //         cy.get("[data-test='SaveRecipe-2']").click()
    //         cy.wait(500)
    //         cy.get("[data-test='SaveRecipe-2']").children("svg").should("have.attr", "data-testid").and("eq", "FavoriteBorderOutlinedIcon")
    //     }
    //     cy.get("[data-test='SaveRecipe-2']").children("svg").should("have.attr", "data-testid").and("eq", "FavoriteBorderOutlinedIcon")
    //     cy.get("[data-test='SaveRecipe-2']").click()

    //     // checks that Save Dialog Pops up
    //     cy.get("[data-test='SaveDialog'").should('exist')
    //     cy.get("[data-test='SaveDialogAuto']").should('exist')
    //     cy.get("[data-test='SaveDialogTextField']").should('exist')
    //     cy.get("[data-test='SaveDialogSubmit']").click()

    //     cy.wait(500)
    //     cy.get("[data-test='SaveRecipe-2']").children("svg").should("have.attr", "data-testid").and("eq", "FavoriteIcon")
    // })

    // it("Unsave Recipe from Homepage", () => {
    //     cy.get("[data-test='SaveRecipe-2']").click()
    //     cy.wait(500)
    //     cy.get("[data-test='SaveRecipe-2']").children("svg").should("have.attr", "data-testid").and("eq", "FavoriteBorderOutlinedIcon")
    // })

    // // it("Click Save and then close Dialog", () => {
    // //     cy.get("[data-test='SaveRecipe-2']").click()

    // //     // checks that Save Dialog Pops up
    // //     cy.get("[data-test='SaveDialogAuto']").should('exist')
    // //     cy.get("[data-test='SaveDialogTextField']").should('exist')
    // //     cy.get("[data-test='SaveDialog'").should('exist').children(".MuiDialog-container").blur()

    // // })

    // it("Save Recipe with existing folder (Unsave first if necessary)", () => {
    //     saved = false;
    //     cy.get("[data-test='SaveRecipe-3']").children("svg").should("have.attr", "data-testid").and("be.oneOf", ["FavoriteBorderOutlinedIcon", "FavoriteIcon"]).then(($obj) => {
    //         console.log("FavoriteIcon".toString() == $obj.toString())
    //         if ("FavoriteIcon".toString() == $obj.toString()) {
    //             cy.get("[data-test='SaveRecipe-3']").click()
    //             cy.wait(500)
    //             cy.get("[data-test='SaveRecipe-3']").children("svg").should("have.attr", "data-testid").and("eq", "FavoriteBorderOutlinedIcon")
    //         }
    //     })
    //     // if (saved) {
    //     //     cy.get("[data-test='SaveRecipe-3']").click()
    //     //     cy.wait(500)
    //     //     cy.get("[data-test='SaveRecipe-3']").children("svg").should("have.attr", "data-testid").and("eq", "FavoriteBorderOutlinedIcon")
    //     // }
    //     cy.get("[data-test='SaveRecipe-3']").children("svg").should("have.attr", "data-testid").and("eq", "FavoriteBorderOutlinedIcon")
    //     cy.get("[data-test='SaveRecipe-3']").click()

    //     // checks that Save Dialog Pops up
    //     cy.get("[data-test='SaveDialog'").should('exist')
    //     cy.get("[data-test='SaveDialogAuto']").should('exist')
    //     cy.get("[data-test='SaveDialogTextField']").should('exist').click().type('dinner{enter}')
    //     cy.get("[data-test='SaveDialogSubmit']").click()

    //     cy.wait(500)
    //     cy.get("[data-test='SaveRecipe-3']").children("svg").should("have.attr", "data-testid").and("eq", "FavoriteIcon")
    // })    

    // it("Clicking a recipe", () => {
    //     cy.get("[data-test='Recipe-2']").click();
    // })

    // it("Save Recipe with empty string (Unsave first if necessary)", () => {
    //     cy.get("[data-test='SaveRecipe']", {timeout: 60000}).children("svg").should("have.attr", "data-testid").and("eq", "FavoriteBorderOutlinedIcon");
    //     cy.get("[data-test='SaveRecipe']").click()

    //     // checks that Save Dialog Pops up
    //     cy.get("[data-test='SaveDialog'").should('exist')
    //     cy.get("[data-test='SaveDialogAuto']").should('exist')
    //     cy.get("[data-test='SaveDialogTextField']").should('exist')
    //     cy.get("[data-test='SaveDialogSubmit']").click()

    //     cy.wait(500)
    //     cy.get("[data-test='SaveRecipe']").children("svg").should("have.attr", "data-testid").and("eq", "FavoriteIcon")
    // })

    // it("Unsave Recipe from Recipe Page", () => {
    //     cy.get("[data-test='SaveRecipe']").click()
    //     cy.wait(500)
    //     cy.get("[data-test='SaveRecipe']").children("svg").should("have.attr", "data-testid").and("eq", "FavoriteBorderOutlinedIcon")
    // })

    // it("Save Recipe with 'none' from recipe view", () => {
    //     cy.get("[data-test='SaveRecipe']", {timeout: 60000}).children("svg").should("have.attr", "data-testid").and("eq", "FavoriteBorderOutlinedIcon");
    //     cy.get("[data-test='SaveRecipe']").click()

    //     // checks that Save Dialog Pops up
    //     cy.get("[data-test='SaveDialog'").should('exist')
    //     cy.get("[data-test='SaveDialogAuto']").should('exist')
    //     cy.get("[data-test='SaveDialogTextField']").should('exist').click().type("none{enter}")
    //     cy.get("[data-test='SaveDialogSubmit']").click()

    //     cy.wait(500)
    //     cy.get("[data-test='SaveRecipe']").children("svg").should("have.attr", "data-testid").and("eq", "FavoriteIcon")
    // })
  
    // it("View Saved Recipes", () => {
    //     cy.visit('/profile-page?username=testSave')
    //     cy.get("[data-test='ProfileSavedTab']", {timeout: 60000}).should('exist').click()
    //     cy.get("[data-test='SavedRecipesView']").should('exist').children().should("have.length", 1)
    //     cy.get("[data-test='SavedRecipeFolderView']").should('exist').children().should("have.length.at.least", 2) // 1 folder, 1 add button
        
    //     // go to folder
    //     cy.get("[data-test='SavedRecipeFolder-1']").should('exist').click()
    //     cy.get("[data-test='SavedRecipesView']").should('exist').children().should("have.length", 1)
    //     cy.get("[data-test='ExitFolderButton']").should('exist').click()

    //     // take you back to view none and folder options
    //     cy.get("[data-test='SavedRecipeFolderView']").should('exist').children().should("have.length.at.least", 2) // 1 folder, 1 add button
    // })

    // it("Switch Recipe to Folder", () => {
    //     cy.get("[data-test='SaveRecipe-0']").children("svg").should("have.attr", "data-testid").and("eq", "FavoriteBorderOutlinedIcon")
    //     cy.get("[data-test='SaveRecipe-0']").click()

    //     // checks that Save Dialog Pops up
    //     cy.get("[data-test='SaveDialog'").should('exist')
    //     cy.get("[data-test='SaveDialogAuto']").should('exist')
    //     cy.get("[data-test='SaveDialogUnsaveButton']").should('exist')
    //     cy.get("[data-test='SaveDialogTextField']").should('exist').click().type('dinner{enter}')
    //     cy.get("[data-test='SaveDialogSubmit']").should('exist').click()

    //     cy.wait(500)
    //     cy.get("[data-test='SavedRecipesView']").should('exist').children().should("have.length", 0)

    //     // go to folder
    //     cy.get("[data-test='SavedRecipeFolder-1']").should('exist').click()
    //     cy.get("[data-test='SavedRecipesView']").should('exist').children().should("have.length", 2)

    //     cy.get("[data-test='ExitFolderButton']").should('exist').click()
    // })

    // it("Switch Recipe to New Folder", () => {
        
    //     cy.get("[data-test='SavedRecipeFolderView']").should('exist').children().should("have.length.at.least", 2).then(($count) => { // 1 folder, 1 add button

    //         cy.get("[data-test='SavedRecipeFolder-1']").should('exist').click()

    //         cy.get("[data-test='SavedRecipesView']").should('exist').children().should("have.length", 2)
    //         cy.get("[data-test='SaveRecipe-0']").children("svg").should("have.attr", "data-testid").and("eq", "FavoriteBorderOutlinedIcon")
    //         cy.get("[data-test='SaveRecipe-0']").click()
    
    //         // checks that Save Dialog Pops up
    //         cy.get("[data-test='SaveDialog'").should('exist')
    //         cy.get("[data-test='SaveDialogAuto']").should('exist')
    //         cy.get("[data-test='SaveDialogUnsaveButton']").should('exist')
    //         cy.get("[data-test='SaveDialogTextField']").should('exist').click().type(`${$count.length - 1}`)
    //         cy.get("[data-test='SaveDialogSubmit']").should('exist').click()

    //         cy.get("[data-test='SavedRecipesView']").should('exist').children().should("have.length", 1)
    //         cy.get("[data-test='ExitFolderButton']").should('exist').click()

    //         cy.get("[data-test='SavedRecipeFolderView']").should('exist').children().should("have.length", $count.length + 1) // 1 new folder, 1 add button
    //         cy.get(`[data-test='SavedRecipeFolder-${$count.length}']`).should('exist').click()
    //         cy.get("[data-test='SavedRecipesView']").should('exist').children().should("have.length", 1)
            
    //         cy.get("[data-test='ExitFolderButton']").should('exist').click()
    //     })
    // })

    // it("Add New Folder (checks no input, existing folder, new folder)", () => {
    //     cy.get("[data-test='SavedRecipeFolderView']").should('exist').children().then(($obj) => {
    //         cy.get("[data-test='AddSavedRecipeFolderButton']").should('exist').click()
    //         cy.get("[data-test='AddFolderTextField']").should('exist')
    //         cy.get("[data-test='AddFolderSubmitButton']").should('be.disabled')

    //         cy.get("[data-test='AddFolderTextField']").should('exist').type("dinner{enter}")
    //         cy.get("[data-test='AddFolderSubmitButton']").should('be.disabled')

    //         cy.get("[data-test='AddFolderTextField']").should('exist').type(`{selectall}{backspace}${$obj.length - 1}`)
    //         cy.get("[data-test='AddFolderSubmitButton']").should('not.be.disabled').click()
    //         cy.wait(500)
    //         cy.get("[data-test='SavedRecipeFolderView']").should('exist').children().should('have.length', $obj.length + 1)
    //     })
    // })

    // it ("Unsave Recipe from Saved View", () => {
    //     cy.get("[data-test='SavedRecipeFolder-1']").should('exist').click()
    //     cy.get("[data-test='SavedRecipesView']").should('exist').children().should("have.length.at.least", 1).then(($obj) => {
    //         cy.get("[data-test='SaveRecipe-0']").click()
    //         cy.get("[data-test='SaveDialogUnsaveButton']").click()
    //         cy.get("[data-test='SavedRecipesView']").should('exist').children().should("have.length", $obj.length - 1)
    //     })
    // })
})