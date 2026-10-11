const { expect } = require('@playwright/test');
class CartPage {
    constructor(page) {
        this.page=page;
        this.checklist = page.locator("div li");
        this.checkout=page.locator("text=Checkout");

    }

    async validateProduct(productName)
    {
          await this.checklist.first().waitFor();
            const bool = await this.page.locator("h3:has-text('"+productName+"')").isVisible()
            await expect(bool).toBeTruthy();
    }

    async navigateToCheckout(){
         await this.checkout.click();
    }


}

module.exports = { CartPage }