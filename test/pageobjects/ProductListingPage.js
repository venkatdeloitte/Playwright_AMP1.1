class ProductListingPage {
    constructor(page) {
        this.page = page;
        this.productNames = page.locator('.prdocutname');
        this.productPrices = page.locator('.oneprice, .pricenew');
        this.sortDropdown = page.locator('#sort');
        this.fragranceTab = page.locator('a[href="https://automationteststore.com/index.php?rt=product/category&path=49"]');
    }

    async navigate() {
        await this.page.goto('https://automationteststore.com/');
    }

    async goToFragranceTab() {
        await this.fragranceTab.click();
    }

    async sortByPriceAscending() {
        await this.sortDropdown.selectOption({ value: 'p.price-ASC' });
        // await this.page.waitForLoadState('networkidle');
    }

  
  
    async getProductDetails() {
        await this.productNames.first().waitFor(); // Ensure the first product name is available

        const uniqueNames = new Set();
        const productDetails = [];
        const count = await this.productNames.count();

        for (let i = 0; i < count; i++) {
            const nameLocator = this.productNames.nth(i);
            const priceLocator = this.productPrices.nth(i);

            if (await nameLocator.isVisible() && await priceLocator.isVisible()) {
                const name = await nameLocator.textContent();
                const price = await priceLocator.textContent();

                // Add all visible products, even if names or prices are duplicates
                if (!uniqueNames.has(name)) {
                    uniqueNames.add(name);
                }
                productDetails.push({ name, price });
            }
        }

        return productDetails;
    }
}

module.exports = { ProductListingPage };