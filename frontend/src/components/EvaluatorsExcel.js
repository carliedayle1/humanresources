import React from "react";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import ReactExport from "react-data-export";
import dayjs from "dayjs";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const EvaluatorsExcel = () => {
  const evaluatorList = useSelector((state) => state.evaluatorList);
  const { evaluators } = evaluatorList;

  return (
    <>
      {evaluators && evaluators.length > 0 && (
        <ExcelFile
          element={
            <Button variant='success' className='btn btn-large'>
              Export to Excel
            </Button>
          }
          filename={`Evaluators List - ${dayjs().format("MM/DD/YYYY")}`}
        >
          <ExcelSheet data={evaluators} name='Employee leave credits'>
            <ExcelColumn label='ID Number' value='idNumber' />
            <ExcelColumn label='Name' value='name' />
            <ExcelColumn label='Email' value='email' />
          </ExcelSheet>
        </ExcelFile>
      )}
    </>
  );
};

export default EvaluatorsExcel;
