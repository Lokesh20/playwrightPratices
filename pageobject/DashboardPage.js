class DashboardPage {

    constructor(page) {
        this.page = page;
        
        this.products = page.locator(".card-body");
        this.title = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");

    }

    async navigateToCart() {
        await this.cart.click();
    }

    async searchproduct(productName) {
        //await this.firstProduct.first().waitFor({ state: 'visible' });
        
        const titles = await this.title.allTextContents();
        const count = await this.products.count();
        for (let i = 0; i < count; ++i) {
            if (await this.products.nth(i).locator("b").textContent() === productName) {
                await this.products.nth(i).locator("text= Add To Cart").click();
                break;
            }
        }

    }

}

module.exports = { DashboardPage }