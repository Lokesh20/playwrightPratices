const { test, expect, request } = require('@playwright/test');
const {APIUtile}=require('./APIUtile');

const loginPayload = { userEmail: "lokeshk20892@gmail.com", userPassword: "Mahindra@123" };
const orderPayload={orders:[{country:"India",productOrderedId:"6960eac0c941646b7a8b3e68"}]}
let response;
const fakePayLoadOrders = { data: [], message: "No Orders" };


test.beforeAll(async () => {
    
    const apirequest = await request.newContext();
   const apiutile=new APIUtile(apirequest,loginPayload)
    response=await apiutile.createOrder(orderPayload);
})



test("End to End", async ({ page }) => {

    
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value)
    },response.token);

     //route method help us re-route the url
    // under route needed to give which url we want reroute and how
    // below we want response we want ot change when there is no order
    // in fullfilled we have passed orginal response and fake response which we want to bypass no order message
    //full filled method accept value in json format
     //intercepting response -APi response-> { playwright fakeresponse}->browser->render data on front end

    page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route =>
        {
            const response=await page.request.fetch(route.request());
            const body=JSON.stringify(fakePayLoadOrders);
            route.fulfill({
                response,
                body,
            })
        }
    )

    await page.goto("https://rahulshettyacademy.com/client/#/dashboard/myorders");
   
    //await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/6a43f30c2f83141cc78ea8d3")
 
  console.log(await page.locator(".mt-4").textContent());
  //await page.pause();

});