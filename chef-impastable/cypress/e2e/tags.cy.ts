describe('Recipe Tag Page', () => {

  it("Logging in", () => {
    cy.visit('/')
    cy.get("[data-test='UsernameField']").type("carmen")
    cy.get("[data-test='PasswordField']").type("carmen")
    cy.get("[data-test='LoginButton']").click()
    cy.get("[data-test='0']", {timeout: 10000}).click()
    cy.get("[data-test='tag-0']", {timeout: 100}).click().should('have.css', 'background-color')
    .and('eq', 'rgb(255, 193, 7)')
    cy.get("[data-test='6']", {timeout: 100}).click()
    cy.get("[data-test='tag-0']", {timeout: 100}).click().should('have.css', 'background-color')
    .and('eq', 'rgb(255, 193, 7)')
    cy.get("[data-test='tag-0']", {timeout: 100}).click().should('have.css', 'background-color')
    .and('eq', 'rgb(224, 224, 224)')
  })
})

export{}