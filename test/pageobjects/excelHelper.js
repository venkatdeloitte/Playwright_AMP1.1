const xlsx = require('xlsx');
const path = require('path');

const filePath = path.resolve(__dirname, '../../productDetails.xlsx');

async function writeToExcel(data) {
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, 'Products');
    xlsx.writeFile(wb, filePath);
}

async function readFromExcel() {
    const wb = xlsx.readFile(filePath);
    const ws = wb.Sheets['Products'];
    return xlsx.utils.sheet_to_json(ws);
}

module.exports = {
    writeToExcel,
    readFromExcel
};