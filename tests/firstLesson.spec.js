import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test("Open the browser", async({browser})=>
{
const context=await browser.newContext();
const page=await context.newPage();
await page.goto("https://playwright.dev/");
 await expect(page).toHaveTitle("Fast and reliable end-to-end testing for modern web apps | Playwright");
});

test("Rahul Shteey", async ({page})=>
{
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
console.log(await page.title());
await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
await page.locator("#username").fill("rahulshettyacademy");
await page.locator("[type='Password']").fill("Learning@830$3mK2");
//select static dropdown with select class
await page.locator("select.form-control").selectOption("consult")
// select radio button
await page.locator("span.checkmark").last().click();
await page.locator("#okayBtn").click();
console.log(await page.locator(".radiotextsty").last().isChecked())// this line is print boolean
await expect(page.locator(".radiotextsty").last()).toBeChecked();


//validate if checkbox is selected
await page.locator("#terms").click();
await expect(page.locator("#terms")).toBeChecked();
await page.locator("#terms").uncheck();
 expect(await page.locator("#terms").isChecked()).toBeFalsy();

 //check binking text
 const blinktext= page.locator("[href*='documents-request']");
 expect (blinktext).toHaveAttribute("class","blinkingText")


 await page.locator("input#signInBtn").click();

//const errorMessage=await page.locator("[style*=block]").textContent();
//console.log(errorMessage);
console.log(await page.locator(".card-body a").first().textContent());
console.log(await page.locator(".card-body a").nth(2).textContent());
console.log(await page.locator(".card-body a").last().textContent());
console.log(await page.locator(".card-body a").allTextContents());
});

test("Window Check", async ({browser})=>{

const browserText=await browser.newContext();
const page=await browserText.newPage();

await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

 const blinktext= page.locator("[href*='documents-request']");
 expect (blinktext).toHaveAttribute("class","blinkingText")

 const [newPage2]=await Promise.all(
 [browserText.waitForEvent("page"),
  blinktext.click(),]);

 await newPage2.bringToFront();
  const text=await newPage2.locator(".red").textContent();
  console.log(text)
  const spitText=text.split("@")[1].split(' ')[0].trim();
  console.log(spitText);

await page.bringToFront();
  await page.locator("#username").fill(spitText);
  console.log(await page.locator("#username").inputValue())
  await page.pause();


});





