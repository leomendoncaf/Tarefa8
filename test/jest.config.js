module.exports = {
   testEnvironment: "node",
   testMatch: ["**/test/**/*.test.js"],
   collectCoverage: true,
   coverageReporters: ["text", "html"],
   coverageDirectory: "coverage",
};

// jest.config.js
module.exports = {
   testTimeout: 10000, // Limite de tempo de 10 segundos para todos os testes
};
