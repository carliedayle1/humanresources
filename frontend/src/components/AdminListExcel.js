import React from "react";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import ReactExport from "react-data-export";
import dayjs from "dayjs";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const AdminListExcel = () => {
  const userAdmins = useSelector((state) => state.userAdmins);
  const { admins } = userAdmins;

  return (
    <>
      {admins && admins.length > 0 && (
        <ExcelFile
          element={
            <Button variant='success' className='btn btn-lg'>
              Export to Excel
            </Button>
          }
          filename={`Campus Admin Accounts - ${dayjs().format("MM-DD-YYYY")}`}
        >
          <ExcelSheet data={admins} name='All Campus Admins'>
            <ExcelColumn label='ID Number' value='idNumber' />
            <ExcelColumn
              label='Employee Name'
              value={(col) => `${col.lastname}, ${col.firstname}`}
            />
            <ExcelColumn label='Campus' value='campus' />
            <ExcelColumn
              label='Date Created'
              value={(col) => dayjs(col.createdAt).format("MMMM D, YYYY")}
            />
          </ExcelSheet>
        </ExcelFile>
      )}
    </>
  );
};

export default AdminListExcel;
