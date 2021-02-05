import React from "react";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import ReactExport from "react-data-export";
import dayjs from "dayjs";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const UsersAllReportExcel = () => {
  const usersAllReport = useSelector((state) => state.usersAllReport);
  const { users } = usersAllReport;

  return (
    <>
      {users && users.length > 0 && (
        <ExcelFile
          element={
            <Button variant='success' className='btn btn-lg'>
              Export to Excel
            </Button>
          }
          filename={`All Accounts - ${dayjs().format("MM/DD/YYYY")}`}
        >
          <ExcelSheet data={users} name='Leave Credits History'>
            <ExcelColumn label='ID Number' value={(col) => col.user.idNumber} />
            <ExcelColumn
              label='Name'
              value={(col) =>
                `${col.user.lastname}, ${col.user.firstname} ${col.user.middlename}`
              }
            />
            <ExcelColumn label='Email' value='email' />
            <ExcelColumn label='Position Type' value='position' />
            <ExcelColumn label='Campus' value='campus' />
            <ExcelColumn
              label='Date Hired'
              value={(col) => dayjs(col.dateHired).format("MMMM D, YYYY")}
            />
          </ExcelSheet>
        </ExcelFile>
      )}
    </>
  );
};

export default UsersAllReportExcel;
