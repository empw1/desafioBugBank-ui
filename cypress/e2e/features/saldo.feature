# language: pt

@regressivo
Funcionalidade: Saldo

@smoke @transferencia
Cenário: Transferência de valores entre contas
Dado que existe um usuário destinatário
E que efetuo o cadastro e faço login
E tenho saldo disponível na conta
Quando acesso a funcionalidade de transferência
E informo os dados da conta de destino e o valor da transferência
E confirmo a transferência
Então devo ver uma mensagem de sucesso
E o valor deve ser descontado do meu saldo

@regressivo @saque
Cenário: Saque de valores maiores que o saldo disponível
Dado que efetuo o cadastro e faço login
E tenho saldo disponível na conta
Quando acesso a funcionalidade de saque
Então devo ver uma mensagem de funcionalidade em desenvolvimento

@regressivo @transferencia
Cenário: Transferência para uma conta inexistente
Dado que efetuo o cadastro e faço login
E tenho saldo disponível na conta
Quando acesso a funcionalidade de transferência
E informo os dados de uma conta inexistente e o valor da transferência
E confirmo a transferência
Então devo ver uma mensagem de erro informando que a conta não existe

@regressivo @saque
Cenário: Tentativa de saque sem saldo suficiente e verificação da mensagem de erro
Dado que efetuo o cadastro sem saldo e faço login
E tenho saldo zerado na conta
Quando acesso a funcionalidade de saque
Então devo ver uma mensagem de funcionalidade em desenvolvimento

@smoke @transferencia @saldo
Cenário: Verificação de saldo após transações
Dado que existe um usuário destinatário
E que efetuo o cadastro e faço login
E tenho saldo disponível na conta
Quando acesso a funcionalidade de transferência
E informo os dados da conta de destino e o valor da transferência
E confirmo a transferência
Então devo ver uma mensagem de sucesso
E o valor deve ser descontado do meu saldo
E o saldo final deve refletir corretamente a transação