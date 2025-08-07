import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

beforeEach(() => {
    cy.visit('/')
})

Given('que efetuo o cadastro e faço login', function () {
  cy.fixture('usuario').then((usuario) => {
    cy.novoCadastroELogin(usuario)
  })
})

Given('que informo um e-mail nao cadastrado {string} e a senha {string}', (emailNaoCadastrado, senha) => {
    cy.get('input[name="email"]').eq(0).type(emailNaoCadastrado, { force: true })
    cy.get('input[name="password"]').eq(0).type(senha, { force: true })
})

When('um e-mail invalido {string} é informado', (emailInvalido) => {
    cy.get('input[name="email"]').eq(0).type(emailInvalido, { force: true })
})

When('clico em acessar', () => {
    cy.get('button').contains('Acessar').click()
})

And('informo um e-mail valido {string} e informo a senha {string}', (emailValido, senha) => {
  cy.get('input[name="email"]').eq(0).should('be.visible').clear().type(emailValido)
  cy.get('input[name="password"]').eq(0).should('be.visible').clear().type(senha)
})

Then('o sistema apresentará uma mensagem de {string} abaixo do campo de e-mail',  (mensagemErro) => {
    cy.get('.input__warging')
    .should('have.text', mensagemErro)
})

Then('o sistema mostra mensagem de erro {string}', (mensagemErro) => {
    cy.get('#modalText').invoke('text').then((texto) => {
    expect(texto.replace(/\s+/g, ' ').trim()).to.include(mensagemErro)
  })
})

When('o usuário está logado no sistema', () => {
  cy.url().should('include', '/home')
  cy.get('#textName').should('be.visible')
})

Then('apresenta as informações corretas do usuário {string}', (nomeUsuario) => {
  cy.get('#textName').should('contain.text', nomeUsuario)
})
