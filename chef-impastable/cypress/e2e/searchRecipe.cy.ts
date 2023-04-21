
describe('Searching for a recipe', () => {

    it("Searching for a recipe (API test)", () => {
        cy.viewport(1280, 720)
        cy.request({
            method: 'POST',
            url: '/api/searchRecipe', // baseUrl is prepend to URL
            // form: true, // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
            body: {
                search: "brus",
                filters: [],
                username: 'carmen',
                byFridge: "false",
                page: 1,
            },
        }).then((response) => {
            expect(response.body[0][0].title).to.match(/brus/i);
        })
    })

    it("Searching for a recipe that doesn't exist (API test)", () => {
        cy.viewport(1280, 720)
        cy.request({
            method: 'POST',
            url: '/api/searchRecipe', // baseUrl is prepend to URL
            // form: true, // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
            body: {
                search: "thisisnotarealrecipehahahaha",
                filters: [],
                username: 'carmen',
                byFridge: "false",
                page: 1,
            },
        }).then((response) => {
            expect(response.body[0].length).to.eq(0)
        })
    })

    it("Logging in", () => {
      cy.viewport(1280, 720)
      cy.visit('/')
      cy.get("[data-test='UsernameField']").type("searchrecipetest")
      cy.get("[data-test='PasswordField']").type("Search123*")
      cy.get("[data-test='LoginButton']").click()
    })

    it("Searching for a recipe that does not exist", () => {
        cy.viewport(1280, 720)
        cy.get("[data-test='SearchBar']", { timeout: 60000 }).type("fdjasklfjklsdajflsajkflajsodif")
        cy.get("[data-test='SearchButton']", { timeout: 15000 }).click()
        cy.wait(500)
        cy.get("[data-test='FailedSearch']", { timeout: 25000 }).should("contain", "No recipes that match your search term and/or dietary filters were found. Please try a different keyword or filter.")
        cy.get("[data-test='OkFailedSearch']", { timeout: 15000 }).click()
    })

    it("Searching for a recipe based off my dietary preferences, search not on homepage routes to homepage ", () => {
        cy.viewport(1280, 720)
        cy.get("[data-test='Dropdown']", { timeout: 15000 }).click()
        cy.get("[data-test='DietaryRestrictions']", { timeout: 15000 }).click()
        cy.get("[data-test='DietSelect']", { timeout: 15000 }).click()
        cy.get("[data-test='Pescetarian']", { timeout: 15000 }).click()
        cy.get("[data-test='AddTag']", { timeout: 15000 }).click()
        cy.get("[data-test='DietFilters']", { timeout: 15000 }).click()
        cy.get("[data-test='checkbox']", { timeout: 15000 }).first().click()
        cy.get("[data-test='CloseDietFilters']", { timeout: 15000 }).click()
        cy.get("[data-test='SearchBar']", { timeout: 15000 }).type("til")
        cy.get("[data-test='SearchButton']", { timeout: 15000 }).click()
        cy.wait(5000)
        cy.get("[data-test='Recipe-0']", { timeout: 15000 }).click()
        cy.get("[data-test='tag-5']", { timeout:  15000 }).should('have.css', 'background-color')
        .and('eq', 'rgb(255, 193, 7)')
    })

    it("No search results from my dietary preferences", () => {
        cy.viewport(1280, 720)
        cy.get("[data-test='Dropdown']", { timeout: 15000 }).click()
        cy.get("[data-test='DietaryRestrictions']", { timeout: 15000 }).click()
        cy.get("[data-test='DietSelect']", { timeout: 15000 }).click()
        cy.get("[data-test='Halal']", { timeout: 15000 }).click()
        cy.get("[data-test='AddTag']", { timeout: 15000 }).click()
        cy.get("[data-test='DietFilters']", { timeout: 15000 }).click()
        cy.get("[data-test='checkbox']", { timeout: 15000 }).first().click()
        cy.get("[data-test='CloseDietFilters']", { timeout: 15000 }).click()
        cy.get("[data-test='SearchBar']", { timeout: 15000 }).type("fish")
        cy.get("[data-test='SearchButton']", { timeout: 15000 }).click()
        cy.wait(5000)
        cy.get("[data-test='FailedSearch']", { timeout: 25000 }).should("contain", "No recipes that match your search term and/or dietary filters were found. Please try a different keyword or filter.")
        cy.get("[data-test='OkFailedSearch']", { timeout: 15000 }).click()
    })

    it("Search with filters", () => {
        cy.viewport(1280, 720)
        cy.get("[data-test='DietFilters']", { timeout: 15000 }).click()
        cy.get("[data-test='checkbox']", { timeout: 15000 }).eq(3).click()
        cy.get("[data-test='CloseDietFilters']", { timeout: 15000 }).click()
        cy.get("[data-test='SearchBar']", { timeout: 15000 }).type("pizza")
        cy.get("[data-test='SearchButton']", { timeout: 15000 }).click()
        cy.wait(5000)
        cy.get("[data-test='Recipe-0']", { timeout: 15000 }).click()
        cy.get("[data-test='tag-2']", { timeout:  15000 }).should('have.css', 'background-color')
        .and('eq', 'rgb(255, 193, 7)')
    })

    it("Search with filters, no recipe exists", () => {
        cy.viewport(1280, 720)
        cy.get("[data-test='DietFilters']", { timeout: 15000 }).click()
        cy.get("[data-test='checkbox']", { timeout: 15000 }).eq(14).click()
        cy.get("[data-test='CloseDietFilters']", { timeout: 15000 }).click()
        cy.get("[data-test='SearchBar']", { timeout: 15000 }).type("corn")
        cy.get("[data-test='SearchButton']", { timeout: 15000 }).click()
        cy.wait(5000)
        cy.get("[data-test='FailedSearch']", { timeout: 25000 }).should("contain", "No recipes that match your search term and/or dietary filters were found. Please try a different keyword or filter.")
        cy.get("[data-test='OkFailedSearch']", { timeout: 15000 }).click()
    })

    it("Delete dietary tags at end of test", () => {
        cy.viewport(1280, 720)
        cy.get("[data-test='Dropdown']", { timeout: 15000 }).click()
        cy.get("[data-test='DietaryRestrictions']", { timeout: 15000 }).click()
        cy.get("[data-test='RemoveDiet-0']", { timeout: 15000 }).click()
        cy.get("[data-test='RemoveDiet-0']", { timeout: 15000 }).click()
    })
  })
  
  export {}