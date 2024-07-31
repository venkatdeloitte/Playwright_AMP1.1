const { test, expect } = require('@playwright/test');

async function login(page) {
  await page.goto('https://demoblaze.com');
  await page.getByRole('link', { name: 'Log in' }).click();
  await page.waitForTimeout(3000);
  await page.locator('//input[@id="loginusername"]').fill('Venkat13');
  await page.locator('//input[@id="loginpassword"]').fill('venkat123');
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page.getByText('Welcome Venkat13')).toBeVisible();
}
async function fillDetails(page) {
  await page.locator('//input[@id="name"]').fill('Venkat');
  await page.locator('//input[@id="country"]').fill('India');
  await page.locator('//input[@id="city"]').fill('Banglore');
  await page.locator('//input[@id="card"]').fill('1234567890');
  await page.locator('//input[@id="month"]').fill('01');
  await page.locator('//input[@id="year"]').fill('2023');
  await page.locator('//button[normalize-space()="Purchase"]').click();
}
test.describe('User Sign-up', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://demoblaze.com');
  });

  test('User Sign-up Positive scenario', async ({ page }) => {
    await page.getByRole('link', { name: 'Sign up' }).click();
    await expect(page.locator('//h5[@id="signInModalLabel"]')).toBeVisible();
    await page.getByRole('textbox', { name: 'Username' }).fill('Venkat37');
    await page.getByRole('textbox', { name: 'Password' }).fill('venkat123');
    await page.waitForTimeout(3000);

    const dialogPromise = new Promise(resolve => {
      page.on('dialog', async dialog => {
        console.log(`Dialog message: ${dialog.message()}`);
        expect(dialog.message()).toBe('Sign up successful.');
        await dialog.accept();
        resolve();
      });
    });

    await page.getByRole('button', { name: 'Sign up' }).click();
    await dialogPromise;
  });

  test('User Sign-up Negative scenario', async ({ page }) => {
    await page.getByRole('link', { name: 'Sign up' }).click();
    await expect(page.locator('//h5[@id="signInModalLabel"]')).toBeVisible();
    await page.getByRole('textbox', { name: 'Username' }).fill('Venkat35');
    await page.getByRole('textbox', { name: 'Password' }).fill('venkat123');
    await page.waitForTimeout(3000);

    const dialogPromise = new Promise(resolve => {
      page.on('dialog', async dialog => {
        console.log(`Dialog message: ${dialog.message()}`);
        expect(dialog.message()).toBe('This user already exist.');
        await dialog.accept();
        resolve();
      });
    });

    await page.getByRole('button', { name: 'Sign up' }).click();
    await dialogPromise;
  });

  test('User Login Positive scenario', async ({ page }) => {
    await page.getByRole('link', { name: 'Log in' }).click();
    await page.waitForTimeout(3000);
    await page.locator('//input[@id="loginusername"]').fill('Venkat13');
    await page.locator('//input[@id="loginpassword"]').fill('venkat123');
    await page.getByRole('button', { name: 'Log in' }).click();
    await expect(page.getByText('Welcome Venkat13')).toBeVisible();
  });

  test('User Login Negative scenario', async ({ page }) => {
    await page.getByRole('link', { name: 'Log in' }).click();
    await page.waitForTimeout(3000);
    await page.locator('//input[@id="loginusername"]').fill('dVenkat13');
    await page.locator('//input[@id="loginpassword"]').fill('venkat123');
    await page.waitForTimeout(3000);

    const dialogPromise = new Promise(resolve => {
      page.on('dialog', async dialog => {
        console.log(`Dialog message: ${dialog.message()}`);
        expect(dialog.message()).toBe('User does not exist.');
        await dialog.accept();
        resolve();
      });
    });

    await page.getByRole('button', { name: 'Log in' }).click();
    await dialogPromise;
  });
});

test('Count products in each category', async ({ page }) => {
  await page.goto('https://demoblaze.com');

  const categories = ['Phones', 'Laptops', 'Monitors'];
  const categoryProductCounts = {};

  for (const category of categories) {
    console.log(`Navigating to ${category} category`);
    await page.click(`(//a[normalize-space()='${category}'][1])`);
    await page.waitForSelector('.card-title', { state: 'visible', timeout: 10000 });
    // Adding a small delay to ensure all elements are rendered
    await page.waitForTimeout(2000);
    const productTitles = await page.locator('.card-title').allTextContents();
    const productCount = productTitles.length;
    categoryProductCounts[category] = productCount;

    console.log(`Number of products in ${category} category: ${productCount}`);
    console.log(`Products in ${category} category: ${productTitles.join(', ')}`);
    // await page.click('a:has-text("Home")');
  }

  console.log('Total number of products in each category:', categoryProductCounts);
});

test('Add a phone to cart if price is less than or equal to $650', async ({ page }) => {
  await login(page);

  console.log('Navigating to Phones category');
  await page.click(`(//a[normalize-space()='Phones'][1])`);
  await page.waitForSelector('.card-title', { state: 'visible', timeout: 10000 });

  // Adding a small delay to ensure all elements are rendered
  await page.waitForTimeout(2000);

  const phoneCards = await page.locator('.card');
  const phoneCount = await phoneCards.count();
  console.log(`Number of phone cards found: ${phoneCount}`);

  for (let i = 0; i < phoneCount; i++) {
    const priceText = await phoneCards.nth(i).locator('xpath=//h5[contains(text(), "$")]').textContent();
    const price = parseFloat(priceText.replace('$', ''));
    if (price <= 650) {
      const phoneName = await phoneCards.nth(i).locator('.card-title a').textContent();
      console.log(`Found phone: ${phoneName} with price: $${price}`);

      // Filter by your choice of phone (e.g., "Samsung galaxy s6")
      if (phoneName.includes('Samsung galaxy s6')) {
        await phoneCards.nth(i).locator('.card-title a').click();
        await page.click('//a[normalize-space()="Add to cart"]');
        console.log(`Added phone to cart: ${phoneName}`);

        // Handle the dialog
        page.on('dialog', async dialog => {
          console.log(`Dialog message: ${dialog.message()}`);
          expect(dialog.message()).toBe('Product added');
          await dialog.accept();
        });

        await page.click('a:has-text("Home")');
        break;
      }
    }
  }
});
test('Add the last product on the last page to the cart', async ({ page }) => {
  await login(page);

  // console.log('Navigating to Phones category');
  // await page.click(`(//a[normalize-space()='Phones'][1])`);
  await page.waitForSelector('.card-title', { state: 'visible', timeout: 10000 });

  // Adding a small delay to ensure all elements are rendered
  await page.waitForTimeout(2000);

  // Navigate to the last page by clicking "Next" until it's disabled
  while (await page.isVisible('#next2')) {
    await page.click('#next2');
    await page.waitForTimeout(2000); // Wait for the next page to load
  }

  // Select the last product on the last page
  const lastProduct = await page.locator('.card').last();
  const lastProductName = await lastProduct.locator('.card-title a').textContent();
  console.log(`Selected last product: ${lastProductName}`);

  // Click on the last product to view its details
  await lastProduct.locator('.card-title a').click();
  await page.waitForSelector('text=Add to cart', { state: 'visible', timeout: 10000 });

  // Add the product to the cart
  await page.click('text=Add to cart');
  console.log(`Added product to cart: ${lastProductName}`);

  // Handle the dialog
  page.on('dialog', async dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    expect(dialog.message()).toBe('Product added');
    await dialog.accept();
  });

  // Navigate back to the home page
  await page.click('a:has-text("Home")');
});

test.describe('Checkout process', () => {
  test('Positive scenario: Successfully check the items added to the cart', async ({ page }) => {
    await login(page);
    // Add a product to the cart

    // Navigate to the cart page
    await page.click('a:has-text("Cart")');
    // await page.waitForSelector(`//td[normalize-space()='MacBook Pro']`, { state: 'visible', timeout: 10000 }); 

    // Proceed to checkout
    await page.click('.btn.btn-success');
    await fillDetails(page);

    // Verify successful checkout
    await expect(page.locator('//div[contains(@class,"showSweetAlert visible")]')).toBeVisible();
  });

  test('Negative scenario: Attempt to checkout without adding any products to the cart', async ({ page }) => {
    await page.goto('https://demoblaze.com');
    // Navigate to the cart page without adding any products
    await page.click('a:has-text("Cart")');
    // await page.waitForSelector('text=Your cart is empty', { state: 'visible', timeout: 10000 });
    await expect(page.locator('btn.btn-success')).not.toBeVisible();
    await page.click('.btn.btn-success');

    // Attempt to proceed to checkout
    await page.click('text=Checkout');

    // Verify that an error message is displayed indicating that the cart is empty
    await expect(page.locator('//div[contains(@class,"showSweetAlert visible")]')).not.toBeVisible();
  });
  test('Positive scenario: Successfully log out', async ({ page }) => {
    // await page.goto('https://demoblaze.com');
    await login(page);
    await page.waitForSelector('a:has-text("Log out")');
    
    // Click the logout button
    await page.click('a:has-text("Log out")');
    
    // Verify that the user is logged out
    await expect(page.locator('a:has-text("Log in")')).toBeVisible();
});
test('Scenario 2: Open a New Window and Fetch Text', async ({ page, context }) => {
  // Navigate to the website
  await page.goto('https://demoqa.com/');
  
  // Click on the "Alerts, Frame & Windows" section
  await page.locator('text=Alerts, Frame & Windows').click();
  await page.locator('text=Browser Windows').click();
  
  // Click on "Open a New Window"
  await Promise.all([
      context.waitForEvent('page'), // Wait for the new page to open
      page.locator('#windowButton').click()// Click the button to open a new window
  ]);
  
  // Get all pages (parent and new window)
  const pages = context.pages();
  const newPage = pages[pages.length - 1]; // The new page is the last one in the array
  
  // Wait for the new page to load
  await newPage.waitForLoadState();
  
  // Fetch the text from the new window
  const text = await newPage.locator('body').textContent();
  console.log(`Text from new window: ${text}`);
  
  // Close the new window
  await newPage.close();
  
  // Navigate back to the parent window
  await page.bringToFront();
});
});