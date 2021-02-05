import React from "react";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import ReactExport from "react-data-export";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const EmployeesExcel = ({ filename }) => {
  const userList = useSelector((state) => state.userList);
  const { users } = userList;

  return (
    <ExcelFile
      element={
        <Button variant='success' className='btn btn-lg'>
          Export to Excel
        </Button>
      }
      filename={filename}
    >
      <ExcelSheet data={users} name='Employees'>
        <ExcelColumn label='ID Number' value='idNumber' />
        <ExcelColumn label='Name' value='name' />
        <ExcelColumn label='Email' value='email' />
        <ExcelColumn label='College' value='college' />
        <ExcelColumn label='Campus' value='campus' />
        <ExcelColumn label='Position' value='position' />
        <ExcelColumn label='Rank' value='rank' />
        <ExcelColumn label='Leave Credits' value='leaveCredits' />
      </ExcelSheet>
    </ExcelFile>
  );
};

export default EmployeesExcel;
