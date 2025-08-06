import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

beforeEach(() => {
  cy.visit('/')
})

Given('clico em registrar', () => {
  cy.get('button').contains('Registrar').click()
})

When('informo um e-mail invalido {string}', (emailInvalido) => {
  cy.get('.card__register input[name="email"]').type(emailInvalido, { force: true })
})

Then('o sistema apresenta mensagem {string} abaixo do campo de e-mail', (mensagemErro) => {
  cy.get('.input__warging')
    .should('have.text', mensagemErro)
})

When('informo um e-mail valido {string}', (emailValido) => {
  cy.get('.card__register input[name="email"]').type(emailValido, { force: true })
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

When('clico em cadastrar', () => {
  cy.get('button').contains('Cadastrar').click({ force: true })
})

Then('o sistema informa que {string}', (mensagemSucesso) => {
  const inicioEsperado = mensagemSucesso.split(' ')[0] + ' ' + mensagemSucesso.split(' ')[1]
  cy.get('#modalText').invoke('text').then((texto) => {
    expect(texto.startsWith(inicioEsperado)).to.be.true
    expect(texto).to.match(/^A conta \d{1,3}-\d{1,2} foi criada com sucesso$/)
  });
})