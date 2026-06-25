 const {expect, page} = require('@playwright/test');



class LoginPage { 

   

    constructor(page){
        this.page = page;
        this.signInEventHeading = page.getByRole("heading",{name : 'Sign in to EventHub'});
        this.usernameField = page.getByPlaceholder("you@email.com");
        this.passwordField = page.locator('#password');
        this.submitButton = page.getByRole("button", {name : 'Sign In' });
    }

    async openLoginPage() {
    // Navigates to /login (Playwright prefixes this with your configured baseURL)
    await this.page.goto("/login");

    // 2. Asserts the heading is visible (Required by assignment setup)
    await expect(this.signInEventHeading).toBeVisible();
    
    }

    async login(){
        await this.openLoginPage();
        await this.usernameField.fill("student@example.com");
        await this.passwordField.fill("secret123");
        await this.submitButton.click();
    }

}

module.exports = {LoginPage};