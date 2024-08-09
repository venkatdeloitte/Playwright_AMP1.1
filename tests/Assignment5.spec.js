const { test, expect } = require('@playwright/test');
const ExcelJS = require('exceljs');

async function readAndUpdateExcelFile(filePath) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);

    const worksheet = workbook.getWorksheet(1); // Assuming the first sheet
    const row = worksheet.getRow(3); // Accessing the 3rd row
    const priceCell = row.getCell('D'); // Assuming the price is in column B

    console.log(`Original Price: ${priceCell.value}`);

    // Update the price to 600
    priceCell.value = 600;
    row.commit(); // Commit the changes

    // Save the updated Excel file
    await workbook.xlsx.writeFile(filePath);

    // Reload the workbook to validate the update
    const updatedWorkbook = new ExcelJS.Workbook();
    await updatedWorkbook.xlsx.readFile(filePath);
    const updatedWorksheet = updatedWorkbook.getWorksheet(1);
    const updatedRow = updatedWorksheet.getRow(3);
    const updatedPriceCell = updatedRow.getCell('D');

    console.log(`Updated Price: ${updatedPriceCell.value}`);

    // Validate the updated price
    expect(updatedPriceCell.value).toBe(600);
}

test('should update the price in the 3rd row to 600 and validate', async () => {
    const filePath = '/Users/vencs/Documents/Frameworks/ExcelAssessment.xlsx';
    await readAndUpdateExcelFile(filePath);
});