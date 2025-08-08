import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

beforeEach(() => {
  cy.visit('/')
})

// ---- Ações iniciais ----
Given('que clico em registrar', () => {
  cy.get('button').contains('Registrar').click()
})

// ---- Preenchimento de campos ----
When('informo um e-mail {string}', (email) => {
  cy.get('.card__register input[name="email"]').type(email, { force: true })
})

When('informo o nome {string}', (nome) => {
  cy.get('input[type="name"]').type(nome, { force: true })
})

When('informo a senha {string}', (senha) => {
  cy.get('.card__register input[name="password"]').type(senha, { force: true })
})

When('confirmo a senha {string}', (confirmarSenha) => {
  cy.get('input[name="passwordConfirmation"]').type(confirmarSenha, { force: true })
})

// ---- Ações ----
When('clico em cadastrar', () => {
  cy.get('button').contains('Cadastrar').click({ force: true })
})

// --- Validações ---
Then('o sistema apresenta mensagem {string} abaixo do campo de e-mail', (mensagemErro) => {
  cy.get('.input__warging').should('have.text', mensagemErro)
})

Then('o sistema informa que {string}', (mensagemSucesso) => {
  cy.get('#modalText').invoke('text').then((texto) => {
    expect(texto).to.match(/^A conta \d{1,3}-\d{1,2} foi criada com sucesso$/)
  })
})