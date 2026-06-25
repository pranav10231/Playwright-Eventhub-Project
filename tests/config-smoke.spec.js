const {test, expect} = require('@playwright/test');
const {LoginPage} = require('../Pages/LoginPage');

test('Validate elements on eventhub login page.', async ({page})=>{

    // navigate to login page
    const loginPage = new LoginPage(page);
    await loginPage.openLoginPage();

    // Assert the page title matches EventHub:
    await expect(page).toHaveTitle('EventHub — Discover & Book Events');

    // Assert the Email field located by placeholder is visible
    const emailField = page.getByPlaceholder("you@email.com"); 
    await expect(emailField).toBeVisible();

    // Assert the SignIn button located by role is visible
    const signInButton = page.getByRole("button", {name : 'Sign In'}); 
    await expect(signInButton).toBeVisible();
});

test('Compare page fixture and browser context', async ({page, browser})=> {
    // Navigate to login page
    const loginPage = new LoginPage(page);
    await loginPage.openLoginPage();

    // Fill the email textbox with beginner@sample.com
    const emailField = page.getByPlaceholder("you@email.com"); 
    await emailField.fill("beginner@sample.com");

    // 2. Assert the field contains the same value you typed
    await expect(emailField).toHaveValue('beginner@sample.com');

    // Step 2 — Create a fresh browser context manually
    const isolatedContext = await browser.newContext();

    // Creates a new fresh page 
    const isolatedPage = await isolatedContext.newPage();

    // Go to login page on new browser page
    // Assert the Sign in to EventHub heading is visible on isolatedPage
     await isolatedPage.goto("/login");

    // 2. Asserts the heading is visible (Required by assignment setup)
    const signInEventHeading = isolatedPage.getByRole("heading",{name : 'Sign in to EventHub'});
    await expect(signInEventHeading).toBeVisible();
    

    // Assert the email field on isolatedPage is empty
    const emailField1 = isolatedPage.getByPlaceholder("you@email.com");
    //await expect(emailField1).toHaveValue("");
    await expect(emailField1).toBeEmpty();

    // Close isolatedContext at the end of the test
    await isolatedPage.close();
});