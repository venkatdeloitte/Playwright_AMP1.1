const { chromium } = require('playwright');

async function openURL(url) {
    const browser = await chromium.launch({ headless: false }); // Set headless: true for headless mode
    const page = await browser.newPage();
    
    // Navigate to the specified URL
    await page.goto(url, { timeout: 100000 });
    
    return page; // Return the page object
}

async function waitForElement(page, selector) {
    await page.waitForSelector(selector, { state: 'visible', timeout: 30000 }); // Wait for the element to be visible
}

async function clickElement(page, selector) {
    await page.waitForSelector(selector, { state: 'visible', timeout: 30000 }); // Wait for the element to be visible
    await page.click(selector); // Click the element
}

module.exports = { openURL, waitForElement, clickElement };