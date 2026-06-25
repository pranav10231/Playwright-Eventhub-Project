const { defineConfig, devices } = require("@playwright/test");

module.exports  = defineConfig({
    testDir : './tests',
    retries: 0,
    reporter: 'html',
    use: {
    // SETUP REQUIREMENT: Set BASE_URL
    baseURL: 'https://eventhub.rahulshettyacademy.com',
    launchOptions : {slowMo : 1000,}
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


