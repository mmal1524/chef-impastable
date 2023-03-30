
describe('Adding Ingredients to the Database', () => {

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

    it("Attempting to add an ingredient that already exists to the database", () => {
        cy.get("[data-test='CRAddIngredient']", { timeout: 15000 }).click()
        cy.get("[data-test='CRIngredientsToAdd']").type("olive oil{enter}")
        //cy.get("[data-test='CRIngredientsToAdd']").type('{enter}')
        cy.get("[data-test='CRAddToDatabaseButton']").click();
        cy.get("[data-test='CRIngredientAlreadyExistsPopup']").should("contain", "This ingredient already exists, therefore you cannot create it.")
        cy.get("[data-test='CRIngredientAlreadyExistsPopupOk']").click();
    })

    it("Attempting to Enter Ingredient That Doesn't Exist", () => {
        //cy.get("[data-test='CRAddIngredient']").click()
        cy.get("[data-test='CRIngredientsToAdd']").clear().type("made up ingredient")
        cy.get("[data-test='CREnterIngredient']").click();
        cy.get("[data-test='CRIngredientDoesNotExitPopup']").should("contain", "This ingredient does not currently exist. Please create the ingredient before trying to use it.")
        cy.get("[data-test='CRIngredientDoesNotExitPopupOk']").click()
    })

  })
  
  export {}