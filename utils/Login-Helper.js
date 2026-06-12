const {test, expect} = require('@playwright/test');

export async function openLoginPage(page) {
    // Navigates to /login (Playwright prefixes this with your configured baseURL)
    await page.goto("/login");

    // 2. Asserts the heading is visible (Required by assignment setup)
    const signInEventHeading = page.getByRole("heading",{name : 'Sign in to EventHub'});
    await expect(signInEventHeading).toBeVisible();
    
}