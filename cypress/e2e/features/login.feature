Feature: Login

    Scenario: Logar com e-mail invalido
        When um e-mail invalido "email_errado.com" é informado
        Then o sistema apresentará uma mensagem de "Formato inválido" abaixo do campo de e-mail

    Scenario: Logar com e-mail/senha nao cadastrados
        Given que informo um e-mail nao cadastrado "rick@test.com" e a senha "12345"
        When clico em acessar
        Then o sistema mostra mensagem de erro "Usuário ou senha inválido. Tente novamente ou verifique suas informações!"

    Scenario: Logar com e-mail valido
        Given que efetuo um cadastro básico e faço login
        When o usuário está logado no sistema
        Then apresenta as informações corretas do usuário "Olá Rick,"