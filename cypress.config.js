const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const addCucumberPreprocessorPlugin = require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;

module.exports = defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)], // Corrige la referencia al plugin
      });

      on("file:preprocessor", bundler); // Configuración del preprocesador
      await addCucumberPreprocessorPlugin(on, config); // Integra Cucumber

      return config;
    },
    specPattern: "cypress/e2e/**/*.feature", // Archivos .feature
    baseUrl: "https://www.booking.com", // Cambia esto si usas otra base URL
  },
});