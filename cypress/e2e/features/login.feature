# language: pt

Funcionalidade: Login

Cenário: Logar com e-mail invalido
Quando um e-mail invalido "email_errado.com" é informado
Então o sistema apresentará uma mensagem de "Formato inválido" abaixo do campo de e-mail

Cenário: Logar com e-mail/senha nao cadastrados
Dado que informo um e-mail nao cadastrado "rick@test.com" e a senha "12345"
Quando clico em acessar
Então o sistema mostra mensagem de erro "Usuário ou senha inválido. Tente novamente ou verifique suas informações!"

Cenário: Logar com e-mail valido
Dado que efetuo um cadastro básico e faço login
Quando o usuário está logado no sistema
Então apresenta as informações corretas do usuário "Olá Rick,"