const  {test,expect}=require('@playwright/test')


test("Hidden Elment", async ({page})=>
{
await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
const status=await page.getByPlaceholder("Hide/Show Example").isVisible();
await expect(status).toBeTruthy();
await page.locator("#hide-textbox").click();
await page.pause();
const statusCheck=await page.getByPlaceholder("Hide/Show Example").isHidden();
console.log(statusCheck);
})

test("Alert check", async ({page})=>{
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
   page.on('dialog',async dialog =>{
    console.log(await dialog.message());
    await dialog.accept();
   })
   await page.locator('#alertbtn').click();
   await page.pause();
})

test("Alert check with dismiss", async ({page})=>{
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
   page.on('dialog',async dialog =>{
    console.log(await dialog.message());
    await dialog.dismiss();
   })
   await page.locator('#alertbtn').click();
   await page.pause();


})

test("Alert check with message input", async ({page})=>{
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
   page.on('dialog',async dialog =>{
    console.log(await dialog.message());
    await dialog.accept();
   })
   await page.locator('#alertbtn').click();
   await page.pause();
   await page.getByPlaceholder('Enter Your Name').fill('Lokesh');
   await page.locator('#confirmbtn').click();
})

test("Frame count ", async ({page})=>{
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
  console.log(await page.frames())
   for (const frame of page.frames()) {

}
})

test("Frame Action ", async ({page})=>{
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
  const frame= page.frameLocator('#courses-iframe');
  await frame.getByRole('link', { name: 'Courses', exact: true }).click();
  await page.pause();
})