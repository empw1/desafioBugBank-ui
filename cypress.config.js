const cucumber = require('cypress-cucumber-preprocessor').default
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000/',
    setupNodeEvents(on, config) {
      on('file:preprocessor', cucumber())
      return config
    },
    specPattern: "cypress/e2e/**/*.feature",
    stepDefinitions: "cypress/e2e/step_definitions/**/*.js"
  }
})