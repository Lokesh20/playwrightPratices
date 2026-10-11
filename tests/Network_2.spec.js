const { test, expect, request } = require('@playwright/test');
const { APIUtile } = require('./APIUtile');

const loginPayload = { userEmail: "lokeshk20892@gmail.com", userPassword: "Mahindra@123" };
const orderPayload = { orders: [{ country: "India", productOrderedId: "6960eac0c941646b7a8b3e68" }] }
let response;
const fakePayLoadOrders = { data: [], message: "No Orders" };


test.beforeAll(async () => {

    const apirequest = await request.newContext();
    const apiutile = new APIUtile(apirequest, loginPayload)
    response = await apiutile.createOrder(orderPayload);
})



test("End to End", async ({ page }) => {


    await page.addInitScript(value => {
        window.localStorage.setItem('token', value)
    }, response.token);

    await page.goto("https://rahulshettyacademy.com/client/#/dashboard/myorders");


    //route method help us re-route the url
    // under route needed to give which url we want reroute and how
    // below we want to conitnue with another id so that it will authorized error
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6a4cdb5c85b7749b49d24988' })

    )


    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator("p").last()).toHaveText("You arre not authorize to view this order");
    //await page.pause();

});