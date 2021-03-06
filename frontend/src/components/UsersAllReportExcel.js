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
              All Accounts to Excel
            </Button>
          }
          filename={`All Accounts - ${dayjs().format("MM/DD/YYYY")}`}
        >
          <ExcelSheet data={users} name='Leave Credits History'>
            <ExcelColumn label='ID Number' value={(col) => col.idNumber} />
            <ExcelColumn
              label='Name'
              value={(col) =>
                `${col.lastname}, ${col.firstname} ${col.middlename}`
              }
            />
            <ExcelColumn label='Email' value='email' />
            <ExcelColumn label='Position Type' value='position' />
            <ExcelColumn label='Campus' value='campus' />
            <ExcelColumn label='Total Evaluation Points' value='evalPoints' />
            <ExcelColumn
              label='Years of Service'
              value={(col) =>
                Math.floor(
                  (dayjs().valueOf - dayjs(col.dateHired).valueOf()) /
                    31536000000
                )
              }
            />
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
