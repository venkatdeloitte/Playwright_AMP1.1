const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pageObjects/LoginPage'); // Adjust the path if necessary

test.describe('Login Functionality Tests', () => {
    test('Successful login redirects to dashboard', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.login('standard_user', 'secret_sauce'); // Replace with valid credentials
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html'); // Adjust URL to the expected one post-login
    });

    test('Invalid login shows error message', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.login('invalid_user', 'invalid_password');
        const errorMessage = await page.locator('[data-test="error"]').textContent();
        await expect(errorMessage).toContain('Epic sadface: Username and password do not match any user in this service');
    });
});