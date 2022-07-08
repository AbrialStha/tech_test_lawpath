import { defineConfig } from "cypress";
import '@cypress/instrument-cra';


export default defineConfig({
  env: {
    codeCoverage: {
      exclude: 'cypress/**/*.*'
    }
  },
  component: {
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config);
      return config;
    },
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      config.baseUrl = 'http://localhost:3000'
      require('@cypress/code-coverage/task')(on, config)
      return config
    },
  },
});
