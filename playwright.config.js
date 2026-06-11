const { defineConfig, devices } = require("@playwright/test");

module.exports  = defineConfig({
    testDir : './tests',
    use: {
    // SETUP REQUIREMENT: Set BASE_URL
    baseURL: 'https://eventhub.rahulshettyacademy.com',
  },
    projects : [
        {
            name : 'chromium',
            use : {...devices['Desktop Chrome']}
        },
    ],
});


