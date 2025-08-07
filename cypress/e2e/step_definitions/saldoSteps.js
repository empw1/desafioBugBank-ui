import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps'

//---- Cadastro ----
Given('que existe um usuário destinatário', () => {
    cy.fixture('usuario').then((usuarios) => {
        const usuarioDestino = {
            ...usuarios.usuarioDestino,
            email: `destino${Date.now()}@teste.com`
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
})

Given('que efetuo o cadastro sem saldo e faço login', () => {
    cy.fixture('usuario').then((usuarios) => {
        const usuario = {
            ...usuarios.usuarioSemSaldo,
            email: `semSaldo${Date.now()}@teste.com`
        }
        cy.visit('/')
        cy.cadastrarUsuarioSemSaldo(usuario)
        cy.get('input[name="email"]').eq(0).clear({ force: true }).type(usuario.email)
        cy.get('input[name="password"]').eq(0).clear({ force: true }).type(usuario.senha)
        cy.get('button').contains('Acessar').click()
    })
})

Given('que efetuo o cadastro e faço login', () => {
    cy.fixture('usuario').then((usuarios) => {
        const usuarioRemetente = {
            ...usuarios.usuarioRemetente,
            email: `remetente${Date.now()}@teste.com`
        }
        cy.visit('/')
        cy.novoCadastroELogin(usuarioRemetente)
    })
})

// ---- Transferência ----
When('acesso a funcionalidade de transferência', () => {
    cy.get('#btn-TRANSFERÊNCIA').click()
})

And('informo os dados da conta de destino e o valor da transferência', () => {
    const contaDestino = Cypress.env('contaDestino')
    const digitoDestino = Cypress.env('digitoDestino')
    cy.get('input[name="accountNumber"]').type(contaDestino)
    cy.get('input[name="digit"]').type(digitoDestino)
    cy.get('input[name="transferValue"]').type('100', { force: true })
})

And('informo os dados de uma conta inexistente e o valor da transferência', () => {
    cy.get('input[name="accountNumber"]').type('999999')
    cy.get('input[name="digit"]').type('9')
    cy.get('input[name="transferValue"]').type('100', { force: true })
})

And('confirmo a transferência', () => {
    cy.get('button').contains('Transferir').click()
})

Then('devo ver uma mensagem de erro informando que a conta não existe', () => {
    cy.get('#modalText').should('contain.text', 'Conta inválida ou inexistente')
})

And('o valor deve ser descontado do meu saldo', () => {
    cy.get('#btnCloseModal').click({ force: true })
    cy.get('#btnBack').click({ force: true })
    cy.get('#textBalance').invoke('text').then((texto) => {
        const textoNormalizado = texto.replace(/\s+/g, ' ').trim()
        expect(textoNormalizado).to.include('Saldo em conta R$ 900,00')
    })
})

And('o saldo final deve refletir corretamente a transação', () => {
    cy.get('#textBalance').invoke('text').then((texto) => {
        const textoNormalizado = texto.replace(/\s+/g, ' ').trim()
        expect(textoNormalizado).to.include('Saldo em conta R$ 900,00')
        cy.get('#btn-EXTRATO').click()
        cy.get('#textBalanceAvailable').should($el => {
            const extratoNormalizado = $el.text().replace(/\s+/g, ' ').trim()
            expect(extratoNormalizado).to.equal('R$ 900,00')
        })
    })
})

Then('devo ver uma mensagem de sucesso', () => {
    cy.get('#modalText').should('contain.text', 'Transferencia realizada com sucesso')
})

// ---- Saque ---
When('acesso a funcionalidade de saque', () => {
    cy.get('#btn-SAQUE').click()
})

Then('devo ver uma mensagem de funcionalidade em desenvolvimento', () => {
    cy.get('#modalText').should('contain.text', 'Funcionalidade em desenvolvimento')
})

// ---- Saldo ----
And('tenho saldo disponível na conta', () => {
    cy.get('#textBalance').should($el => {
        const texto = $el.text().replace(/\s+/g, ' ').trim()
        expect(texto).to.include('Saldo em conta R$ 1.000,00')
    })
})

And('tenho saldo zerado na conta', () => {
    cy.get('#textBalance').should($el => {
        const texto = $el.text().replace(/\s+/g, ' ').trim()
        expect(texto).to.include('Saldo em conta R$ 0,00')
    })
})