
describe('Recipe Tag Page', () => {

  it("Logging in", () => {
    cy.visit('/')
    cy.get("[data-test='UsernameField']").type("carmen")
    cy.get("[data-test='PasswordField']").type("carmen")
    cy.get("[data-test='LoginButton']").click()
  })

  it("Clicking a recipe", () => {
    cy.get("[data-test='0']", { timeout: 10000 }).click()
  })

  it("Selecting Vegan Tag", () => {
    cy.get("[data-test='tag-0']").as("tag")
    cy.get("@tag").then(($btn) => {
      const btnColor = $btn.css('background-color')
      if (btnColor === 'rgb(224, 224, 224)') {
        //if the button is gray
        cy.get("@tag").click().should('have.css', 'background-color')
        .and('eq', 'rgb(255, 193, 7)')
      }
      else if (btnColor === 'rgb(255, 193, 7)') {
        //if the button is gold
        cy.get("@tag").click().should('have.css', 'background-color')
        .and('eq', 'rgb(224, 224, 224)')
      }
    })
  })

  it("Selecting Paleo Tag", () => {
    cy.get("[data-test='tag-4']").as("tag")
    cy.get("@tag").then(($btn) => {
      const btnColor = $btn.css('background-color')
      if (btnColor === 'rgb(224, 224, 224)') {
        //if the button is gray
        cy.get("@tag").click().should('have.css', 'background-color')
        .and('eq', 'rgb(255, 193, 7)')
      }
      else if (btnColor === 'rgb(255, 193, 7)') {
        //if the button is gold
        cy.get("@tag").click().should('have.css', 'background-color')
        .and('eq', 'rgb(224, 224, 224)')
      }
    })
  })

  it("Selecting Fish Free Tag Twice", () => {
    cy.get("[data-test='tag-11']").as("tag")
    cy.get("@tag").then(($btn) => {
      const btnColor = $btn.css('background-color')
      if (btnColor === 'rgb(224, 224, 224)') {
        //if the button is gray
        cy.get("@tag").click().should('have.css', 'background-color')
        .and('eq', 'rgb(255, 193, 7)')
        cy.get("@tag").click().should('have.css', 'background-color')
        .and('eq', 'rgb(224, 224, 224)')
      }
      else if (btnColor === 'rgb(255, 193, 7)') {
        //if the button is gold
        cy.get("@tag").click().should('have.css', 'background-color')
        .and('eq', 'rgb(224, 224, 224)')
        cy.get("@tag").click().should('have.css', 'background-color')
        .and('eq', 'rgb(255, 193, 7)')
      }
    })
  })
})

export {}