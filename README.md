# Desafio BugBank UI - Testes E2E com Cypress

Este projeto contém a automação de testes end-to-end (E2E) para o BugBank utilizando Cypress, Cucumber e integração contínua com GitHub Actions.

---

## 📦 Instalação das dependências

Certifique-se de ter o [Node.js](https://nodejs.org/) instalado.

```bash
npm install
```

---

## ▶️ Como executar os testes

### Executar todos os testes em modo headless (sem interface gráfica):

```bash
npx cypress run
```

### Executar todos os testes com interface gráfica:

```bash
npx cypress open
```

### Executar um teste específico:

```bash
npx cypress run --spec "cypress/e2e/features/saldo.feature"
```

### Executar por tag (se configurado):

```bash
npx cypress run --env grepTags=@minhaTag
```

---

## 📊 Como gerar e acessar o relatório de execução

### Gerar relatório localmente

Após rodar os testes, gere o relatório HTML com:

```bash
npx mochawesome-merge cypress/results/*.json > mochawesome.json
npx marge mochawesome.json -f report -o ./cypress/results
```

O arquivo `report.html` estará disponível em `cypress/results/report.html`.  
Abra esse arquivo no navegador para visualizar o relatório.

### Acessar relatório pelo GitHub Pages

Após a execução do pipeline no GitHub Actions, o relatório estará disponível em:

```
https://SEU_USUARIO.github.io/SEU_REPOSITORIO/report.html
```
(Substitua `SEU_USUARIO` e `SEU_REPOSITORIO` pelo seu usuário e nome do repositório.)

---

## 🏗️ Estrutura da arquitetura do projeto

```
cypress/
├── e2e/
│   ├── features/                # Arquivos .feature com cenários Gherkin
│   └── step_definitions/        # Step definitions (implementação dos passos)
├── support/
│   └── commands.js              # Comandos customizados do Cypress
├── results/                     # Relatórios de execução (gerados automaticamente)
├── fixtures/                    # Dados de teste (usuários, mocks, etc)
cypress.config.js                # Configuração do Cypress
.github/
└── workflows/
    └── cypress.yml              # Pipeline CI/CD do GitHub Actions
```

- **features/**: Cenários de teste em Gherkin.
- **step_definitions/**: Implementação dos passos dos cenários.
- **support/commands.js**: Comandos customizados para facilitar os testes.
- **results/**: Relatórios de execução dos testes.
- **.github/workflows/cypress.yml**: Pipeline automatizado para rodar testes e publicar relatórios.
- **cypress.config.js**: Configuração principal do Cypress.

---

## 💡 Observações

- O pipeline do GitHub Actions executa os testes automaticamente em Pull Requests, diariamente às 8h (BRT) e permite execução manual com parâmetros de tag e browser.
- Os relatórios são publicados automaticamente no GitHub Pages após cada execução do pipeline.
- Para rodar o pipeline manualmente, acesse a aba **Actions** no GitHub e clique em **Run workflow**.

---

Se tiver dúvidas ou sugestões, fique à vontade para abrir uma issue!
