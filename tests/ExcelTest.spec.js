const ExclUtils = require('exceljs');
const { writeFile } = require('node:fs');
const { test, expect, request } = require('@playwright/test');

async function excelUtil(replaceText, replaceWithText, change, path) {


    const workBook = new ExclUtils.Workbook();
    await workBook.xlsx.readFile(path);
    const workSheet = await workBook.getWorksheet('Sheet1');
    const output = await readExcel(workSheet, replaceText)


    const cellValue = await workSheet.getCell(output.row, output.col + change.colume);
    cellValue.value = replaceWithText;
    await workBook.xlsx.writeFile(path);
    //await getCellValue(workSheet);
}

async function readExcel(workSheet, replaceText) {

    let output = { row: -1, col: -1 }
    await workSheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, cellNumber) => {
            if (cell.value === replaceText) {
                output = { row: rowNumber, col: cellNumber }
            }
        })
    })
    return output;
}

async function getCellValue(workSheet) {
    await workSheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, cellNumber) => {
            console.log(cell.value)
        })
    })
}

test('Excel Test', async({ page }) => {

     const textSearch = 'Mango';
  const updateValue = '351';
    await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html');
    const download = page.waitForEvent('download');
    //await page.getByRole('button', { name: 'Download' }).click();
    //
    //   await page.pause();
    await page.getByRole('button', { name: 'Download' }).click();
  
    const dl = await download;
    const filePath = 'C:\\Users\\DELL\\Downloads\\download.xlsx';
    //console.log(dl.path());
    await excelUtil(textSearch, updateValue, { row: 0, colume: 2 }, filePath);
    await page.locator('#fileinput').setInputFiles(filePath);
   // const value=await page.getByText(textSearch);
    const row=await page.getByRole('row').filter({has: page.getByText(textSearch)});
     await expect(row.locator('#cell-4-undefined')).toContainText(updateValue);

     // const desiredRow = await page.getByRole('row').filter({ has: page.getByText(textSearch) });
  //await expect(desiredRow.locator('#cell-4-undefined')).toContainText(updateValue);
})

