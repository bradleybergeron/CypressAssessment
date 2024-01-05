describe('Cypress Assessment', () => {
    it('Verify Text and Weekly Downloads on Home Page', () => {
        cy.visit('https://www.cypress.io')

        //
        // Verify "Loved by..." label is present
        //
        cy.get('h2')
            .contains('Loved by OSS, trusted by Enterprise')
            .should('exist')

        //
        // Verify "5M+" label is present
        //
        cy.get('.grow')
            .contains('5M+')
            .should('exist')

        //
        // Verify "Weekly downloads" label is present
        //
        cy.get('.grow')
            .contains('Weekly downloads')
            .should('exist')
    })

    it('Verify Company -> About Cypress Link', () => {
        cy.visit('https://www.cypress.io')

        //
        // Navigate to About Cypress page
        //
        cy.get('[data-cy="dropdown-company"]')
            .trigger('mouseover')
        cy.get('span')
            .contains('About Cypress ')
            .should('exist')
            .click()

        //
        // Verify we are on "About us" page
        //
        cy.get('h1')
            .contains('About us')
            .should('exist')
        cy.url()
            .should('eq', 'https://www.cypress.io/about-us')
        cy.url()
            .should('match', /https:\/\/www.cypress.io\/about-us/)
    })

    it('Verify Installation Instructions', () => {
        //
        // Looks like the "Install" link only appears after logged in, and the automation is not logged in by default.
        // Testing using the ">_ npm install cypress" button, which looks to have the same functionality
        //
        cy.visit('https://www.cypress.io')

        //
        // Click "npm install cypress" button to display popup
        //
        cy.get("astro-island[uid=1XAX3B]")
            .find('button')
            .first()
            .should('exist')
            .click()

        //
        // Click button to copy text to clipboard on popup
        //
        cy.get('button[data-cy=modal-install-copy]')
            //.contains('npm install cypress')
            .should('exist')
            .click()

        //
        // Dismiss popup
        //
        cy.get('#modal-target')
            .find('button')
            .first()
            .click()

        //
        // Give focus back to the document so Verify clipboard contents is reliable
        //
        cy.get('a')
            .contains('Product')
            .should('exist')
            .focus()

        //
        // Verify clipboard contents
        //
        cy.window().then((win) => {
            win.navigator.clipboard.readText().then((text) => {
                assert.equal(
                    text,
                    "npm install cypress --save-dev"
                );
            });
        });
    })

    it('Verify Product -> Visual Reviews Link', () => {
        cy.visit('https://www.cypress.io')

        //
        // Go to Visual Reviews page
        //
        cy.get('[data-cy="dropdown-product"]')
            .trigger('mouseover')
        cy.get('span')
            .contains('Visual Reviews')
            .should('exist')
            .click()

        //
        // Verify we are on the correct page
        //
        cy.get('h2')
            .contains('Review and debug failures visually')
            .should('exist')
    })

    it.skip('Verify Test Analytics Green Circle', () => {
        cy.visit('https://www.cypress.io')

        //
        // Go to Smart Orchestration Page
        //
        cy.get('[data-cy="dropdown-product"]')
            .trigger('mouseover')
        cy.get('span')
            .contains('Smart Orchestration')
            .should('exist')
            .click()

        //
        // Go to Test Analytics section
        //
        cy.get('a')
            .contains('Test Analytics')
            .should('exist')
            .click()
    })
})