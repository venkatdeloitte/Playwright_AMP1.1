const { test, expect } = require('@playwright/test');

test.describe('Automation Exercise Tests', () => {
    test('Validate total value/price of products in cart for two users @Scenario1', async ({ page }) => {
        // Launch URL
        await page.goto('https://www.automationexercise.com/');

        // Login with valid credentials
        await page.click('a[href="/login"]');
        await page.fill('input[data-qa="login-email"]', 'venkat@yopmail.com');
        await page.fill('input[data-qa="login-password"]', 'Qwerty@321');
        await page.click('button[data-qa="login-button"]');

        // Add two products to the cart
        await page.click('a[data-product-id="1"]');
        await page.click('a[data-product-id="2"]');

        // Navigate to the cart
        await page.click('a[href="/view_cart"]');

        // Validate the total value/price of each product in the cart
        const product1Price = await page.textContent('#product-1 .cart_price');
        const product2Price = await page.textContent('#product-2 .cart_price');
        const product1Total = await page.textContent('#product-1 .cart_total');
        const product2Total = await page.textContent('#product-2 .cart_total');

        // Convert prices to numbers for validation
        const product1PriceNum = parseFloat(product1Price.replace('$', ''));
        const product2PriceNum = parseFloat(product2Price.replace('$', ''));
        const product1TotalNum = parseFloat(product1Total.replace('$', ''));
        const product2TotalNum = parseFloat(product2Total.replace('$', ''));

        // Validate the total price
        expect(product1TotalNum).toBe(product1PriceNum);
        expect(product2TotalNum).toBe(product2PriceNum);
    });

    test.only('Validate total value/price of products in cart for two users @Scenario2', async ({ page }) => {
        // Launch URL
        await page.goto('https://www.automationexercise.com/');

        // Login with first user
        await page.click('a[href="/login"]');
        await page.fill('input[data-qa="login-email"]', 'venkat1@yopmail.com');
        await page.fill('input[data-qa="login-password"]', 'Qwerty@321');
        await page.click('button[data-qa="login-button"]');

        // Add first product to the cart
        await page.click('a[data-product-id="1"]');

        // Logout
        await page.click('a[href="/logout"]');

        // Login with second user
        await page.click('a[href="/login"]');
        await page.fill('input[data-qa="login-email"]', 'venkat@yopmail.com');
        await page.fill('input[data-qa="login-password"]', 'Qwerty@321');
        await page.click('button[data-qa="login-button"]');

        // Add second product to the cart
        await page.click('a[data-product-id="2"]');

        // Navigate to the cart
        await page.click('a[href="/view_cart"]');

        // Validate the total value/price of each product in the cart
        const product1Price = await page.textContent('#product-1 .cart_price');
        const product2Price = await page.textContent('#product-2 .cart_price');
        const product1Total = await page.textContent('#product-1 .cart_total');
        const product2Total = await page.textContent('#product-2 .cart_total');

        // Convert prices to numbers for validation
        const product1PriceNum = parseFloat(product1Price.replace('$', ''));
        const product2PriceNum = parseFloat(product2Price.replace('$', ''));
        const product1TotalNum = parseFloat(product1Total.replace('$', ''));
        const product2TotalNum = parseFloat(product2Total.replace('$', ''));

        // Validate the total price
        expect(product1TotalNum).toBe(product1PriceNum);
        expect(product2TotalNum).toBe(product2PriceNum);
    });

    test.only('Create a valid user and execute Scenario 1 and Scenario 2 @Scenario3', async ({ page }) => {
        // Launch URL
        await page.goto('https://www.automationexercise.com/');

        // Create a new user
        await page.click('a[href="/login"]');
        await page.fill('input[data-qa="signup-name"]', 'venkat4');
        await page.fill('input[data-qa="signup-email"]', 'venkat6@yopmail.com');
        await page.click('button[data-qa="signup-button"]');
        await page.fill('//input[@id="password"]', 'Qwerty@123');
        await page.selectOption('//select[@id="days"]', '15');
        await page.selectOption('//select[@id="months"]', '5');
        await page.selectOption('//select[@id="years"]', '1990');
        await page.fill('//input[@id="first_name"]', 'venkat3');
        await page.fill('//input[@id="last_name"]', 'test');
        await page.fill('#address1', 'test1');
        await page.fill('#city', 'testcity');
        // await page.selectOption('#country', '1');
        await page.fill('#state', 'teststate');
        await page.fill('#city', 'testcity');
        await page.fill('#zipcode', '12345');
        await page.fill('#mobile_number', '1234567890');
        await page.click('button[data-qa="create-account"]');
        await expect(page.locator('//b[normalize-space()="Account Created!"]')).toBeVisible();
        await page.click('//a[normalize-space()="Continue"]');

        // Fill in the rest of the signup form as needed
    });
});