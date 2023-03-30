import React from "react"

/* Test user stories 5, 6, and 7 */

describe('Reviews', () => {

  var numReviews;
  var avgRating;
  var numReviewed;

  // Logs in
  it("Logging in", () => {
    cy.visit('/')
    cy.get("[data-test='UsernameField']").type("unitTestReviews")
    cy.get("[data-test='PasswordField']").type("Password1!")
    cy.get("[data-test='LoginButton']").click()
  })

  // Clicks on a recipe
  it("Clicking a recipe", () => {
    cy.get("[data-test='Recipe-0']", {timeout: 60000}).click()
  })

  // Checks that the number of reviews is displayed and average star rating and stores them
  it("Number of reviews and average rating", () => {
    cy.get("[data-test='NumReviews']", {timeout: 60000}).then(($reviews) => {
      var header = $reviews.text().split(' ')
      numReviews = header[0]
      expect(header[1]).to.eq("Reviews")
    })
    cy.get("[data-test='AverageRating']").then(($rating) => {
      var ratingstxt = $rating.text().split(' ')
      expect(ratingstxt[0]).to.eq("Average")
      expect(ratingstxt[1]).to.eq("Rating:")
      if (numReviews == 0) {
        avgRating = null
        expect(ratingstxt[2]).to.eq("N/A")
      } else {
        avgRating = ratingstxt[2]
        expect(ratingstxt[3]).to.eq("stars")
      }
    })
  })

  // Checks that all reviews are displayed
  it("Reviews displayed", () => {
    if (numReviews > 0) {
      cy.get("[data-test='Reviews']").should("have.attr", "number", numReviews)
      var i = 0
      for (i; i < numReviews; i++) {
        cy.get(`[data-test='Review-${i}']`).find("[data-test='Stars']").should("exist")
        cy.get(`[data-test='Review-${i}']`).find("[data-test='author']").should("exist")
        cy.get(`[data-test='Review-${i}']`).find("[data-test='description']").should("exist")
      }
    }
  })

  // Checks the button to leave a review and clicks it
  it("Leave a review button", () => {
    cy.get("[data-test='LeaveAReview']").should("contain", "Leave a Review").click()
  })

  // Checks that the UI popup exists and contains all necessary fields
  it("UI dialog popup", () => {
    cy.get("[role='dialog']").should("contain", "Leave a Review")

    cy.get("[data-test='ReviewUI']")
      .should("contain", "Rating")
      .should("contain", "Description/Comments")

    cy.get("[data-test='Stars']").should("exist")
      .get("[data-test='Star1']").find('svg').should('have.attr', 'data-testid', 'StarOutlineIcon')
      .get("[data-test='Star2']").find('svg').should('have.attr', 'data-testid', 'StarOutlineIcon')
      .get("[data-test='Star3']").find('svg').should('have.attr', 'data-testid', 'StarOutlineIcon')
      .get("[data-test='Star4']").find('svg').should('have.attr', 'data-testid', 'StarOutlineIcon')
      .get("[data-test='Star5']").find('svg').should('have.attr', 'data-testid', 'StarOutlineIcon')

    cy.get("[data-test='description']").should("exist")
  })

  // Checks that the user can specify a star rating from 0 to 5

  it("Choose a star rating", () => {
    // choose star 1
    cy.get("[data-test='Star1']").click()
      .find('svg').should('have.attr', 'data-testid', 'StarIcon')
    cy.get("[data-test='Star2']").find('svg').should('have.attr', 'data-testid', 'StarOutlineIcon')
    cy.get("[data-test='Star3']").find('svg').should('have.attr', 'data-testid', 'StarOutlineIcon')
    cy.get("[data-test='Star4']").find('svg').should('have.attr', 'data-testid', 'StarOutlineIcon')
    cy.get("[data-test='Star5']").find('svg').should('have.attr', 'data-testid', 'StarOutlineIcon')

    // choose star 2
    cy.get("[data-test='Star2']").click()
      .find('svg').should('have.attr', 'data-testid', 'StarIcon')
    cy.get("[data-test='Star1']").find('svg').should('have.attr', 'data-testid', 'StarIcon')
    cy.get("[data-test='Star3']").find('svg').should('have.attr', 'data-testid', 'StarOutlineIcon')
    cy.get("[data-test='Star4']").find('svg').should('have.attr', 'data-testid', 'StarOutlineIcon')
    cy.get("[data-test='Star5']").find('svg').should('have.attr', 'data-testid', 'StarOutlineIcon')

    // choose star 3
    cy.get("[data-test='Star3']").click()
      .find('svg').should('have.attr', 'data-testid', 'StarIcon')
    cy.get("[data-test='Star1']").find('svg').should('have.attr', 'data-testid', 'StarIcon')
    cy.get("[data-test='Star2']").find('svg').should('have.attr', 'data-testid', 'StarIcon')
    cy.get("[data-test='Star4']").find('svg').should('have.attr', 'data-testid', 'StarOutlineIcon')
    cy.get("[data-test='Star5']").find('svg').should('have.attr', 'data-testid', 'StarOutlineIcon')

    // choose star 4
    cy.get("[data-test='Star4']").click()
      .find('svg').should('have.attr', 'data-testid', 'StarIcon')
    cy.get("[data-test='Star1']").find('svg').should('have.attr', 'data-testid', 'StarIcon')
    cy.get("[data-test='Star2']").find('svg').should('have.attr', 'data-testid', 'StarIcon')
    cy.get("[data-test='Star3']").find('svg').should('have.attr', 'data-testid', 'StarIcon')
    cy.get("[data-test='Star5']").find('svg').should('have.attr', 'data-testid', 'StarOutlineIcon')

    // choose star 5
    cy.get("[data-test='Star5']").click()
      .find('svg').should('have.attr', 'data-testid', 'StarIcon')
    cy.get("[data-test='Star1']").find('svg').should('have.attr', 'data-testid', 'StarIcon')
    cy.get("[data-test='Star2']").find('svg').should('have.attr', 'data-testid', 'StarIcon')
    cy.get("[data-test='Star3']").find('svg').should('have.attr', 'data-testid', 'StarIcon')
    cy.get("[data-test='Star4']").find('svg').should('have.attr', 'data-testid', 'StarIcon')

    // choose zero stars
    cy.get("[data-test='Star1']").click().click()
      .find('svg').should('have.attr', 'data-testid', 'StarOutlineIcon')
    cy.get("[data-test='Star2']").find('svg').should('have.attr', 'data-testid', 'StarOutlineIcon')
    cy.get("[data-test='Star3']").find('svg').should('have.attr', 'data-testid', 'StarOutlineIcon')
    cy.get("[data-test='Star4']").find('svg').should('have.attr', 'data-testid', 'StarOutlineIcon')
    cy.get("[data-test='Star5']").find('svg').should('have.attr', 'data-testid', 'StarOutlineIcon')

    // choose star 1
    cy.get("[data-test='Star1']").click()
      .find('svg').should('have.attr', 'data-testid', 'StarIcon')
    cy.get("[data-test='Star2']").find('svg').should('have.attr', 'data-testid', 'StarOutlineIcon')
    cy.get("[data-test='Star3']").find('svg').should('have.attr', 'data-testid', 'StarOutlineIcon')
    cy.get("[data-test='Star4']").find('svg').should('have.attr', 'data-testid', 'StarOutlineIcon')
    cy.get("[data-test='Star5']").find('svg').should('have.attr', 'data-testid', 'StarOutlineIcon')

    // choose zero stars
    cy.get("[data-test='Star1']").click()
      .find('svg').should('have.attr', 'data-testid', 'StarOutlineIcon')
    cy.get("[data-test='Star2']").find('svg').should('have.attr', 'data-testid', 'StarOutlineIcon')
    cy.get("[data-test='Star3']").find('svg').should('have.attr', 'data-testid', 'StarOutlineIcon')
    cy.get("[data-test='Star4']").find('svg').should('have.attr', 'data-testid', 'StarOutlineIcon')
    cy.get("[data-test='Star5']").find('svg').should('have.attr', 'data-testid', 'StarOutlineIcon')

    // choose star 2
    cy.get("[data-test='Star2']").click()
      .find('svg').should('have.attr', 'data-testid', 'StarIcon')
    cy.get("[data-test='Star1']").find('svg').should('have.attr', 'data-testid', 'StarIcon')
    cy.get("[data-test='Star3']").find('svg').should('have.attr', 'data-testid', 'StarOutlineIcon')
    cy.get("[data-test='Star4']").find('svg').should('have.attr', 'data-testid', 'StarOutlineIcon')
    cy.get("[data-test='Star5']").find('svg').should('have.attr', 'data-testid', 'StarOutlineIcon')

    // choose zero stars
    cy.get("[data-test='Star1']").click().click()
      .find('svg').should('have.attr', 'data-testid', 'StarOutlineIcon')
    cy.get("[data-test='Star2']").find('svg').should('have.attr', 'data-testid', 'StarOutlineIcon')
    cy.get("[data-test='Star3']").find('svg').should('have.attr', 'data-testid', 'StarOutlineIcon')
    cy.get("[data-test='Star4']").find('svg').should('have.attr', 'data-testid', 'StarOutlineIcon')
    cy.get("[data-test='Star5']").find('svg').should('have.attr', 'data-testid', 'StarOutlineIcon')

    // choose star 3
    cy.get("[data-test='Star3']").click()
      .find('svg').should('have.attr', 'data-testid', 'StarIcon')
    cy.get("[data-test='Star1']").find('svg').should('have.attr', 'data-testid', 'StarIcon')
    cy.get("[data-test='Star2']").find('svg').should('have.attr', 'data-testid', 'StarIcon')
    cy.get("[data-test='Star4']").find('svg').should('have.attr', 'data-testid', 'StarOutlineIcon')
    cy.get("[data-test='Star5']").find('svg').should('have.attr', 'data-testid', 'StarOutlineIcon')

    // choose zero stars
    cy.get("[data-test='Star1']").click().click()
      .find('svg').should('have.attr', 'data-testid', 'StarOutlineIcon')
    cy.get("[data-test='Star2']").find('svg').should('have.attr', 'data-testid', 'StarOutlineIcon')
    cy.get("[data-test='Star3']").find('svg').should('have.attr', 'data-testid', 'StarOutlineIcon')
    cy.get("[data-test='Star4']").find('svg').should('have.attr', 'data-testid', 'StarOutlineIcon')
    cy.get("[data-test='Star5']").find('svg').should('have.attr', 'data-testid', 'StarOutlineIcon')

    // choose star 4
    cy.get("[data-test='Star4']").click()
      .find('svg').should('have.attr', 'data-testid', 'StarIcon')
    cy.get("[data-test='Star1']").find('svg').should('have.attr', 'data-testid', 'StarIcon')
    cy.get("[data-test='Star2']").find('svg').should('have.attr', 'data-testid', 'StarIcon')
    cy.get("[data-test='Star3']").find('svg').should('have.attr', 'data-testid', 'StarIcon')
    cy.get("[data-test='Star5']").find('svg').should('have.attr', 'data-testid', 'StarOutlineIcon')

    // choose zero stars
    cy.get("[data-test='Star1']").click().click()
      .find('svg').should('have.attr', 'data-testid', 'StarOutlineIcon')
    cy.get("[data-test='Star2']").find('svg').should('have.attr', 'data-testid', 'StarOutlineIcon')
    cy.get("[data-test='Star3']").find('svg').should('have.attr', 'data-testid', 'StarOutlineIcon')
    cy.get("[data-test='Star4']").find('svg').should('have.attr', 'data-testid', 'StarOutlineIcon')
    cy.get("[data-test='Star5']").find('svg').should('have.attr', 'data-testid', 'StarOutlineIcon')

    // choose star 5
    cy.get("[data-test='Star5']").click()
      .find('svg').should('have.attr', 'data-testid', 'StarIcon')
    cy.get("[data-test='Star1']").find('svg').should('have.attr', 'data-testid', 'StarIcon')
    cy.get("[data-test='Star2']").find('svg').should('have.attr', 'data-testid', 'StarIcon')
    cy.get("[data-test='Star3']").find('svg').should('have.attr', 'data-testid', 'StarIcon')
    cy.get("[data-test='Star4']").find('svg').should('have.attr', 'data-testid', 'StarIcon')

    // choose zero stars
    cy.get("[data-test='Star1']").click().click()
      .find('svg').should('have.attr', 'data-testid', 'StarOutlineIcon')
    cy.get("[data-test='Star2']").find('svg').should('have.attr', 'data-testid', 'StarOutlineIcon')
    cy.get("[data-test='Star3']").find('svg').should('have.attr', 'data-testid', 'StarOutlineIcon')
    cy.get("[data-test='Star4']").find('svg').should('have.attr', 'data-testid', 'StarOutlineIcon')
    cy.get("[data-test='Star5']").find('svg').should('have.attr', 'data-testid', 'StarOutlineIcon')
  })

  it("Discard", () => {
    cy.get("[data-test='Discard']").click()
    cy.get("[role='dialog']").should("not.exist")
  })

  // // Creating a 1 star review
  // it("Create one star review", () => {
  //   cy.get("[data-test='LeaveAReview']").click()
  //   cy.get("[data-test='Star1']").click()
  // })

  it("Go to reviewed recipes in profile page", () => {
    cy.get("[data-test='Navbar']")
      .find("[data-test='Dropdown']")
      .click()
    cy.get("[data-test='Profile']").click()
    cy.get("[data-test='tabs']", {timeout: 60000})
      .find("[data-test='ReviewedRecipes']")
      .click()
  })

  it("Reviewed Recipes", () => {
    cy.get("[data-test='reviews']").should('have.attr', 'number')
    cy.get("[data-test='reviews']").then((curr) => {
      numReviewed = curr.attr('number')
      var i = 0;
      for (i; i < numReviewed; i++) {
        //TODO NEXT: Check that reviewed recipes are correctly displayed
      }
    })
  })

})