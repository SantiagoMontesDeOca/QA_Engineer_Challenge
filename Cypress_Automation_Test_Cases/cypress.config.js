const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.imdb.com', // Base URL for tests
    videoUploadOnPasses: false, // No upload videos for passing tests
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});