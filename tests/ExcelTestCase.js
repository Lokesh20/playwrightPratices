const ExclUtils = require('exceljs');
const { writeFile } = require('node:fs');


async function excelUtil(replaceText, replaceWithText,change, path) {


    const workBook = new ExclUtils.Workbook();
    await workBook.xlsx.readFile(path);
    const workSheet = await workBook.getWorksheet('Sheet1');
    const output = await readExcel(workSheet, replaceText)


    const cellValue = await workSheet.getCell(output.row, output.col+change.colume);
    cellValue.value = replaceWithText;
    await workBook.xlsx.writeFile(path);
    await getCellValue(workSheet);
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

excelUtil('Banana', 333,{row:0,colume:2},"C:\\Users\\DELL\\Downloads\\download.xlsx");


