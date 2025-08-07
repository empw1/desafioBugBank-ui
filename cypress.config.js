const cucumber = require('cypress-cucumber-preprocessor').default
const { defineConfig } = require("cypress")

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://bugbank.netlify.app/",
    specPattern: "cypress/e2e/**/*.feature",
    setupNodeEvents(on, config) {
      on('file:preprocessor', cucumber())
    },
  },
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/results',
    overwrite: false,
    html: false,
    json: true,
    reportFilename: '[status]_[datetime]-[name]-report',
    timestamp: 'longDate'
  }
})