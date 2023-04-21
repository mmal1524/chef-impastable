
describe('Searching for a recipe', () => {

    it("Logging in", () => {
      cy.viewport(3072, 1920)
      cy.visit('/')
      cy.get("[data-test='UsernameField']").type("carmen")
      cy.get("[data-test='PasswordField']").type("carmen")
      cy.get("[data-test='LoginButton']").click()
    })

    it("Default Homepage", () => {
        var res;
        cy.viewport(3072, 1920)

        cy.request({
            method: 'POST',
            url: '/api/getRecipesByFridge', // baseUrl is prepend to URL
            // form: true, // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
            body: {
                username: 'carmen',
                page: 1,
            },
        }).then((response) => {
            expect(response.body.length).to.eq(20)
            cy.get("[data-test='Recipe-0']", {timeout:60000}).should('exist').then(() => {
                cy.wrap(response.body).each(($recipe, i) => {
                    cy.get(`[data-test='Recipe-Title-${i}']`).then(($title) => {
                        console.log("title: " + $title.text)
                        console.log($recipe)
                        if (i != 19) {
                            cy.wrap(response.body).its(i+1).its('matches').should("be.lte", $recipe.matches)
                        }
                        // expect($recipe.matches).to.be.gte($recipe.matches)
                        // console.log("response: " + response.body[0].title)
                        expect($title.text()).to.eq($recipe.title)
                    })
                })
            })
        })
    })

    it("Searching for a recipe by fridge", () => {
        cy.viewport(3072, 1920)

        cy.get("[data-test='SearchBar']", { timeout: 15000 }).type("chicken")
        cy.get("[data-test='searchFridge']", { timeout: 15000 }).click()
        cy.wait(5000)
        cy.request({
            method: 'POST',
            url: '/api/searchRecipe', // baseUrl is prepend to URL
            // form: true, // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
            body: {
                search: "chicken",
                filters: [],
                username: 'carmen',
                byFridge: "true",
                page: 1,
            },
        }).then((response) => {
            expect(response.body.length).to.eq(2)
            expect(response.body[0].length).to.eq(20)
            expect(response.body[1]).to.eq(true)
            cy.get("[data-test='Recipe-0']", {timeout:60000}).should('exist').then(() => {
                cy.wrap(response.body[0]).each(($recipe, i) => {
                    cy.get(`[data-test='Recipe-Title-${i}']`).then(($title) => {
                        console.log("title: " + $title.text)
                        console.log($recipe)
                        // expect($recipe.matches).to.be.gte(cy.wrap(response.body[0]).eq(i+1).get('matches'))
                        // console.log("response: " + response.body[0].title)
                        if (i != 19) {
                            cy.wrap(response.body[0]).its(i+1).its('matches').should("be.lte", $recipe.matches)
                        }
                        expect($title.text()).to.eq($recipe.title)
                        expect($recipe.title).to.match((/chicken/i))
                    })
                })
            })
        })
    })

    it("API by fridge and not by fridge difference", () => {
        cy.request({
            method: 'POST',
            url: '/api/searchRecipe', // baseUrl is prepend to URL
            // form: true, // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
            body: {
                search: "air",
                filters: [],
                username: 'carmen',
                byFridge: "true",
                page: 1,
            },
        }).then((response) => {
            expect(response.body.length).to.eq(2)
            expect(response.body[0].length).to.eq(20)
            expect(response.body[1]).to.eq(true)

            cy.request({
                method: 'POST',
                url: '/api/searchRecipe', // baseUrl is prepend to URL
                // form: true, // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
                body: {
                    search: "air",
                    filters: [],
                    username: 'carmen',
                    byFridge: "false",
                    page: 1,
                },
            }).then((response2) => {
                expect(response2.body.length).to.eq(2)
                expect(response2.body[0].length).to.eq(20)
                expect(response2.body[1]).to.eq(true)
                expect(response.body[0][0].title).not.to.eq(response2.body[0][0].title)
            })
        })
    })

    it("Searching for a recipe that has no matches", () => {        
        cy.request({
            method: 'POST',
            url: '/api/searchRecipe', // baseUrl is prepend to URL
            // form: true, // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
            body: {
                search: "ice cream",
                filters: [],
                username: 'carmen',
                byFridge: "true",
                page: 1,
            },
        }).then((response) => {
            expect(response.body.length).to.eq(2)
            expect(response.body[0].length).to.eq(0)
            expect(response.body[1]).to.eq(false)
        })
    })

    it("Searching for a recipe with dietary restrictions by fridge", () => {        
        cy.request({
            method: 'POST',
            url: '/api/searchRecipe', // baseUrl is prepend to URL
            // form: true, // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
            body: {
                search: "air",
                filters: ["Vegetarian"],
                username: 'carmen',
                byFridge: "true",
                page: 1,
            },
        }).then((response) => {
            expect(response.body.length).to.eq(2)
            // expect(response.body[0].length).to.eq(0)
            // expect(response.body[1]).to.eq(false)
            // cy.get("[data-test='Recipe-0']", {timeout:60000}).should('exist').then(() => {
            cy.wrap(response.body[0]).each(($recipe, i) => {
                // cy.get(`[data-test='Recipe-Title-${i}']`).then(($title) => {
                    // console.log("title: " + $title.text)
                    console.log($recipe)
                    // expect($recipe.matches).to.be.gte(cy.wrap(response.body[0]).eq(i+1).get('matches'))
                    // console.log("response: " + response.body[0].title)
                    if (i != response.body[0].length - 1) {
                        cy.wrap(response.body[0]).its(i+1).its('matches').should("be.lte", $recipe.matches)
                    }
                    // expect($title.text()).to.eq($recipe.title)
                    expect($recipe.title).to.match((/air/i))
                // })
                cy.wrap($recipe.tags).each(($tag) => {
                    if ($tag.tag == "Vegetarian") {
                        expect($tag.exists).to.eq(true)
                    }
                })
            })
            // })
        })
    })
  })

  export {}