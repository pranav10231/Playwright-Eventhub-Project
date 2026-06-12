const { defineConfig, devices } = require("@playwright/test");

module.exports  = defineConfig({
    testDir : './tests',
    retries: 1,
    use: {
    // SETUP REQUIREMENT: Set BASE_URL
    baseURL: 'https://eventhub.rahulshettyacademy.com',
  },
    projects : [
        {
            name : 'chromium',
            use : {...devices['Desktop Chrome']}
        },
        {
            name : 'firefox',
            use : {...devices['Desktop Firefox']}
        },
    ],
});


