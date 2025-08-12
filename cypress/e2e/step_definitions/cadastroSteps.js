import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

beforeEach(() => {
  cy.visit('/')
})

// ---- Ações iniciais ----
Given('que clico em registrar', () => {
  cy.get('button').contains('Registrar').click()
})

// ---- Preenchimento de campos ----
When('informo um e-mail {string} e nome {string}', (email, nome) => {
  cy.get('.card__register input[name="email"]').type(email, { force: true })
  cy.get('input[type="name"]').type(nome, { force: true })
})

When('informo a senha {string} e a confirmação da senha {string}', (senha, confirmarSenha) => {
  cy.get('.card__register input[name="password"]').type(senha, { force: true })
  cy.get('input[name="passwordConfirmation"]').type(confirmarSenha, { force: true })
})

When('informo um e-mail {string}', (emailInvalido) => {
  cy.get('.card__register input[name="email"]').type(emailInvalido, { force: true })
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
    if (mensagemSucesso.includes('A conta')) {
      expect(texto).to.match(/^A conta \d{1,3}-\d{1,2} foi criada com sucesso$/)
    } else {
      expect(texto).to.include(mensagemSucesso)
    }
  })
})