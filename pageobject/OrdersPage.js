const { expect } = require('@playwright/test');
class OrdersPage {
    constructor(page) {
        this.orderdetail = page.locator("tbody tr");
        this.number = page.locator("tbody tr th");
        this.viewbuttonclick = page.locator("button.btn-primary");
        this.getordernumber1 = page.locator("div.-main");
    }

    async viewbutton(orderNo) {
        const order = this.orderdetail;
        await order.last().waitFor();
        const orderCount = await order.count();
        for (let i = 0; i < orderCount; ++i) {
            const getOrderNumber = await this.number.nth(i).textContent();
            if (orderNo.includes(getOrderNumber)) {
                await this.viewbuttonclick.nth(i).click();
                break;

            }
        }
    }

    async validateordernumber(orderNo) {
        const finalOrderNumber = await this.getordernumber1.textContent();
        await expect(orderNo.includes(finalOrderNumber)).toBeTruthy();
    }
}
module.exports = { OrdersPage }