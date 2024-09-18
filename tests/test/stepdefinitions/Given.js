const { Given } = require('@cucumber/cucumber');
// const { openURL } = require('../functions/webfunction');
const webfunction = require('../functions/webfunction');
const ProductListingPage = require('../pageobjects/ProductListingPage');

Given('I open the URL {string}', { timeout: 20000 }, async function (url) {
    await webfunction.openURL(url);
});
Given('I wait for the fragrance tab to be displayed', { timeout: 10000 }, async function () {
    const fragranceTab = ProductListingPage.fragranceTab;
    await webfunction.waitForElement(this.page, fragranceTab);
  });