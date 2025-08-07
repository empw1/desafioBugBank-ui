import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

beforeEach(() => {
  cy.visit('/')
})

// ---- Ações iniciais ----
Given('que efetuo um cadastro básico e faço login', function () {
  cy.fixture('usuario').then((usuarios) => {
    const usuarioLogin = {
      ...usuarios.usuarioBase,
      email: `login${Date.now()}@teste.com`
    }
    cy.novoCadastroELogin(usuarioLogin)
  })
})

When('clico em acessar', () => {
  cy.get('button').contains('Acessar').click()
})

// ---- Preenchimento de campos ----
Given('que informo um e-mail nao cadastrado {string} e a senha {string}', (emailNaoCadastrado, senha) => {
  cy.get('input[name="email"]').eq(0).should('be.visible').clear().type(emailNaoCadastrado)
  cy.get('input[name="password"]').eq(0).should('be.visible').clear().type(senha)
})

When('um e-mail invalido {string} é informado', (emailInvalido) => {
  cy.get('input[name="email"]').eq(0).should('be.visible').clear().type(emailInvalido)
})

And('informo um e-mail valido {string} e informo a senha {string}', (emailValido, senha) => {
  cy.get('input[name="email"]').eq(0).should('be.visible').clear().type(emailValido)
  cy.get('input[name="password"]').eq(0).should('be.visible').clear().type(senha)
})

// --- Validações ---
Then('o sistema apresentará uma mensagem de {string} abaixo do campo de e-mail', (mensagemErro) => {
  cy.get('.input__warging').should('have.text', mensagemErro)
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