import React from "react";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import ReactExport from "react-data-export";
import dayjs from "dayjs";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const AllCreditsReportExcel = () => {
  const usersAllCreditsReport = useSelector(
    (state) => state.usersAllCreditsReport
  );
  const { leaveCredits } = usersAllCreditsReport;

  return (
    <>
      {leaveCredits && leaveCredits.length > 0 && (
        <ExcelFile
          element={
            <Button variant='success' className='btn btn-lg'>
              All leave credits to Excel
            </Button>
          }
          filename={`All leave credits - ${dayjs().format("MM/DD/YYYY")}`}
        >
          <ExcelSheet data={leaveCredits} name='Leave Credits History'>
            <ExcelColumn label='ID Number' value={(col) => col.idNumber} />
            <ExcelColumn
              label='Name'
              value={(col) =>
                `${col.lastname}, ${col.firstname} ${col.middlename}`
              }
            />
            <ExcelColumn
              label='Total Leave Credits'
              value={(col) => col.leaveCredits}
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

export default AllCreditsReportExcel;
