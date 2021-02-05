import React from "react";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import ReactExport from "react-data-export";
import dayjs from "dayjs";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const EvaluationHistoryExcel = () => {
  const evaluationList = useSelector((state) => state.evaluationList);
  const { evaluations } = evaluationList;

  return (
    <>
      {evaluations && evaluations.length > 0 && (
        <ExcelFile
          element={
            <Button variant='success' className='btn btn-lg'>
              Export to Excel
            </Button>
          }
          filename={`Employee Evaluations - ${dayjs().format("MM-DD-YYYY")}`}
        >
          <ExcelSheet data={evaluations} name='All Employee Evaluations'>
            <ExcelColumn label='ID Number' value={(col) => col.user.idNumber} />
            <ExcelColumn label='Employee Name' value={(col) => col.user.name} />
            <ExcelColumn label='Total Points' value='total' />
            <ExcelColumn label='QCE Points' value='qce' />
            <ExcelColumn label='Rank' value='rank' />
            <ExcelColumn label='Verified By' value='verifiedBy' />

            <ExcelColumn
              label='Date Verified'
              value={(col) => dayjs(col.createdAt).format("MMMM D, YYYY")}
            />
          </ExcelSheet>
        </ExcelFile>
      )}
    </>
  );
};

export default EvaluationHistoryExcel;
