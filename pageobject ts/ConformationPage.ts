//const { expect } = require('@playwright/test');
import { expect, Locator, Page } from '@playwright/test'
export class ConformationPage {
    page: Page;
    thankyoumessage: Locator;
    order: Locator;
    myorder: Locator;

    constructor(page: Page) {
        this.page = page;

        this.thankyoumessage = page.locator("h1.hero-primary");
        this.order = page.locator("label.ng-star-inserted");
        this.myorder = page.locator("button[routerlink*='myorder']");
    }

    async validatemessage(message:string) {
        const thankYouMessage = await this.thankyoumessage.textContent();
        await expect(thankYouMessage).toContain(message);
    }

    async orderno() {
        const orderNo = await this.order.textContent();
        return orderNo;
    }

    async validateproductname(productName:string) {
        const getProductName = await this.page.locator("div.title", { hasText: productName }).textContent();
        await expect(getProductName).toEqual(productName);
    }

    async navigateToOrders() {
        await this.myorder.click();
    }
}

module.exports = { ConformationPage }