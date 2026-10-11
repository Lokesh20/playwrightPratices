const { test, expect, request } = require('@playwright/test');
const {APIUtile}=require('./APIUtile');

const loginPayload = { userEmail: "lokeshk20892@gmail.com", userPassword: "Mahindra@123" };
const orderPayload={orders:[{country:"India",productOrderedId:"6960eac0c941646b7a8b3e68"}]}
let response;


test.beforeAll(async () => {
    
    const apirequest = await request.newContext();
   const apiutile=new APIUtile(apirequest,loginPayload)
    response=await apiutile.createOrder(orderPayload);
})



test("End to End", async ({ page }) => {

    
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value)
    },response.token);

    await page.goto("https://rahulshettyacademy.com/client/#/dashboard/myorders");
   
    const order = page.locator("tbody tr");
    await order.last().waitFor();
    const orderCount = await order.count();
    for (let i = 0; i < orderCount; ++i) {
        const getOrderNumber = await page.locator("tbody tr th").nth(i).textContent();

        if ( response.orderNumber.includes(getOrderNumber)) {

            await page.locator("button.btn-primary").nth(i).click();
            break;

        }
    }

    const finalOrderNumber = await page.locator("div.-main").textContent();
    await expect( response.orderNumber.includes(finalOrderNumber)).toBeTruthy();

});