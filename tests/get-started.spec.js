const {test, expect} = require('@playwright/test');

async function openLoginPage(page) {
    // Navigates to /login (Playwright prefixes this with your configured baseURL)
    await page.goto("/login");

    // 2. Asserts the heading is visible (Required by assignment setup)
    const signInEventHeading = page.getByRole("heading",{name : 'Sign in to EventHub'});
    await expect(signInEventHeading).toBeVisible();
    
}

test('EventHub login page loads', async({page})=> {
    // ------------------------------------------------------------------------
    // ASSIGNMENT NOTE: Why async/await is required
    // Playwright actions (like page.goto or visibility checks) return promises.
    // Using 'await' ensures the test execution pauses until the browser action 
    // completes, preventing timing issues and flaky test behavior.
    // ------------------------------------------------------------------------

    await openLoginPage(page);

    // Assert the Email field located by placeholder is visible
    const emailField = page.getByPlaceholder("you@email.com"); 
    await expect(emailField).toBeVisible();

    // Assert the SignIn button located by role is visible
    const signInButton = page.getByRole("button", {name : 'Sign In'}); 
    await expect(signInButton).toBeVisible();
});

test('Validate password field and login URL', async ({page}) => {

    await openLoginPage(page);

    // Assert the password field located by label Password is visible
    const passwordField = page.getByLabel('Password');
    await expect(passwordField).toBeVisible();

    // Assert the page URL contains /login
    await expect(page).toHaveURL('/login');

    // Assert the heading Sign in to EventHub is visible
     const signInEventHeading = page.getByRole("heading",{name : 'Sign in to EventHub'});
    await expect(signInEventHeading).toBeVisible();
});

