const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://restful-booker.herokuapp.com",
    experimentalMemoryManagement: true,
    video: false,
    env: {
      CYPRESS_USERNAME: "",
      CYPRESS_PASSWORD: "",
    },
  },
});
