//const { expect } = require('@playwright/test');
import { expect, Locator, Page } from '@playwright/test'

export class OrdersPage {
    orderdetail: Locator;
    number: Locator;
    viewbuttonclick: Locator;
    getordernumber1: Locator;
    constructor(page: Page) {
        this.orderdetail = page.locator("tbody tr");
        this.number = page.locator("tbody tr th");
        this.viewbuttonclick = page.locator("button.btn-primary");
        this.getordernumber1 = page.locator("div.-main");
    }

    async viewbutton(orderNo: string) {
        const order = this.orderdetail;
        await order.last().waitFor();
        const orderCount = await order.count();
        for (let i = 0; i < orderCount; ++i) {
            let getOrderNumber: any
            getOrderNumber = await this.number.nth(i).textContent();
            if (orderNo.includes(getOrderNumber)) {
                await this.viewbuttonclick.nth(i).click();
                break;

            }
        }
    }

    async validateordernumber(orderNo: string) {
        let finalOrderNumber: any = await this.getordernumber1.textContent();
        await expect(orderNo.includes(finalOrderNumber)).toBeTruthy();
    }
}
module.exports = { OrdersPage }