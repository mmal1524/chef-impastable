
describe('Creating a Recipe', () => {

    it("Logging in", () => {
      cy.visit('/')
      cy.get("[data-test='UsernameField']").type("carmen")
      cy.get("[data-test='PasswordField']").type("carmen")
      cy.get("[data-test='LoginButton']").click()
    })

    it("Clicking on Create Recipe From Profile", () => {
        cy.get("[data-test='ProfileIcon']", { timeout: 15000 }).click()
        cy.get("[data-test='CreateRecipeNav']", { timeout: 15000 }).click()
    })

    it("Recipe With Missing Information", () => {
        cy.get("[data-test='RecipeTitle']", { timeout: 15000 }).type("Brussel Sprout Casserole")
        cy.get("[data-test='RecipeImage']", { timeout: 15000 }).type("https://feelgoodfoodie.net/wp-content/uploads/2020/11/Brussel-Sprout-Casserole-5.jpg")
        cy.get("[data-test='CreateRecipeButton']").click()
        cy.get("[data-test='MissingInformationPopup']").should("contain", "One or more of the required fields are left blank. Please fill out all required information before creating the recipe.")
        cy.get("[data-test='CloseMissingInfoPopup']").click()
    })

    it("Filling Out All Required Information", () => {
        cy.get("[data-test='RecipePrepTime']").type("15")
        cy.get("[data-test='RecipeCookTime']").type("35")
        cy.get("[data-test='RecipeTotalTime']").type("50")
        cy.get("[data-test='RecipeYields']").type("6")
        cy.get("[data-test='RecipeDescription']").type("This deliciously cheesy Brussel sprout casserole is an excellent side dish to serve with your Thanksgiving or holiday dinner.")
        cy.get("[data-test='RecipeInstructions']")
        .type("Preheat the oven to 425°F.\nPlace brussel sprouts on a baking dish\nThese are example steps")
        cy.get("[data-test='RecipeCalories']", { timeout: 15000 }).type("143")
        cy.get("[data-test='CreateRecipeButton']", { timeout: 15000 }).click()
    })

    it("Clicking on Create Recipe From Profile", () => {
        cy.get("[data-test='ProfileIcon']", { timeout: 15000 }).click()
        cy.get("[data-test='CreateRecipeNav']", { timeout: 15000 }).click()
    })

    it("Verifying Recipe Was Created, Image is Visible", () => {
        cy.get("[data-test='RecipeViewTitle']", { timeout: 25000 }).should("contain", "Brussel Sprout Casserole")
        cy.get("[data-test='RecipeViewImage']").should("be.visible")
    })
  })
  
  export {}