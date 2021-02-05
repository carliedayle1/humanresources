import React from "react";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import ReactExport from "react-data-export";
import dayjs from "dayjs";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const LeaveCreditHistoryExcel = () => {
  const leaveCreditList = useSelector((state) => state.leaveCreditList);
  const { leaveCredits } = leaveCreditList;

  return (
    <>
      {leaveCredits && leaveCredits.length > 0 && (
        <ExcelFile
          element={
            <Button variant='success' className='btn btn-lg'>
              Export to Excel
            </Button>
          }
          filename={`Leave Credit History - ${dayjs().format("MM/DD/YYYY")}`}
        >
          <ExcelSheet data={leaveCredits} name='Leave Credits History'>
            <ExcelColumn label='ID Number' value={(col) => col.user.idNumber} />
            <ExcelColumn
              label='Name'
              value={(col) => `${col.user.lastname}, ${col.user.firstname}`}
            />
            <ExcelColumn label='Type' value='type' />
            <ExcelColumn label='Particular' value='particular' />
            <ExcelColumn label='Earned' value='earned' />
            <ExcelColumn label='Absences' value='absences' />
            <ExcelColumn label='Balance' value='balance' />
            <ExcelColumn label='Created By' value='createdBy' />
            <ExcelColumn
              label='Date Credited'
              value={(col) => dayjs(col.createdAt).format("MMMM D, YYYY")}
            />
          </ExcelSheet>
        </ExcelFile>
      )}
    </>
  );
};

export default LeaveCreditHistoryExcel;
