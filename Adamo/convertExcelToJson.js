import { createRequire } from 'module';
const require = createRequire(
    import.meta.url);
const xlsx = require('xlsx');
import fs from 'fs';

// Cargar el archivo de Excel
const workbook = xlsx.readFile('./src/components/ADAMOTOTAL.xlsx');

// Convertir cada hoja en un JSON y guardarla en un archivo
workbook.SheetNames.forEach(sheetName => {
    const jsonData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
    fs.writeFileSync(`./${sheetName}.json`, JSON.stringify(jsonData, null, 2));
});

console.log('Datos convertidos a JSON con éxito.');