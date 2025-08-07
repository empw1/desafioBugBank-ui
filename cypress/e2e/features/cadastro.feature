Feature: Cadastro

    Scenario: Cadastrar usuario com e-mail invalido
        Given clico em registrar
        When informo um e-mail invalido "email_errado.com"
        Then o sistema apresenta mensagem "Formato inválido" abaixo do campo de e-mail

    Scenario: Cadastrar usuario com e-mail válido
        Given clico em registrar
        And informo um e-mail valido "test@test.com"
        And informo o nome "teste rick"
        And informo a senha "12345"
        And confirmo a senha "12345"
        When clico em cadastrar
        Then o sistema informa que "A conta 762-4 foi criada com sucesso"