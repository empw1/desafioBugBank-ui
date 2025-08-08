# language: pt

Funcionalidade: Cadastro

Cenário: Cadastrar usuario com e-mail invalido
Dado que clico em registrar
Quando informo um e-mail "email_errado.com"
Então o sistema apresenta mensagem "Formato inválido" abaixo do campo de e-mail

Cenário: Cadastrar usuario com e-mail válido
Dado que clico em registrar
E informo um e-mail "test@test.com"
E informo o nome "teste rick"
E informo a senha "12345"
E confirmo a senha "12345"
Quando clico em cadastrar
Então o sistema informa que "A conta 762-4 foi criada com sucesso"