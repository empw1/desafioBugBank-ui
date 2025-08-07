import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps'

Given('que existe um usuário destinatário', () => {
  const usuarioDestino = {
    nome: 'Usuário Destino',
    email: `destino${Date.now()}@teste.com`,
    senha: '12345',
    confirmarSenha: '12345'
  }
  cy.visit('/')
  cy.cadastrarUsuario(usuarioDestino)
  cy.get('#modalText').should('be.visible').invoke('text').then((texto) => {
    const match = texto.match(/A conta (\d+)-(\d+) foi criada/)
    expect(match).to.not.be.null
    Cypress.env('contaDestino', match[1])
    Cypress.env('digitoDestino', match[2])
    cy.get('#btnCloseModal').click()
  })
})

Given('que efetuo o cadastro e faço login', () => {
  const usuarioRemetente = {
    nome: 'Usuário Remetente',
    email: `remetente${Date.now()}@teste.com`,
    senha: '12345',
    confirmarSenha: '12345'
  }
  cy.visit('/')
  cy.novoCadastroELogin(usuarioRemetente)
})

And('tenho saldo disponível na conta', () => {
  cy.get('#textBalance').should($el => {
    const texto = $el.text().replace(/\s+/g, ' ').trim()
    expect(texto).to.include('Saldo em conta R$ 1.000,00')
  })
})

When('acesso a funcionalidade de transferência', () => {
  cy.get('#btn-TRANSFERÊNCIA').click()
})

And('informo os dados da conta de destino e o valor da transferência', () => {
  const contaDestino = Cypress.env('contaDestino')
  const digitoDestino = Cypress.env('digitoDestino')
  cy.get('input[name="accountNumber"]').type(contaDestino)
  cy.get('input[name="digit"]').type(digitoDestino)
  cy.get('input[name="transferValue"]').type('100', { force: true})
})

And('confirmo a transferência', () => {
  cy.get('button').contains('Transferir').click()
})

Then('devo ver uma mensagem de sucesso', () => {
  cy.get('#modalText').should('contain.text', 'Transferencia realizada com sucesso')
})

And('o valor deve ser descontado do meu saldo', () => {
  cy.get('#btnCloseModal').click({ force: true })
  cy.get('#btnBack').click({ force: true })
  cy.get('#textBalance').invoke('text').then((texto) => {
    const textoNormalizado = texto.replace(/\s+/g, ' ').trim()
    expect(textoNormalizado).to.include('Saldo em conta R$ 900,00')
  })
})

Given('que efetuo o cadastro e faço login', () => {
  const usuario = {
    nome: 'Usuário Teste',
    email: `teste${Date.now()}@teste.com`,
    senha: '12345',
    confirmarSenha: '12345'
  }
  cy.visit('/')
  cy.novoCadastroELogin(usuario)
})

And('tenho saldo disponível na conta', () => {
  cy.get('#textBalance').should($el => {
    const texto = $el.text().replace(/\s+/g, ' ').trim()
    expect(texto).to.include('Saldo em conta R$ 1.000,00')
  })
})

When('acesso a funcionalidade de saque', () => {
  cy.get('#btn-SAQUE').click()
})

Then('devo ver uma mensagem de funcionalidade em desenvolvimento', () => {
  cy.get('#modalText').should('contain.text', 'Funcionalidade em desenvolvimento')
})