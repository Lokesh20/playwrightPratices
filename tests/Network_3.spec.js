const { test, expect } = require('@playwright/test');
const { request } = require('node:http');

test("End to End", async ({ page }) => {
//to abort the call
//await page.route("**/*.css",route=>route.abort())
await page.route("**/*.{png,jpg,jpeg}",route=> route.abort());

//to capture which are call and what is status code

await  page.on('request',request=>console.log(request.url()));
await page.on('response',response=>console.log(response.url(),response.status()));


    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    const email = "lokeshk20892@gmail.com";
    const productName = 'ZARA COAT 3';
    const products = page.locator(".card-body");
    await page.getByPlaceholder("email@example.com").fill(email);
    await page.getByPlaceholder('enter your passsword').fill("Mahindra@123");
    await page.getByRole("button", { name: 'Login' }).click();
    await expect(page.getByText("Login Successfully")).toBeVisible();

    //On Product Page to add new product
    await page.waitForLoadState('networkidle');
    await page.locator("div.card-body").first().waitFor();
    const titles = await page.locator(".card-body b").allTextContents();
    //await page.locator(".card-body", { hasText: productName }).getByText("Add To Cart").click();
    await products.filter({ hasText: productName }).getByRole("button", { name: ' Add To Cart' }).click();
    await expect(page.getByText("Product Added To Cart")).toBeVisible();

    //navigate to cart page
    await page.getByRole('listitem').getByRole('button', { name: 'Cart' }).click();
    await page.locator("div li").first().waitFor();
    await expect(page.getByText('ZARA COAT 3').isVisible());
    await page.getByText("Checkout").click();
    await page.getByPlaceholder('Select Country').pressSequentially("ind", { delay: 150 })
    await page.getByRole('button', { name: "India" }).nth(1).click();

    //Add card and discount detail and click on placeOrder
    await page.locator(".field .input.txt.text-validated").fill("");
    await page.locator(".field .input.txt.text-validated").fill("4542 9931 9292 2293");
    await page.locator("select.input.ddl").first().selectOption({ label: "07" });
    await page.locator("select.input.ddl").last().selectOption({ label: "22" });
    await page.locator("input[type='text']").nth(2).fill("1234");
    await page.locator("input[type='text']").nth(3).fill("Lokesh Koli")
    await page.locator("input[name='coupon']").fill("RahulShetty20");
    await page.getByRole("button", { name: "Apply Coupon" }).click();
    expect(await page.getByText('* Invalid Coupon').isVisible());
    await page.getByText('Place Order ').click();

    //expect(await page.locator("h1.hero-primary").textContent()).toContain("Thankyou");
    expect(await page.getByRole("heading", { level: 1 }).textContent()).toContain("Thankyou");
    const orderNo = await page.locator("label.ng-star-inserted").textContent();
    expect(await page.locator("div.title", { hasText: productName }).textContent()).toEqual(productName);

    //Naviagte to Orders page and validate order and click on view Button
    await page.getByRole('button', { name: 'ORDERS' }).click();
    const cleanOrderNo = orderNo.trim().replace(/\|/g, '');
    await page.locator("tbody tr", { hasText: cleanOrderNo }).getByRole("button", { name: "View" }).click();

    //validate order number on view button
    const finalOrderNumber = await page.locator("div.-main").textContent();
    await expect(orderNo.includes(finalOrderNumber)).toBeTruthy();
    await expect(page.getByText(cleanOrderNo.trim()).isVisible());

});