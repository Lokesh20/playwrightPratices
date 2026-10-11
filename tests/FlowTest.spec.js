const { test, expect } = require('@playwright/test');

test("@Web End to End", async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    const email = "lokeshk20892@gmail.com";
    const productName = 'ZARA COAT 3';
    const products = page.locator(".card-body");
    await page.locator("#userEmail").fill(email);
    await page.locator('input#userPassword').fill("Mahindra@123");
    await page.locator("input#login").click();
    await page.waitForLoadState('networkidle');
    await page.locator("div.card-body").first().waitFor();
    const titles = await page.locator(".card-body b").allTextContents();

    console.log(titles);
    const count = await products.count();
    console.log("aa" + count);
    for (let i = 0; i < count; ++i) {
        console.log(await products.nth(i).locator("b").textContent());
        if (await products.nth(i).locator("b").textContent() === productName) {
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }

    await page.locator("[routerlink*='cart']").click();
    //await page.pause();
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible()
    await expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();
    // await page.locator("input[placeholder='Select Country']").click();
    await page.locator("input[placeholder='Select Country']").pressSequentially("ind", { delay: 150 })
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


    await page.locator(".field .input.txt.text-validated").fill("");
    await page.locator(".field .input.txt.text-validated").fill("4542 9931 9292 2293");
    await page.pause();
    await page.locator("select.input.ddl").first().selectOption({ label: "07" });
    await page.locator("select.input.ddl").last().selectOption({ label: "22" });
    await page.locator("input[type='text']").nth(2).fill("1234");
    await page.locator("input[type='text']").nth(3).fill("Lokesh Koli")
    await page.locator("input[name='coupon']").fill("RahulShetty20")
    await page.locator("button.mt-1").click();
    const invalidCouponMessage = await page.locator("p[style*='red']").textContent();
    await expect(invalidCouponMessage).toEqual("* Invalid Coupon");

    await page.locator(".action__submit").click();

    const thankYouMessage = await page.locator("h1.hero-primary").textContent();
    await expect(thankYouMessage).toContain("Thankyou");
    const orderNo = await page.locator("label.ng-star-inserted").textContent();

    const getProductName = await page.locator("div.title", { hasText: productName }).textContent();
    await expect(getProductName).toEqual(productName);

    await page.locator("button[routerlink*='myorder']").click();
    const order = page.locator("tbody tr");
    await order.last().waitFor();
    const orderCount = await order.count();
    for (let i = 0; i < orderCount; ++i) {
        const getOrderNumber = await page.locator("tbody tr th").nth(i).textContent();

        if (orderNo.includes(getOrderNumber)) {

            await page.locator("button.btn-primary").nth(i).click();
            break;

        }
    }

    const finalOrderNumber = await page.locator("div.-main").textContent();
    await expect(orderNo.includes(finalOrderNumber)).toBeTruthy();

});


test('@Web st Client App login', async ({ page }) => {
    //js file- Login js, DashboardPage
    const email = "anshika@gmail.com";
    const productName = 'ZARA COAT 3';
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Iamking@000");
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