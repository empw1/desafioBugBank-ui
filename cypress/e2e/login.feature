Feature: Login usuario

Scenario: Logar com e-mail invalido
When um e-mail invalido "email_errado.com" é informado
Then o sistema apresentará uma mensagem de "Formato inválido" abaixo do campo de e-mail

Scenario: Logar com e-mail/senha nao cadastrados
And informo um e-mail nao cadastrado "qaqa@test.com"
And informo a senha "12345"
When clico em acessar 
Then o sistema informa que "Usuário ou senha inválido. Tente novamente ou verifique suas informações!"

Scenario: Logar com e-mail valido
And informo um e-mail valido "test@test.com"
And informo a senha "12345"
When clico em acessar 
Then o sistema permite o acesso
And apresenta o nome de usuario corretamente
And apresenta a conta correta