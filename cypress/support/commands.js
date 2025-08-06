Cypress.Commands.add("cadastrarNovoUsuarioEFazerLogin", ({ nome, email, senha, confirmarSenha }) => {
  cy.contains('button', 'Registrar').click()
  cy.get('input[type="name"]').type(nome, { force: true })
  cy.get('.card__register input[name="email"]').type(email, { force: true })
  cy.get('.card__register input[name="password"]').type(senha, { force: true })
  cy.get('input[name="passwordConfirmation"]').type(confirmarSenha, { force: true })

  cy.get('#toggleAddBalance').click({ force: true })
  cy.get('button').contains('Cadastrar').click({ force: true })
  cy.get('#btnCloseModal').click({ force: true })

  cy.get('input[name="email"]').eq(0).clear().type(email)
  cy.get('input[name="password"]').eq(0).clear().type(senha)
  cy.get('button').contains('Acessar').click()
})