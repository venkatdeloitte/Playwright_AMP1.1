class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.addToCartButton = '.cart';
        this.checkoutButton = '#cart_checkout1';
        this.completeOrderButton = '#cart_checkout1';
        this.guestcheckoutButton = 'label[for="accountFrm_accountguest"]';
        this.continueButton = 'button[title="Continue"]';
        this.firstname = '#guestFrm_firstname';
        this.lastname = '#guestFrm_lastname';
        this.email = '#guestFrm_email';
        this.telephone = '#guestFrm_telephone';
        this.address1 = '#guestFrm_address_1';
        this.city = '#guestFrm_city';
        this.state = '#guestFrm_zone_id';
        this.postcode = '#guestFrm_postcode';
        this.country = '#guestFrm_country_id';
        this.confirmorderButton = '#checkout_btn';

    }

    async completeBuyFlow(productName) {
        await this.page.click(`text=${productName}`);
        await this.page.click(this.addToCartButton);
        await this.page.click(this.checkoutButton);
        await this.page.click(this.guestcheckoutButton);
        await this.page.click(this.continueButton);
    }
    async fillCheckoutForm({ firstName, lastName, email, telephone, address1, city, state, postcode }) {
        await this.page.fill(this.firstname, firstName);
        await this.page.fill(this.lastname, lastName);
        await this.page.fill(this.email, email);
        await this.page.fill(this.telephone, telephone);
        await this.page.fill(this.address1, address1);
        await this.page.fill(this.city, city);
        await this.page.fill(this.postcode, postcode);
        await this.page.selectOption(this.state, { label: state });
        await this.page.click(this.continueButton);
    }
    async verifyCheckoutPage() {
        await this.page.click(this.confirmorderButton);
    } 
    } 

module.exports = { CheckoutPage}