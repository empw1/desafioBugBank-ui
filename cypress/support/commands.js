Cypress.Commands.add("novoCadastroELogin", ({ nome, email, senha, confirmarSenha }) => {
  cy.contains('button', 'Registrar').click()
  cy.get('input[type="name"]').clear({ force: true }).type(nome, { force: true })
  cy.get('.card__register input[name="email"]').clear({ force: true }).type(email, { force: true })
  cy.get('.card__register input[name="password"]').clear({ force: true }).type(senha, { force: true })
  cy.get('input[name="passwordConfirmation"]').clear({ force: true }).type(confirmarSenha, { force: true })
  cy.get('#toggleAddBalance').click({ force: true })
  cy.get('button').contains('Cadastrar').click({ force: true })
  cy.get('#btnCloseModal').click({ force: true })

  cy.get('input[name="email"]').eq(0).clear({ force: true }).type(email, { force: true })
  cy.get('input[name="password"]').eq(0).clear({ force: true }).type(senha, { force: true })
  cy.get('button').contains('Acessar').click()
})

Cypress.Commands.add("cadastrarUsuario", ({ nome, email, senha, confirmarSenha, saldo = false }) => {
  cy.contains('button', 'Registrar').click()
  cy.get('input[type="name"]').clear({ force: true }).type(nome, { force: true })
  cy.get('.card__register input[name="email"]').clear({ force: true }).type(email, { force: true })
  cy.get('.card__register input[name="password"]').clear({ force: true }).type(senha, { force: true })
  cy.get('input[name="passwordConfirmation"]').clear({ force: true }).type(confirmarSenha, { force: true })

  cy.get('#toggleAddBalance').then($toggle => {
    const isChecked = $toggle.prop('checked')
    if (saldo && !isChecked) {
      cy.wrap($toggle).click({ force: true })
      cy.get('#toggleAddBalance').should('be.checked')
    }
    if (!saldo && isChecked) {
      cy.wrap($toggle).click({ force: true })
      cy.get('#toggleAddBalance').should('not.be.checked')
    }
    if (saldo) {
      cy.get('#toggleAddBalance').should('be.checked')
    } else {
      cy.get('#toggleAddBalance').should('not.be.checked')
    }
  })

  cy.get('button').contains('Cadastrar').click({ force: true })
})