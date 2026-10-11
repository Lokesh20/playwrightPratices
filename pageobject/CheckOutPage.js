const { expect } = require('@playwright/test');
class CheckOutPage {
    constructor(page) {
    
        this.country = page.locator("input[placeholder='Select Country']");
        this.dropdownresult = page.locator(".ta-results");
        this.cardnumber1 = page.locator(".field .input.txt.text-validated");
        this.date = page.locator("select.input.ddl");
        this.inputText=page.locator("input[type='text']");
        this.entercoupon=page.locator("input[name='coupon']");
        this.applycoupon=page.locator("button.mt-1");
        this.toastmessagecheck=page.locator("p[style*='red']");
        this.placeorder=page.locator(".action__submit")
    }

    async selectCountry(typevalue, searchvalue) {
        await this.country.pressSequentially(typevalue, { delay: 150 })
        const dropdown = this.dropdownresult;
        await dropdown.waitFor();
        const optionsCount = await dropdown.locator("button").count();
        for (let i = 0; i < optionsCount; ++i) {
            const text = await dropdown.locator("button").nth(i).textContent();
            if (text === searchvalue) {
                await dropdown.locator("button").nth(i).click();
                break;
            }
        }
    }

    async cardnumber(number) {
        await this.cardnumber1.fill("");
        await this.cardnumber1.fill(number);
    }

    async expirydate(first,last) {
        await this.date.first().selectOption({ label: first });
        await this.date.last().selectOption({ label: last });
    }

    async cvvcode(code) {
        await this.inputText.nth(2).fill(code);
    }

    async name(name) {
        await this.inputText.nth(3).fill(name)
    }

    async couponValidation(couponcode,message) {
        await this.entercoupon.fill(couponcode)
        await this.applycoupon.click();
        const invalidCouponMessage = await this.toastmessagecheck.textContent();
        await expect(invalidCouponMessage).toEqual("* Invalid Coupon");
    }

    async placeOrder() {
        await this.placeorder.click();
    }
}
module.exports = { CheckOutPage }