import React from "react";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import ReactExport from "react-data-export";
import dayjs from "dayjs";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const EvaluationExcel = ({ filename }) => {
  const evaluationUserList = useSelector((state) => state.evaluationUserList);
  const { evaluations } = evaluationUserList;

  const evaluationRatingsListAll = useSelector(
    (state) => state.evaluationRatingsListAll
  );
  const { ratings } = evaluationRatingsListAll;

  return (
    <>
      {evaluations.length > 0 && ratings.length > 0 && (
        <ExcelFile
          element={<Button variant='info'>Export to Excel</Button>}
          filename={filename}
        >
          <ExcelSheet data={evaluations} name='Employee Evaluations'>
            <ExcelColumn label='Total Points' value='total' />
            <ExcelColumn label='QCE Points' value='qce' />
            <ExcelColumn label='Rank' value='rank' />
            <ExcelColumn label='Verified By' value='verifiedBy' />
            <ExcelColumn
              label='Date Verified'
              value={(col) => dayjs(col.createdAt).format("MMMM D, YYYY")}
            />
          </ExcelSheet>

          <ExcelSheet data={ratings} name='Employee Ratings'>
            <ExcelColumn
              label='Educational Qualification'
              value='educationalQualification'
            />
            <ExcelColumn
              label='Academic Experience'
              value='academicExperience'
            />
            <ExcelColumn
              label='Professional Achievement'
              value='professionalAchievement'
            />
            <ExcelColumn label='Rated By' value='evaluatedBy' />
            <ExcelColumn
              label='Verified'
              value={(col) => (col.verified ? "Yes" : "No")}
            />
            <ExcelColumn
              label='Date Rated'
              value={(col) => dayjs(col.createdAt).format("MMMM D, YYYY")}
            />
          </ExcelSheet>
        </ExcelFile>
      )}
    </>
  );
};

export default EvaluationExcel;
