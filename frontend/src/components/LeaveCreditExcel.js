import React from "react";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import ReactExport from "react-data-export";
import dayjs from "dayjs";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const LeaveCreditExcel = ({ filename }) => {
  const leaveCreditUserList = useSelector((state) => state.leaveCreditUserList);
  const { leaveCredits } = leaveCreditUserList;

  return (
    <>
      {leaveCredits && leaveCredits.length > 0 && (
        <ExcelFile
          element={<Button variant='info'>Export to Excel</Button>}
          filename={filename}
        >
          <ExcelSheet data={leaveCredits} name='Employee leave credits'>
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

export default LeaveCreditExcel;
