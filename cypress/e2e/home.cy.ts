import { createApp } from 'vue'
import { createPinia, setActivePinia } from 'pinia'

describe('The Home Page', () => {
  // testSetup()
  const app = createApp({})

  const pinia = createPinia()
  app.use(pinia)
  // app.use(Toast, {
  //   position: POSITION.TOP_RIGHT,
  //   timeout: 1000,
  // })

  // app.use(router)
  // app.use(VCalendar, {})

  setActivePinia(pinia)

  it('successfully loads', () => {
    cy.visit('/')
    cy.get('h1').should('exist')
    cy.get('h1').contains('comment ça marche')
  })
})
