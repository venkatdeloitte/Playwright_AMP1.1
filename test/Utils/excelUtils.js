const ExcelJS = require('exceljs');

async function writeDataToExcel(data, filePath) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Products');

    worksheet.columns = [
        { header: 'Name', key: 'name', width: 30 },
        { header: 'Price', key: 'price', width: 15 }
    ];

    data.forEach(item => {
        worksheet.addRow(item);
    });

    await workbook.xlsx.writeFile(filePath);
}
async function readDataFromExcel(filePath) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Products');
    const data = [];

    worksheet.eachRow((row, rowNumber) => {
        if (rowNumber > 1) { // Skip header row
            data.push({
                name: row.getCell(1).value,
                price: row.getCell(2).value
            });
        }
    });

    return data;
}

module.exports = { writeDataToExcel, readDataFromExcel };