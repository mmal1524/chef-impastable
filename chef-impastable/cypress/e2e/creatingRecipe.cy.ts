
describe('Creating a Recipe', () => {

    it("Logging in", () => {
      cy.visit('/')
      cy.get("[data-test='UsernameField']").type("carmen")
      cy.get("[data-test='PasswordField']").type("carmen")
      cy.get("[data-test='LoginButton']").click()
    })
    it("Clicking on Create Recipe From Profile", () => {
        cy.get("[data-test='ProfileIcon']", { timeout: 15000 }).click()
      })
  
  })
  
  export {}