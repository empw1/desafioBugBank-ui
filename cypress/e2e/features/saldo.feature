Feature: Saldo

Scenario: Transferência de valores entre contas
    Given que existe um usuário destinatário
    And que efetuo o cadastro e faço login
    And tenho saldo disponível na conta
    When acesso a funcionalidade de transferência
    And informo os dados da conta de destino e o valor da transferência
    And confirmo a transferência
    Then devo ver uma mensagem de sucesso
    And o valor deve ser descontado do meu saldo

Scenario: Saque de valores maiores que o saldo disponível
    Given que efetuo o cadastro e faço login
    And tenho saldo disponível na conta
    When acesso a funcionalidade de saque
    Then devo ver uma mensagem de funcionalidade em desenvolvimento