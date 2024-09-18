const { test, expect } = require('@playwright/test');
const { ProductListingPage } = require('../test/pageobjects/ProductListingPage');
const { CheckoutPage } = require('../test/pageobjects/CheckoutPage');
const { writeDataToExcel, readDataFromExcel } = require('../test/Utils/excelUtils');
const fs = require('fs');
const ExcelJS = require('exceljs');
const filePath = '/Users/vencs/Desktop/Playwright_AMP1.1/tests/files/products.xlsx';
const testData = require('../test/testData/testdata.json');

test.describe('Automation Test Store - Fragrance Tab', () => {
    test('Fetch product details and save to Excel', async ({ page }) => {
        const productListingPage = new ProductListingPage(page);
        await productListingPage.navigate();
        await productListingPage.goToFragranceTab();
        await productListingPage.sortByPriceAscending();

        const productDetails = await productListingPage.getProductDetails();
        // const filePath = '/Users/vencs/Desktop/Playwright_AMP1.1/tests/files/products.xlsx';

        await writeDataToExcel(productDetails, filePath);
        console.log(`Number of unique products fetched: ${productDetails.length}`);

        // Verify data written to Excel
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(filePath);
        const worksheet = workbook.getWorksheet('Products');
        const rowCount = worksheet.rowCount;

        expect(rowCount).toBe(productDetails.length + 1); // +1 for header row

        console.log(`Number of products fetched: ${productDetails.length}`);
    });
    test('Verify data written to Excel', async () => {
        // Verify data written to Excel
        const writtenData = await readDataFromExcel(filePath);

        // Assert that the number of products written matches the number of products fetched
        expect(writtenData.length).toBeGreaterThan(0);

        // Assert that each product's name and price match
        writtenData.forEach(item => {
            expect(item).toHaveProperty('name');
            expect(item).toHaveProperty('price');
            console.log(`Product Name: ${item.name}, Product Price: ${item.price}`);
            
        });
        
    });

    test('Complete Buy Flow till Checkout', async ({ page }) => {
        const productListingPage = new ProductListingPage(page);
        const checkoutPage = new CheckoutPage(page);

        await productListingPage.navigate();
        await productListingPage.goToFragranceTab();
        await productListingPage.sortByPriceAscending();

        await checkoutPage.completeBuyFlow('ck one shock for him Deodorant');

        // Fill in the checkout form using data from the JSON file
        await checkoutPage.fillCheckoutForm(testData.checkoutDetails);
        await checkoutPage.verifyCheckoutPage();
    });
    
    
});