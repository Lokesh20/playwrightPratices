const { test, expect } = require('@playwright/test');

test("Handle Calendra", async ({ page }) => {
    const day = "10";
    const month = "10";
    const year = "2037";
    const expectedList = [month, day, year];

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator("button.react-date-picker__calendar-button").click();
    await page.locator(".react-calendar__navigation__label__labelText--from").click();
    await page.locator(".react-calendar__navigation__label__labelText--from").click();

    let yearFirst = await page.locator(".react-calendar__navigation__label__labelText--from").textContent();
    let first = yearFirst.split(" ")[0];
    let second = yearFirst.split(" ")[2];

    while (parseInt(first) > parseInt(year)) {


        await page.locator(".react-calendar__navigation__prev-button").click();
        yearFirst = await page.locator(".react-calendar__navigation__label__labelText--from").textContent();
        first = yearFirst.split(" ")[0];
        second = yearFirst.split(" ")[2];
    }

    while (parseInt(second) < parseInt(year)) {


        await page.locator(".react-calendar__navigation__next-button").click();
        yearFirst = await page.locator(".react-calendar__navigation__label__labelText--from").textContent();
        first = yearFirst.split(" ")[0];
        second = yearFirst.split(" ")[2];
    }

    await page.getByRole("button", { name: year }).click();
    await page.locator("button.react-calendar__tile").nth(parseInt(month) - 1).click();
    await page.locator(`button.react-calendar__tile:not(.react-calendar__month-view__days__day--neighboringMonth) abbr:text-is("${day}")`).click();
    const dateValue = await page.locator("input.react-date-picker__inputGroup__input");
    for (let i = 0; i < expectedList.length; i++) {
        const getDateValue = await dateValue.nth(i).inputValue();

        expect(getDateValue).toEqual(expectedList[i]);
    }








});