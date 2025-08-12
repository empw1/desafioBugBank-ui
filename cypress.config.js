const cucumber = require('cypress-cucumber-preprocessor').default
const { defineConfig } = require("cypress")
const allureWriter = require('@shelex/cypress-allure-plugin/writer')

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://bugbank.netlify.app/",
    specPattern: "cypress/e2e/**/*.feature",
    setupNodeEvents(on, config) {
      on('file:preprocessor', cucumber())
      
      require('@cypress/grep/src/plugin')(config)
      
      allureWriter(on, config)
      
      return config
    },
  },
  env: {
    allure: true,
    allureReuseAfterSpec: true,
    allureResultsPath: 'allure-results'
  }
})