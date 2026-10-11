//page model implemet
// testdata driven from json as single set and in array
// testdata driven from fixture

const { test, expect } = require('@playwright/test');
const { customtest } = require('../testdata/Testdatafixture');
const { LoginPage } = require('../pageobject/LoginPage');
const { DashboardPage } = require('../pageobject/DashboardPage');
const { CartPage } = require('../pageobject/CartPage');
const { CheckOutPage } = require('../pageobject/CheckOutPage');
const { ConformationPage } = require('../pageobject/ConformationPage');
const { OrdersPage } = require('../pageobject/OrdersPage');
const { PageManager } = require('../pageobject/PageManager');
const data = JSON.parse(JSON.stringify(require('../testdata/ecomtestdata.json')))
const datasetm = JSON.parse(JSON.stringify(require('../testdata/ecomtestdataset.json')))

//test.describe.configure({mode:'parallel'});
test.describe.configure({mode:'serial'});

test("End to End test", async ({ page }) => {


    const email = "lokeshk20892@gmail.com";
    const password = "Mahindra@123";
    const productName = 'ZARA COAT 3';
    //await page.pause();
    const loginpage = new LoginPage(page);
    await loginpage.gotourl();
    await loginpage.validlogin(data.email, data.password);
    const dashboardpage = new DashboardPage(page);
    // await page.pause();
    await dashboardpage.searchproduct(data.productName);
    await dashboardpage.navigateToCart();

    const cartpage = new CartPage(page)
    //await page.pause();
    await cartpage.validateProduct(data.productName)
    await cartpage.navigateToCheckout();


    const checkout = new CheckOutPage(page);
    await checkout.selectCountry("ind", " India")
    await checkout.cardnumber("4542 9931 9292 2293");
    await checkout.expirydate("07", "22");
    await checkout.cvvcode("1234");
    await checkout.name("Lokesh koli");
    await checkout.couponValidation("RahulShetty20", "* Invalid Coupon");
    await checkout.placeOrder();

    const thankyou = new ConformationPage(page);
    await thankyou.validatemessage("Thankyou")
    const orderNo = await thankyou.orderno();
    await thankyou.validateproductname(data.productName);
    await thankyou.navigateToOrders();
    const orderspage = new OrdersPage(page);
    await orderspage.viewbutton(orderNo);
    await orderspage.validateordernumber(orderNo)

});


customtest("End to End testdata from extends fixture", async ({ page, testDataForOrder }) => {

    //await page.pause();
    const loginpage = new LoginPage(page);
    await loginpage.gotourl();
    await loginpage.validlogin(testDataForOrder.email, testDataForOrder.password);
    const dashboardpage = new DashboardPage(page);
    // await page.pause();
    await dashboardpage.searchproduct(testDataForOrder.productName);
    await dashboardpage.navigateToCart();

    const cartpage = new CartPage(page)
    //await page.pause();
    await cartpage.validateProduct(testDataForOrder.productName)
    await cartpage.navigateToCheckout();


    const checkout = new CheckOutPage(page);
    await checkout.selectCountry("ind", " India")
    await checkout.cardnumber("4542 9931 9292 2293");
    await checkout.expirydate("07", "22");
    await checkout.cvvcode("1234");
    await checkout.name("Lokesh koli");
    await checkout.couponValidation("RahulShetty20", "* Invalid Coupon");
    await checkout.placeOrder();

    const thankyou = new ConformationPage(page);
    await thankyou.validatemessage("Thankyou")
    const orderNo = await thankyou.orderno();
    await thankyou.validateproductname(testDataForOrder.productName);
    await thankyou.navigateToOrders();
    const orderspage = new OrdersPage(page);
    await orderspage.viewbutton(orderNo);
    await orderspage.validateordernumber(orderNo)

});

for (const dataset of datasetm) {
    test(`@Sanity End to End test with mutiple data set1 ${dataset.productName}`, async ({ page }) => {

        //error got duplicate title
        const email = "lokeshk20892@gmail.com";
        const password = "Mahindra@123";
        const productName = 'ZARA COAT 3';
        //await page.pause();
        const loginpage = new LoginPage(page);
        await loginpage.gotourl();
        await loginpage.validlogin(dataset.email, dataset.password);
        const dashboardpage = new DashboardPage(page);
        // await page.pause();
        await dashboardpage.searchproduct(dataset.productName);
        await dashboardpage.navigateToCart();

        const cartpage = new CartPage(page)
        //await page.pause();
        await cartpage.validateProduct(dataset.productName)
        await cartpage.navigateToCheckout();


        const checkout = new CheckOutPage(page);
        await checkout.selectCountry("ind", " India")
        await checkout.cardnumber("4542 9931 9292 2293");
        await checkout.expirydate("07", "22");
        await checkout.cvvcode("1234");
        await checkout.name("Lokesh koli");
        await checkout.couponValidation("RahulShetty20", "* Invalid Coupon");
        await checkout.placeOrder();

        const thankyou = new ConformationPage(page);
        await thankyou.validatemessage("Thankyou")
        const orderNo = await thankyou.orderno();
        await thankyou.validateproductname(dataset.productName);
        await thankyou.navigateToOrders();
        const orderspage = new OrdersPage(page);
        await orderspage.viewbutton(orderNo);
        await orderspage.validateordernumber(orderNo)

    });
}


test('@Web test Client App login', async ({ page }) => {
    //js file- Login js, DashboardPage
    const email = "lokeshk20892@gmail.com";
    const productName = 'ZARA COAT 3';
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Mahindra@123");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
    const count = await products.count();
    for (let i = 0; i < count; ++i) {
        if (await products.nth(i).locator("b").textContent() === productName) {
            //add to cart
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }

    await page.locator("[routerlink*='cart']").click();
    //await page.pause();

    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();

    await page.getByPlaceholder('Select Country').pressSequentially("ind", { delay: 150 })
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    for (let i = 0; i < optionsCount; ++i) {
        const text = await dropdown.locator("button").nth(i).textContent();
        if (text === " India") {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }

    expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);

    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");


    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();

});

test.only("Test with POManager", async ({ page }) => {


    const email = "lokeshk20892@gmail.com";
    const password = "Mahindra@123";
    const productName = 'ZARA COAT 3';
    //await page.pause();
    const pageManager= new PageManager(page);
    const loginpage = pageManager.LoginPage();
    await loginpage.gotourl();
    await loginpage.validlogin(data.email, data.password);
    const dashboardpage = pageManager.DashBoard();
    // await page.pause();
    await dashboardpage.searchproduct(data.productName);
    await dashboardpage.navigateToCart();

    const cartpage = pageManager.CartPage()
    //await page.pause();
    await cartpage.validateProduct(data.productName)
    await cartpage.navigateToCheckout();


    const checkout = pageManager.CheckoutPage();
    await checkout.selectCountry("ind", " India")
    await checkout.cardnumber("4542 9931 9292 2293");
    await checkout.expirydate("07", "22");
    await checkout.cvvcode("1234");
    await checkout.name("Lokesh koli");
    await checkout.couponValidation("RahulShetty20", "* Invalid Coupon");
    await checkout.placeOrder();

    const thankyou = pageManager.ConformattionPage();
    await thankyou.validatemessage("Thankyou")
    const orderNo = await thankyou.orderno();
    await thankyou.validateproductname(data.productName);
    await thankyou.navigateToOrders();
    const orderspage = pageManager.OrdersPage();
    await orderspage.viewbutton(orderNo);
    await orderspage.validateordernumber(orderNo)

});