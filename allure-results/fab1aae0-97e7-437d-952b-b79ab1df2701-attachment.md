# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: FlowTest.spec.js >> @Web End to End
- Location: tests\FlowTest.spec.js:3:1

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.selectOption: Target page, context or browser has been closed
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - navigation [ref=e5]:
    - generic [ref=e7]:
      - link "Automation Automation Practice":
        - /url: ""
        - generic [ref=e8] [cursor=pointer]:
          - heading "Automation" [level=3] [ref=e9]
          - paragraph [ref=e10]: Automation Practice
    - text: 
    - link "Get Shortlisted by Recruiters - Take QA Skill Assessments on TechSmartHire" [ref=e11] [cursor=pointer]:
      - /url: https://techsmarthire.com/
    - list [ref=e12]:
      - listitem [ref=e13] [cursor=pointer]:
        - button " HOME" [ref=e14]:
          - generic [ref=e15]: 
          - text: HOME
      - listitem
      - listitem [ref=e16] [cursor=pointer]:
        - button " ORDERS" [ref=e17]:
          - generic [ref=e18]: 
          - text: ORDERS
      - listitem [ref=e19] [cursor=pointer]:
        - button " Cart 2" [ref=e20]:
          - generic [ref=e21]: 
          - text: Cart
          - generic [ref=e22]: "2"
      - listitem [ref=e23] [cursor=pointer]:
        - button "Sign Out" [ref=e24]:
          - generic [ref=e25]: 
          - text: Sign Out
  - generic [ref=e28]:
    - generic [ref=e29]:
      - generic [ref=e32]:
        - generic [ref=e33]: iphone 13 pro
        - generic [ref=e34]: $ 55000
        - generic [ref=e35]: "Quantity: 1"
        - list [ref=e37]:
          - listitem [ref=e38]: Apple phone
      - generic [ref=e41]:
        - generic [ref=e42]: ZARA COAT 3
        - generic [ref=e43]: $ 11500
        - generic [ref=e44]: "Quantity: 1"
        - list [ref=e46]:
          - listitem [ref=e47]: Apple phone
    - generic [ref=e50]:
      - generic [ref=e51]: Payment Method
      - generic [ref=e52]:
        - generic [ref=e53] [cursor=pointer]: Credit Card
        - generic [ref=e54] [cursor=pointer]: Paypal
        - generic [ref=e55] [cursor=pointer]: SEPA
        - generic [ref=e56] [cursor=pointer]: Invoice
      - generic [ref=e57]:
        - generic [ref=e58]:
          - generic [ref=e59]: Personal Information
          - generic [ref=e61]:
            - generic [ref=e63]:
              - generic [ref=e64]: Credit Card Number
              - textbox [active] [ref=e65]: 4542 9931 9292 2293
            - generic [ref=e66]:
              - generic [ref=e67]:
                - generic [ref=e68]: Expiry Date
                - combobox [ref=e69]:
                  - option "01" [selected]
                  - option "02"
                  - option "03"
                  - option "04"
                  - option "05"
                  - option "06"
                  - option "07"
                  - option "08"
                  - option "09"
                  - option "10"
                  - option "11"
                  - option "12"
                - combobox [ref=e70]:
                  - option "01"
                  - option "02"
                  - option "03"
                  - option "04"
                  - option "05"
                  - option "06"
                  - option "07"
                  - option "08"
                  - option "09"
                  - option "10"
                  - option "11"
                  - option "12"
                  - option "13"
                  - option "14"
                  - option "15"
                  - option "16" [selected]
                  - option "17"
                  - option "18"
                  - option "19"
                  - option "20"
                  - option "21"
                  - option "22"
                  - option "23"
                  - option "24"
                  - option "25"
                  - option "26"
                  - option "27"
                  - option "28"
                  - option "29"
                  - option "30"
                  - option "31"
              - generic [ref=e71]:
                - generic [ref=e72]: CVV Code ?
                - textbox [ref=e73]
            - generic [ref=e75]:
              - generic [ref=e76]: Name on Card
              - textbox [ref=e77]
            - generic [ref=e78]:
              - generic [ref=e79]:
                - generic [ref=e80]: Apply Coupon
                - textbox [ref=e81]
              - button "Apply Coupon" [ref=e84] [cursor=pointer]
        - generic [ref=e85]:
          - generic [ref=e86]: Shipping Information
          - generic [ref=e88]:
            - generic [ref=e89]: lokeshk20892@gmail.com
            - textbox [ref=e90]: lokeshk20892@gmail.com
            - textbox "Select Country" [ref=e93]: India
            - generic [ref=e95] [cursor=pointer]: Place Order
```

# Test source

```ts
  1   | const { test, expect } = require('@playwright/test');
  2   | 
  3   | test("@Web End to End", async ({ page }) => {
  4   | 
  5   |     await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  6   |     const email = "lokeshk20892@gmail.com";
  7   |     const productName = 'ZARA COAT 3';
  8   |     const products = page.locator(".card-body");
  9   |     await page.locator("#userEmail").fill(email);
  10  |     await page.locator('input#userPassword').fill("Mahindra@123");
  11  |     await page.locator("input#login").click();
  12  |     await page.waitForLoadState('networkidle');
  13  |     await page.locator("div.card-body").first().waitFor();
  14  |     const titles = await page.locator(".card-body b").allTextContents();
  15  | 
  16  |     console.log(titles);
  17  |     const count = await products.count();
  18  |     console.log("aa" + count);
  19  |     for (let i = 0; i < count; ++i) {
  20  |         console.log(await products.nth(i).locator("b").textContent());
  21  |         if (await products.nth(i).locator("b").textContent() === productName) {
  22  |             await products.nth(i).locator("text= Add To Cart").click();
  23  |             break;
  24  |         }
  25  |     }
  26  | 
  27  |     await page.locator("[routerlink*='cart']").click();
  28  |     //await page.pause();
  29  |     await page.locator("div li").first().waitFor();
  30  |     const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible()
  31  |     await expect(bool).toBeTruthy();
  32  |     await page.locator("text=Checkout").click();
  33  |     // await page.locator("input[placeholder='Select Country']").click();
  34  |     await page.locator("input[placeholder='Select Country']").pressSequentially("ind", { delay: 150 })
  35  |     const dropdown = page.locator(".ta-results");
  36  |     await dropdown.waitFor();
  37  |     const optionsCount = await dropdown.locator("button").count();
  38  |     for (let i = 0; i < optionsCount; ++i) {
  39  |         const text = await dropdown.locator("button").nth(i).textContent();
  40  |         if (text === " India") {
  41  |             await dropdown.locator("button").nth(i).click();
  42  |             break;
  43  |         }
  44  |     }
  45  | 
  46  | 
  47  |     await page.locator(".field .input.txt.text-validated").fill("");
  48  |     await page.locator(".field .input.txt.text-validated").fill("4542 9931 9292 2293");
  49  |     await page.pause();
> 50  |     await page.locator("select.input.ddl").first().selectOption({ label: "07" });
      |                                                    ^ Error: locator.selectOption: Target page, context or browser has been closed
  51  |     await page.locator("select.input.ddl").last().selectOption({ label: "22" });
  52  |     await page.locator("input[type='text']").nth(2).fill("1234");
  53  |     await page.locator("input[type='text']").nth(3).fill("Lokesh Koli")
  54  |     await page.locator("input[name='coupon']").fill("RahulShetty20")
  55  |     await page.locator("button.mt-1").click();
  56  |     const invalidCouponMessage = await page.locator("p[style*='red']").textContent();
  57  |     await expect(invalidCouponMessage).toEqual("* Invalid Coupon");
  58  | 
  59  |     await page.locator(".action__submit").click();
  60  | 
  61  |     const thankYouMessage = await page.locator("h1.hero-primary").textContent();
  62  |     await expect(thankYouMessage).toContain("Thankyou");
  63  |     const orderNo = await page.locator("label.ng-star-inserted").textContent();
  64  | 
  65  |     const getProductName = await page.locator("div.title", { hasText: productName }).textContent();
  66  |     await expect(getProductName).toEqual(productName);
  67  | 
  68  |     await page.locator("button[routerlink*='myorder']").click();
  69  |     const order = page.locator("tbody tr");
  70  |     await order.last().waitFor();
  71  |     const orderCount = await order.count();
  72  |     for (let i = 0; i < orderCount; ++i) {
  73  |         const getOrderNumber = await page.locator("tbody tr th").nth(i).textContent();
  74  | 
  75  |         if (orderNo.includes(getOrderNumber)) {
  76  | 
  77  |             await page.locator("button.btn-primary").nth(i).click();
  78  |             break;
  79  | 
  80  |         }
  81  |     }
  82  | 
  83  |     const finalOrderNumber = await page.locator("div.-main").textContent();
  84  |     await expect(orderNo.includes(finalOrderNumber)).toBeTruthy();
  85  | 
  86  | });
  87  | 
  88  | 
  89  | test('@Webst Client App login', async ({ page }) => {
  90  |     //js file- Login js, DashboardPage
  91  |     const email = "anshika@gmail.com";
  92  |     const productName = 'ZARA COAT 3';
  93  |     const products = page.locator(".card-body");
  94  |     await page.goto("https://rahulshettyacademy.com/client");
  95  |     await page.locator("#userEmail").fill(email);
  96  |     await page.locator("#userPassword").fill("Iamking@000");
  97  |     await page.locator("[value='Login']").click();
  98  |     await page.waitForLoadState('networkidle');
  99  |     await page.locator(".card-body b").first().waitFor();
  100 |     const titles = await page.locator(".card-body b").allTextContents();
  101 |     console.log(titles);
  102 |     const count = await products.count();
  103 |     for (let i = 0; i < count; ++i) {
  104 |         if (await products.nth(i).locator("b").textContent() === productName) {
  105 |             //add to cart
  106 |             await products.nth(i).locator("text= Add To Cart").click();
  107 |             break;
  108 |         }
  109 |     }
  110 | 
  111 |     await page.locator("[routerlink*='cart']").click();
  112 |     //await page.pause();
  113 | 
  114 |     await page.locator("div li").first().waitFor();
  115 |     const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
  116 |     expect(bool).toBeTruthy();
  117 |     await page.locator("text=Checkout").click();
  118 | 
  119 |     await page.getByPlaceholder('Select Country').pressSequentially("ind", { delay: 150 })
  120 |     const dropdown = page.locator(".ta-results");
  121 |     await dropdown.waitFor();
  122 |     const optionsCount = await dropdown.locator("button").count();
  123 |     for (let i = 0; i < optionsCount; ++i) {
  124 |         const text = await dropdown.locator("button").nth(i).textContent();
  125 |         if (text === " India") {
  126 |             await dropdown.locator("button").nth(i).click();
  127 |             break;
  128 |         }
  129 |     }
  130 | 
  131 |     expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
  132 |     await page.locator(".action__submit").click();
  133 |     await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
  134 |     const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
  135 |     console.log(orderId);
  136 | 
  137 |     await page.locator("button[routerlink*='myorders']").click();
  138 |     await page.locator("tbody").waitFor();
  139 |     const rows = await page.locator("tbody tr");
  140 | 
  141 | 
  142 |     for (let i = 0; i < await rows.count(); ++i) {
  143 |         const rowOrderId = await rows.nth(i).locator("th").textContent();
  144 |         if (orderId.includes(rowOrderId)) {
  145 |             await rows.nth(i).locator("button").first().click();
  146 |             break;
  147 |         }
  148 |     }
  149 |     const orderIdDetails = await page.locator(".col-text").textContent();
  150 |     expect(orderId.includes(orderIdDetails)).toBeTruthy();
```