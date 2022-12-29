import { createApp } from 'vue'
import { createPinia, setActivePinia } from 'pinia'
import { nanoid } from 'nanoid'

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

    const newUser = {
      password: 'password',
      email: `argus${nanoid()}@poudlard.com`,
      firstName: 'Argus',
      lastName: 'Rusard',
      companyName: 'Poudlard',
    }

    cy.get('#email').should('exist')
    cy.get('#password').should('exist')
    cy.get('#firstName').should('exist')
    cy.get('#lastName').should('exist')
    cy.get('#companyName').should('exist')

    cy.get('#email').type(newUser.email)
    cy.get('#password').type(newUser.password)
    cy.get('#firstName').type(newUser.firstName)
    cy.get('#lastName').type(newUser.lastName)
    cy.get('#companyName').type(newUser.companyName)

    cy.get('#email').should('have.value', newUser.email)
    cy.get('#password').should('have.value', newUser.password)
    cy.get('#firstName').should('have.value', newUser.firstName)
    cy.get('#lastName').should('have.value', newUser.lastName)
    cy.get('#companyName').should('have.value', newUser.companyName)

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
