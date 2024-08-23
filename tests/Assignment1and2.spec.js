const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pageObjects/LoginPage'); // Adjust the path if necessary

test.describe('Login Functionality Tests', () => {
    test('Successful login redirects to dashboard', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.login('standard_user', 'secret_sauce'); // Replace with valid credentials
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html'); // Adjust URL to the expected one post-login
    });

    test.only('Invalid login shows error message', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.login('invalid_user', 'invalid_password');
        const errorMessage = await page.locator('[data-test="error"]').textContent();
        await expect(errorMessage).toContain('Epic sadface: Username and password do not match any user in this service');
    });
    test('Verify the title of the website DEMO QA and validate the error on email field', async({page}) =>  {
        await page.goto('https://demoqa.com/');
        await page.waitForLoadState('load');
        const title = await page.title();
        await expect(title).toBe('DEMOQA');
        await page.locator('//h5[normalize-space()="Elements"]').click();
        await page.locator('text=Text Box').click();
        await page.locator('//input[@id="userName"]').fill('Venkat');
        await page.locator('//input[@id="userEmail"]').fill('com');
        await page.locator('//textarea[@id="currentAddress"]').fill('Bangalore');
        await page.locator('//textarea[@id="permanentAddress"]').fill('Bangalore');
        await page.locator('#submit').click();
        await expect(page.locator('//input[@class="mr-sm-2 field-error form-control"]')).toBeVisible();
        await expect(page.locator('//p[@id="email"]')).not.toBeVisible();

    });
    test('Verify the title of the website DEMO QA', async({page}) =>  {
        await page.goto('https://demoqa.com/');
        await page.waitForLoadState('load');
        const title = await page.title();
        await expect(title).toBe('DEMOQA');
        await page.locator('//h5[normalize-space()="Elements"]').click();
        await page.locator('text=Text Box').click();
        await page.locator('//input[@id="userName"]').fill('Venkat');
        await page.locator('//input[@id="userEmail"]').fill('venkat@yopmail.com');
        await page.locator('//textarea[@id="currentAddress"]').fill('Bangalore');
        await page.locator('//textarea[@id="permanentAddress"]').fill('Bangalore');
        await page.locator('#submit').click();
        await expect(page.locator('//input[@class="mr-sm-2 field-error form-control"]')).not.toBeVisible();
        await page.waitForSelector('//p[@id="email"]');
        const emailText = await page.locator('//p[@id="email"]').textContent();
        await expect(emailText).toContain('Email:venkat@yopmail.com');

    });
});