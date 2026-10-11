import { expect, Locator, Page } from '@playwright/test'

export class LoginPage {
    page: Page;
    username: Locator;
    password: Locator;
    loginbutton: Locator;
    firstProduct: Locator;

    constructor(page: Page) {
        this.page = page;
        this.username = page.locator("#userEmail");
        this.password = page.locator('input#userPassword');
        this.loginbutton = page.locator("input#login")
        this.firstProduct = page.locator("div.card-body")
    }
    async gotourl() {
        await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    }

    async validlogin(email: string, password: string) {
        await this.username.fill(email);
        await this.password.fill(password);
        await this.loginbutton.click();
        await this.page.waitForLoadState('networkidle');
        await this.firstProduct.first().waitFor({ state: 'visible' });
    }


}

module.exports = { LoginPage };