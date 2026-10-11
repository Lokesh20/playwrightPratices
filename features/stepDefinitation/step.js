const { When, Then, Given } = require('@cucumber/cucumber')

const { expect } = require('@playwright/test');
const playwright = require('playwright');
const { PageManager } = require('../../pageobject/PageManager');
const { setDefaultTimeout } = require('@cucumber/cucumber');


setDefaultTimeout(90 * 1000);


Given('a login to ecommerce application with {string} and {string}', async function (username, password) {
    this.productName = 'ZARA COAT 4';
    const loginpage = this.pageManager.LoginPage();
    await loginpage.gotourl();
    await loginpage.validlogin(username, password);
});


When('Add {string} to cart', async function (productName) {
    //  setDefaultTimeout(60 * 1000);
    const dashboardpage = this.pageManager.DashBoard();
    await dashboardpage.searchproduct(productName);
    await dashboardpage.navigateToCart();
});

Then('verify {string} is displayed in the cart', async function (productName) {
    // setDefaultTimeout(60 * 1000);
    const cartpage = this.pageManager.CartPage()
    //await page.pause();
    await cartpage.validateProduct(productName)
    await cartpage.navigateToCheckout();
});

When('Enter valid details and the place the order', async function () {
    // setDefaultTimeout(60 * 1000);
    const checkout = this.pageManager.CheckoutPage();
    await checkout.selectCountry("ind", " India")
    await checkout.cardnumber("4542 9931 9292 2293");
    await checkout.expirydate("07", "22");
    await checkout.cvvcode("1234");
    await checkout.name("Lokesh koli");
    await checkout.couponValidation("RahulShetty20", "* Invalid Coupon");
    await checkout.placeOrder();
});

Then('Verify order in present in the orderhistory', async function () {
    // setDefaultTimeout(60 * 1000);
    const thankyou = this.pageManager.ConformattionPage();
    await thankyou.validatemessage("Thankyou")
    const orderNo = await thankyou.orderno();
    await thankyou.validateproductname(this.productName);
    await thankyou.navigateToOrders();
    const orderspage = this.pageManager.OrdersPage();
    await orderspage.viewbutton(orderNo);
    await orderspage.validateordernumber(orderNo)
});

Given('a login to ecommerce2 application with {string} and {string}', async function (username, password) {
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await this.page.title());
    await expect(this.page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
    await this.page.locator("#username").fill(username);
    await this.page.locator("[type='Password']").fill(password);
    await this.page.locator("input#signInBtn").click();
});

Then('Error message is dispalyed', async function () {
    const errorMessage = await this.page.locator("[style*=block]").textContent();
    console.log(errorMessage);
});