
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

    it("Attempting to Enter an Empty String", () => {
        cy.get("[data-test='CRAddIngredient']", { timeout: 15000 }).click()
        cy.get("[data-test='CREnterIngredient']").click();
        cy.get("[data-test='CRIngredientEmptyString']").should("contain", "Please type the name of a valid ingredient.")
        cy.get("[data-test='CRIngredientEmptyStringOk']").click()
    })

    it("Attempting to Add an Empty String to the Database", () => {
        cy.get("[data-test='CRAddToDatabaseButton']").click();
        cy.get("[data-test='CRIngredientEmptyString']").should("contain", "Please type the name of a valid ingredient.")
        cy.get("[data-test='CRIngredientEmptyStringOk']").click()
    })

    it("Attempting to Add an Ingredient That Already Exists to the Database", () => {
        cy.get("[data-test='CRIngredientsToAdd']").clear().type("olive oil{enter}")
        cy.get("[data-test='CRAddToDatabaseButton']").click();
        cy.get("[data-test='CRIngredientAlreadyExistsPopup']").should("contain", "This ingredient already exists, therefore you cannot create it.")
        cy.get("[data-test='CRIngredientAlreadyExistsPopupOk']").click();
    })

    it("Attempting to Enter Ingredient That Doesn't Exist", () => {
        cy.get("[data-test='CRIngredientsToAdd']").clear().type("made up ingredient")
        cy.get("[data-test='CREnterIngredient']").click();
        cy.get("[data-test='CRIngredientDoesNotExitPopup']").should("contain", "This ingredient does not currently exist. Please create the ingredient before trying to use it.")
        cy.get("[data-test='CRIngredientDoesNotExitPopupOk']").click()
    })

    it("Adding an Ingredient to the Databse", () => {
        cy.get("[data-test='CRIngredientsToAdd']").clear().type("made up ingredient")
        cy.get("[data-test='CRAddToDatabaseButton']").click();
        cy.get("[data-test='CRingredient-0']").should("contain", "made up ingredient");
    })


    //CRIngredientEmptyString
  })
  
  export {}