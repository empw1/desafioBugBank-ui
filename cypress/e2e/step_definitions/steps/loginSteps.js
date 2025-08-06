import { When, And, Then } from 'cypress-cucumber-preprocessor/steps'

beforeEach(() => {
  cy.visit('/')
})

When('um e-mail invalido {string} é informado', (emailInvalido) => {
  cy.get('input[name="email"]').eq(0).type(emailInvalido, { force: true })
})

Then('o sistema apresentará uma mensagem de {string} abaixo do campo de e-mail',  (mensagemErro) => {
  cy.get('.input__warging')
    .should('have.text', 'Formato inválido')
})