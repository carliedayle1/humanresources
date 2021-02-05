import React from "react";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import ReactExport from "react-data-export";
import dayjs from "dayjs";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const RatingsHistoryExcel = () => {
  const evaluationRatingsList = useSelector(
    (state) => state.evaluationRatingsList
  );
  const { ratings } = evaluationRatingsList;
  return (
    <>
      {ratings && ratings.length > 0 && (
        <ExcelFile
          element={
            <Button variant='success' className='btn btn-lg'>
              Export to Excel
            </Button>
          }
          filename={`Employee Ratings History - ${dayjs().format(
            "MM/DD/YYYY"
          )}`}
        >
          <ExcelSheet data={ratings} name='Leave Credits History'>
            <ExcelColumn label='ID Number' value={(col) => col.user.idNumber} />
            <ExcelColumn
              label='Name'
              value={(col) => `${col.user.lastname}, ${col.user.firstname}`}
            />
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
            <ExcelColumn
              label='Verified'
              value={(col) => (col.verified ? "Yes" : "No")}
            />
            <ExcelColumn label='Evaluated By' value='evaluatedBy' />
            <ExcelColumn
              label='Date Evaluated'
              value={(col) => dayjs(col.createdAt).format("MMMM D, YYYY")}
            />
          </ExcelSheet>
        </ExcelFile>
      )}
    </>
  );
};

export default RatingsHistoryExcel;
