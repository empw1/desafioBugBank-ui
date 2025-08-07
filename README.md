Desafio BugBank UI - Testes E2E com Cypress

📦 Instalação das dependências
Certifique-se de ter o Node.js instalado.

▶️ Como executar os testes
Executar todos os testes em modo headless (sem interface gráfica):
Executar todos os testes com interface gráfica:
Executar um teste específico:
Executar por tag (se configurado):

📊 Como gerar e acessar o relatório de execução
Gerar relatório localmente
Após rodar os testes, gere o relatório HTML com:

O arquivo report.html estará disponível em cypress/results/report.html.

Abra esse arquivo no navegador para visualizar o relatório.

Acessar relatório pelo GitHub Pages
Após a execução do pipeline no GitHub Actions, o relatório estará disponível em:

(Substitua SEU_USUARIO e SEU_REPOSITORIO pelo seu usuário e nome do repositório.)

🏗️ Estrutura da arquitetura do projeto
features/: Contém os cenários de teste escritos em Gherkin.
step_definitions/: Implementação dos passos dos cenários.
support/commands.js: Comandos customizados para facilitar os testes.
results/: Relatórios de execução dos testes.
cypress.yml: Pipeline automatizado para rodar testes e publicar relatórios.
cypress.config.js: Configuração principal do Cypress.

💡 Observações
O pipeline do GitHub Actions executa os testes automaticamente em Pull Requests, diariamente às 8h (BRT) e permite execução manual com parâmetros de tag e browser.
Os relatórios são publicados automaticamente no GitHub Pages após cada execução do pipeline.