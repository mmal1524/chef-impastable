import React from "react"

/* Test user stories 5, 6, and 7 */

describe('Reviews', () => {

  var numReviews;
  var avgRating;
  var numReviewed;
  var recipeName: string;

  // Logs in
  it("Logging in", () => {
    cy.visit('/')
    cy.get("[data-test='UsernameField']").type("unitTestReviews")
    cy.get("[data-test='PasswordField']").type("Password1!")
    cy.get("[data-test='LoginButton']").click()
  })

  // Clicks on a recipe
  it("Clicking a recipe", () => {
    cy.get("[data-test='Recipe-4']", {timeout: 60000}).click()
  })

  // Checks that the number of reviews is displayed and average star rating and stores them
  it("Number of reviews and average rating", () => {
    cy.get("[data-test='RecipeTitle']", {timeout: 60000}).then(($recipetitle) => {
      recipeName = $recipetitle.text()
    })
    cy.get("[data-test='NumReviews']").then(($reviews) => {
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
        avgRating = (+(ratingstxt[2])).toPrecision(3)
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

  // close popup
  it("Discard", () => {
    cy.get("[data-test='Discard']").click()
    cy.get("[role='dialog']").should("not.exist")
  })

  // Creating a 1 star review
  it("Create one star review", () => {
    cy.get("[data-test='LeaveAReview']").click()
    cy.get("[role='dialog']").find("[data-test='Star1']").click()
    cy.get("[role='dialog']").find("[data-test='description']").type("One star review testing")
    cy.get("[role='dialog']").find("[data-test='Post']").click()
  })

  // Determining if number of reviews and average rating was updated
  it("Number of reviews and average rating updated", () => {
    cy.get("[role='dialog']", {timeout: 60000}).should("not.exist")
    // calculating updated numReviews and avgRating
    numReviews++
    if (avgRating == null) {
      avgRating = (1).toFixed(2)
    } else {
      avgRating = (((avgRating * (numReviews - 1)) + 1) / numReviews).toFixed(2)
    }
    var max = ((+avgRating) + 0.01).toFixed(2)
    var min = (avgRating - 0.01).toFixed(2)

    // comparing
    cy.get("[data-test='NumReviews']").then(($reviews) => {
      var header = $reviews.text().split(' ')
      expect(header[0]).to.eq(`${numReviews}`)
      expect(header[1]).to.eq("Reviews")
    })
    cy.get("[data-test='AverageRating']").then(($rating) => {
      var ratingstxt = $rating.text().split(' ')
      expect(ratingstxt[0]).to.eq("Average")
      expect(ratingstxt[1]).to.eq("Rating:")
      expect(ratingstxt[2]).to.be.oneOf([min, avgRating, max])
      expect(ratingstxt[3]).to.eq("stars")
    })
  })

  // Determining if review was displayed at bottom of recipe page
  it("One star review displayed", () => {
    cy.get("[data-test='Reviews']").should("have.attr", "number", numReviews)

    cy.get(`[data-test='Review-${numReviews - 1}']`).find("[data-test='Stars']").should("exist")
    cy.get(`[data-test='Review-${numReviews - 1}']`).find("[data-test='author']").then(($author) => {
      expect($author.text()).to.eq("author: unitTestReviews")
    })
    cy.get(`[data-test='Review-${numReviews - 1}']`).find("[data-test='description']").then(($description) => {
      expect($description.text()).to.eq("One star review testing")
    })
  })

  // Creating a 3 star review
  it("Create three star review", () => {
    cy.get("[data-test='LeaveAReview']").click()
    cy.get("[role='dialog']").find("[data-test='Star3']").click()
    cy.get("[role='dialog']").find("[data-test='description']").type("Three star review testing")
    cy.get("[role='dialog']").find("[data-test='Post']").click()
  })

  // Determining if number of reviews and average rating was updated
  it("Number of reviews and average rating updated", () => {
    cy.get("[role='dialog']", {timeout: 60000}).should("not.exist")
    // calculating updated numReviews and avgRating
    numReviews++
    if (avgRating == null) {
      avgRating = (1).toFixed(2)
    } else {
      avgRating = (((avgRating * (numReviews - 1)) + 3) / numReviews).toFixed(2)
    }
    var max = ((+avgRating) + 0.01).toFixed(2)
    var min = (avgRating - 0.01).toFixed(2)

    // comparing
    cy.get("[data-test='NumReviews']").then(($reviews) => {
      var header = $reviews.text().split(' ')
      expect(header[0]).to.eq(`${numReviews}`)
      expect(header[1]).to.eq("Reviews")
    })
    cy.get("[data-test='AverageRating']").then(($rating) => {
      var ratingstxt = $rating.text().split(' ')
      expect(ratingstxt[0]).to.eq("Average")
      expect(ratingstxt[1]).to.eq("Rating:")
      expect(ratingstxt[2]).to.be.oneOf([min, avgRating, max])
      expect(ratingstxt[3]).to.eq("stars")
    })
  })

  // Determining if review was displayed at bottom of recipe page
  it("Three star review displayed", () => {
    cy.get("[data-test='Reviews']").should("have.attr", "number", numReviews)

    cy.get(`[data-test='Review-${numReviews - 1}']`).find("[data-test='Stars']").should("exist")
    cy.get(`[data-test='Review-${numReviews - 1}']`).find("[data-test='author']").then(($author) => {
      expect($author.text()).to.eq("author: unitTestReviews")
    })
    cy.get(`[data-test='Review-${numReviews - 1}']`).find("[data-test='description']").then(($description) => {
      expect($description.text()).to.eq("Three star review testing")
    })
  })

  // Creating a 4 star review
  it("Create four star review", () => {
    cy.get("[data-test='LeaveAReview']").click()
    cy.get("[role='dialog']").find("[data-test='Star4']").click()
    cy.get("[role='dialog']").find("[data-test='description']").type("Four star review testing")
    cy.get("[role='dialog']").find("[data-test='Post']").click()
  })

  // Determining if number of reviews and average rating was updated
  it("Number of reviews and average rating updated", () => {
    cy.get("[role='dialog']", {timeout: 60000}).should("not.exist")
    // calculating updated numReviews and avgRating
    numReviews++
    if (avgRating == null) {
      avgRating = (1).toFixed(2)
    } else {
      avgRating = (((avgRating * (numReviews - 1)) + 4) / numReviews).toFixed(2)
    }
    var max = ((+avgRating) + 0.01).toFixed(2)
    var min = (avgRating - 0.01).toFixed(2)

    // comparing
    cy.get("[data-test='NumReviews']").then(($reviews) => {
      var header = $reviews.text().split(' ')
      expect(header[0]).to.eq(`${numReviews}`)
      expect(header[1]).to.eq("Reviews")
    })
    cy.get("[data-test='AverageRating']").then(($rating) => {
      var ratingstxt = $rating.text().split(' ')
      expect(ratingstxt[0]).to.eq("Average")
      expect(ratingstxt[1]).to.eq("Rating:")
      expect(ratingstxt[2]).to.be.oneOf([min, avgRating, max])
      expect(ratingstxt[3]).to.eq("stars")
    })
  })

  // Determining if review was displayed at bottom of recipe page
  it("Four star review displayed", () => {
    cy.get("[data-test='Reviews']").should("have.attr", "number", numReviews)

    cy.get(`[data-test='Review-${numReviews - 1}']`).find("[data-test='Stars']").should("exist")
    cy.get(`[data-test='Review-${numReviews - 1}']`).find("[data-test='author']").then(($author) => {
      expect($author.text()).to.eq("author: unitTestReviews")
    })
    cy.get(`[data-test='Review-${numReviews - 1}']`).find("[data-test='description']").then(($description) => {
      expect($description.text()).to.eq("Four star review testing")
    })
  })

  // Going to profile page
  it("Go to reviewed recipes in profile page", () => {
    cy.get("[data-test='Navbar']")
      .find("[data-test='Dropdown']")
      .click()
    cy.get("[data-test='Profile']").click()
    cy.get("[data-test='tabs']", {timeout: 60000})
      .find("[data-test='ReviewedRecipes']")
      .click()
  })

  // User's reviewed recipes are displayed
  it("Reviewed Recipes displayed", () => {
    cy.get("[data-test='reviews']").should('have.attr', 'number')
    cy.get("[data-test='reviews']").then((curr) => {
      numReviewed = curr.attr('number')

      if (numReviewed == 0) {
        cy.get("[data-test='reviews']").then(($reviews) => {
          expect($reviews.text()).to.eq('No reviews, create one now!')
        })
      }
      var i = 0;
      for (i; i < numReviewed; i++) {
        cy.get(`[data-test='Review-${i}']`).find("[data-test='recipeButton']").should("exist")
        cy.get(`[data-test='Review-${i}']`).find("[data-test='recipeName']").should("exist")
        cy.get(`[data-test='Review-${i}']`).find("[data-test='Stars']").should("exist")
        cy.get(`[data-test='Review-${i}']`).find("[data-test='description']").should("exist")
      }
    })
  })

  // Check that the last 3 recipes are the created ones from testing
  it("New reviews are displayed", () => {
    // One star review
    cy.get(`[data-test='Review-${numReviewed - 3}']`).find("[data-test='recipeButton']").should("exist")
    cy.get(`[data-test='Review-${numReviewed - 3}']`).find("[data-test='recipeName']").should("contain", recipeName)
    cy.get(`[data-test='Review-${numReviewed - 3}']`).find("[data-test='Stars']").should("exist")
    cy.get(`[data-test='Review-${numReviewed - 3}']`).find("[data-test='description']").should("contain", "One star review testing")

    // Three star review
    cy.get(`[data-test='Review-${numReviewed - 2}']`).find("[data-test='recipeButton']").should("exist")
    cy.get(`[data-test='Review-${numReviewed - 2}']`).find("[data-test='recipeName']").should("contain", recipeName)
    cy.get(`[data-test='Review-${numReviewed - 2}']`).find("[data-test='Stars']").should("exist")
    cy.get(`[data-test='Review-${numReviewed - 2}']`).find("[data-test='description']").should("contain", "Three star review testing")

    // Four star review
    cy.get(`[data-test='Review-${numReviewed - 1}']`).find("[data-test='recipeButton']").should("exist")
    cy.get(`[data-test='Review-${numReviewed - 1}']`).find("[data-test='recipeName']").should("contain", recipeName)
    cy.get(`[data-test='Review-${numReviewed - 1}']`).find("[data-test='Stars']").should("exist")
    cy.get(`[data-test='Review-${numReviewed - 1}']`).find("[data-test='description']").should("contain", "Four star review testing")

  })

  // Check that clicking on a review goes to recipe page
  it("Click review", () => {
    cy.get(`[data-test='Review-${numReviewed - 1}']`).find("[data-test='recipeButton']").click()
    cy.get("[data-test='RecipeTitle']", {timeout: 60000}).should("contain", recipeName)
  })

})