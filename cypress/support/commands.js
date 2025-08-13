Cypress.Commands.add("novoCadastroELogin", ({ nome, email, senha, confirmarSenha }) => {
  cy.contains('button', 'Registrar').click()
  cy.get('input[name="email"]').eq(1).safeType(email)
  cy.get('input[type="name"]').safeType(nome)
  cy.get('.card__register input[name="password"]').safeType(senha)
  cy.get('input[name="passwordConfirmation"]').safeType(confirmarSenha)
  cy.get('#toggleAddBalance').click({ force: true })
  cy.get('button').contains('Cadastrar').click({ force: true })
  cy.get('#btnCloseModal').click()

  cy.get('input[name="email"]').eq(0).safeType(email)
  cy.get('input[name="password"]').eq(0).safeType(senha)
  cy.get('button').contains('Acessar').click()
})

Cypress.Commands.add("cadastrarUsuario", ({ nome, email, senha, confirmarSenha, saldo = false }) => {
  cy.contains('button', 'Registrar').click()
  cy.get('input[type="name"]').safeType(nome)
  cy.get('.card__register input[name="email"]').safeType(email)
  cy.get('.card__register input[name="password"]').safeType(senha)
  cy.get('input[name="passwordConfirmation"]').safeType(confirmarSenha)

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

Cypress.Commands.add("cadastrarUsuarioSemSaldo", ({ nome, email, senha, confirmarSenha }) => {
  cy.contains('button', 'Registrar').click()
  cy.get('input[type="name"]').safeType(nome)
  cy.get('.card__register input[name="email"]').safeType(email)
  cy.get('.card__register input[name="password"]').safeType(senha)
  cy.get('input[name="passwordConfirmation"]').safeType(confirmarSenha)

  cy.get('#toggleAddBalance').then($toggle => {
    const isChecked = $toggle.prop('checked')
    if (isChecked) {
      cy.wrap($toggle).click({ force: true })
    }
    cy.get('#toggleAddBalance').should('not.be.checked')
  })

  cy.get('button').contains('Cadastrar').click({ force: true })
  cy.get('#btnCloseModal').click({ force: true })
})

Cypress.Commands.add('safeType', { prevSubject: 'element' }, (subject, text) => {
  cy.wrap(subject).clear({ force: true }).type(text, { force: true })
})