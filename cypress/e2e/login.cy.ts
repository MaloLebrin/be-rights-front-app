import { createApp } from 'vue'
import { createPinia, setActivePinia } from 'pinia'

describe('The Home Page', () => {
  // testSetup()
  beforeEach(() => {
    const app = createApp({})

    const pinia = createPinia()
    app.use(pinia)

    setActivePinia(pinia)
    cy.visit('/login')
  })

  it('successfully loads', () => {
    cy.get('h1').should('exist')
    cy.get('h1').contains('Connectez vous sur')
    cy.get('button').contains('Se Connecter')
    cy.get('button').should('be.disabled')
    cy.get('a').contains('Mot de passe oublié')
    cy.get('a').contains('S\'inscrire')
  })

  it('input should render correct data', () => {
    cy.get('button').should('be.disabled')

    cy.get('#email').should('exist')
    cy.get('#password').should('exist')

    cy.get('#email').type('albus@poudlard.com')
    cy.get('#password').type('password')

    cy.get('#email').should('have.value', 'albus@poudlard.com')
    cy.get('#password').should('have.value', 'password')

    cy.get('button').should('be.enabled')

    cy.get('button[type=submit]').click()

    cy.get('#cookies-modal').should('exist')
    cy.get('#cookies-modal').within(() => {
      cy.get('button').should('be.enabled')
      cy.get('button').click()
    })
    cy.get('#user-avatar').should('exist')
  })
})
