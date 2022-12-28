import { createApp } from 'vue'
import { createPinia, setActivePinia } from 'pinia'

describe('The Home Page', () => {
  // testSetup()
  beforeEach(() => {
    const app = createApp({})

    const pinia = createPinia()
    app.use(pinia)

    setActivePinia(pinia)
    cy.visit('/register')
  })

  it('successfully loads', () => {
    cy.get('h1').should('exist')
    cy.get('h1').contains('Bienvenue sur')
    cy.get('button[type=submit]').contains('S\'inscrire')
    cy.get('button[type=submit]').should('be.disabled')
    cy.get('a').contains('J\'ai déjà un compte')
  })

  it('input should render correct data', () => {
    cy.get('button').should('be.disabled')

    cy.get('#email').should('exist')
    cy.get('#password').should('exist')
    cy.get('#firstName').should('exist')
    cy.get('#lastName').should('exist')
    cy.get('#companyName').should('exist')

    cy.get('#email').type('argus@poudlard.com')
    cy.get('#password').type('password')
    cy.get('#firstName').type('Argus')
    cy.get('#lastName').type('Rusard')
    cy.get('#companyName').type('Poudlard')

    cy.get('#email').should('have.value', 'argus@poudlard.com')
    cy.get('#password').should('have.value', 'password')
    cy.get('#firstName').should('have.value', 'Argus')
    cy.get('#lastName').should('have.value', 'Rusard')
    cy.get('#companyName').should('have.value', 'Poudlard')

    cy.get('button[type=submit]').should('be.enabled')

    cy.get('button[type=submit]').click()

    cy.get('#cookies-modal').should('exist')
    cy.get('#cookies-modal').within(() => {
      cy.get('button').should('be.enabled')
      cy.get('button').click()
    })
    cy.get('#user-avatar').should('exist')
  })
})
