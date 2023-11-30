import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() {

  }

  async generateExcel(usuarios: Usuario[]) {


    // Excel Title, Header, Data
    const title = 'Lista de Pacientes';
    const header = ['Nombre', 'Apellido', 'DNI', 'Edad', 'O. Social', 'Email'];

    const dataUsuarios = [];

    usuarios.forEach(u => {
      if(u.rol === 'paciente') {
        const usr = [u.nombre, u.apellido, u.dni, u.edad, u.obraSocial, u.email];
        dataUsuarios.push(usr);
      }
    });

    const data = dataUsuarios;
    
    /*const data = [
    [2019, 1, '50', '20', '25', '20'],
    [2019, 2, '80', '20', '25', '20'],
    [2019, 3, '120', '20', '25', '20'],  
    [2019, 4, '75', '20', '25', '20'],  
    [2019, 5, '60', '20', '25', '20'],  
    [2019, 6, '80', '20', '25', '20'],  
    [2019, 7, '95', '20', '25', '20'],  
    [2019, 8, '55', '20', '25', '20'],  
    [2019, 9, '45', '20', '25', '20'],  
    [2019, 10, '80', '20', '25', '20'],  
    [2019, 11, '90', '20', '25', '20'],  
    [2019, 12, '110', '20', '25', '20'],      
  ];*/
  

    // Create workbook and worksheet
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('PACIENTES');


// Add Row and formatting
    const titleRow = worksheet.addRow([title]);
    titleRow.font = { name: 'Corbel', family: 4, size: 16, underline: 'double', bold: true };
    worksheet.addRow([]);
    const subTitleRow = worksheet.addRow(['Date : 06-09-2020']);

    worksheet.mergeCells('A1:D2');


// Blank Row
    worksheet.addRow([]);

// Add Header Row
    const headerRow = worksheet.addRow(header);

// Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
  cell.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFFFFF00' },
    bgColor: { argb: 'FF0000FF' }
  };
  cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
});

// Add Data and Conditional Formatting
    data.forEach(d => {
  const row = worksheet.addRow(d);
  /*const qty = row.getCell(5);
  let color = 'FF99FF99';
  if (+qty.value < 500) {
    color = 'FF9999';
  }

  qty.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: color }
  };*/
}

);

    worksheet.getColumn(1).width = 30;
    worksheet.getColumn(2).width = 30;
    worksheet.getColumn(5).width = 20;
    worksheet.getColumn(6).width = 30;
    worksheet.addRow([]);




// Footer Row
    const footerRow = worksheet.addRow(['This is system generated excel sheet.']);
    footerRow.getCell(1).fill = {
  type: 'pattern',
  pattern: 'solid',
  fgColor: { argb: 'FFCCFFE5' }
};
    footerRow.getCell(1).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

// Merge Cells
    worksheet.mergeCells(`A${footerRow.number}:F${footerRow.number}`);






    const title2 = 'Lista de Especialistas';
    const header2 = ['Nombre', 'Apellido', 'DNI', 'Edad', 'Especialidad', 'Email'];

    const dataUsuarios2 = [];

    usuarios.forEach(u => {
      if(u.rol === 'especialista') {
        const usr = [u.nombre, u.apellido, u.dni, u.edad, u.especialidad, u.email];
        dataUsuarios2.push(usr);
      }
    });

    const data2 = dataUsuarios2;
    
    /*const data = [
    [2019, 1, '50', '20', '25', '20'],
    [2019, 2, '80', '20', '25', '20'],
    [2019, 3, '120', '20', '25', '20'],  
    [2019, 4, '75', '20', '25', '20'],  
    [2019, 5, '60', '20', '25', '20'],  
    [2019, 6, '80', '20', '25', '20'],  
    [2019, 7, '95', '20', '25', '20'],  
    [2019, 8, '55', '20', '25', '20'],  
    [2019, 9, '45', '20', '25', '20'],  
    [2019, 10, '80', '20', '25', '20'],  
    [2019, 11, '90', '20', '25', '20'],  
    [2019, 12, '110', '20', '25', '20'],      
  ];*/
  

    // Create workbook and worksheet
    const worksheet2 = workbook.addWorksheet('ESPECIALISTAS');


// Add Row and formatting
    const titleRow2 = worksheet2.addRow([title2]);
    titleRow2.font = { name: 'Corbel', family: 4, size: 16, underline: 'double', bold: true };
    worksheet2.addRow([]);
    const subTitleRow2 = worksheet2.addRow(['Date : 06-09-2020']);

    worksheet2.mergeCells('A1:D2');


// Blank Row
    worksheet2.addRow([]);

// Add Header Row
    const headerRow2 = worksheet2.addRow(header2);

// Cell Style : Fill and Border
    headerRow2.eachCell((cell, number) => {
  cell.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFFFFF00' },
    bgColor: { argb: 'FF0000FF' }
  };
  cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
});

// Add Data and Conditional Formatting
    data2.forEach(d => {
  const row = worksheet2.addRow(d);
  /*const qty = row.getCell(5);
  let color = 'FF99FF99';
  if (+qty.value < 500) {
    color = 'FF9999';
  }

  qty.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: color }
  };*/
}

);

    worksheet2.getColumn(1).width = 30;
    worksheet2.getColumn(2).width = 30;
    worksheet2.getColumn(5).width = 20;
    worksheet2.getColumn(6).width = 30;
    worksheet2.addRow([]);




// Footer Row
    const footerRow2 = worksheet2.addRow(['This is system generated excel sheet.']);
    footerRow2.getCell(1).fill = {
  type: 'pattern',
  pattern: 'solid',
  fgColor: { argb: 'FFCCFFE5' }
};
    footerRow2.getCell(1).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

// Merge Cells
    worksheet.mergeCells(`A${footerRow2.number}:F${footerRow2.number}`);




// Generate Excel File with given name
    workbook.xlsx.writeBuffer().then((data: any) => {
  const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  fs.saveAs(blob, 'SocialShare.xlsx');
});

  }
}