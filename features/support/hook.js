const { After, Before, BeforeStep, AfterStep,Status, BeforeAll,AfterAll } = require('@cucumber/cucumber');
const playwright = require('playwright');
const { PageManager } = require('../../pageobject/PageManager');

Before({tags:"@Validation"},async function () {
    //this will execute before the each sceanrio
    this.browser = await playwright.chromium.launch({ headless: false });
    const context = await this.browser.newContext();
    this.page = await context.newPage();
    this.pageManager = new PageManager(this.page);

});

After({tags:"@Validation"},async function(){
     //this will execute after the each sceanrio
    console.log("Close the browser")
     await this.browser.close();
})

BeforeStep(function(){
    // This hook will be executed before all steps in a scenario with tag @foo
    //console.log("This will execute before the start of each step")
})

AfterStep(async function({result}){
      // This hook will be executed after all steps, and take a screenshot on step failure
  if (result.status === Status.FAILED) {
    await this.page.screenshot({path:'screenshot1.png'});
  }
})

BeforeAll(function () {
    // Runs once before all scenarios
    console.log("Starting test suite...");
});

AfterAll(function () {
    // Runs once after all scenarios
    console.log("Finished test suite.");
});