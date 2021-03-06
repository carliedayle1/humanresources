import bcrypt from "bcryptjs";
import dayjs from "dayjs";

const users = [
  {
    userType: 0,
    idNumber: "00000",
    firstname: "JANE",
    middlename: "KENNEDY",
    lastname: "DOE",
    dateHired: dayjs().format("MMMM D, YYYY"),
    email: "super_admin@bisu.edu.ph",
    position: 1,
    password: bcrypt.hashSync("SUPERADMIN", 10),
    isAdmin: false,
    isEvaluator: false,
    isSuperAdmin: true,
  },
  {
    userType: 5,
    idNumber: "11111",
    firstname: "JOHN",
    middlename: "KENNEDY",
    lastname: "DOE",
    dateHired: dayjs().format("MMMM D, YYYY"),
    email: "clarin_admin@bisu.edu.ph",
    position: 2,
    rank: "TEACHER 1",
    campus: "CLARIN",
    college: "COLLEGE OF COMPUTER STUDIES",
    program: "SAMPLE PROGRAM",
    password: bcrypt.hashSync("CLARIN", 10),
    isAdmin: true,
    isEvaluator: false,
    isSuperAdmin: false,
  },

  {
    userType: 5,
    idNumber: "22222",
    firstname: "JOSEPH",
    middlename: "KENNEDY",
    lastname: "DOE",
    dateHired: dayjs().format("MMMM D, YYYY"),
    email: "joseph_doe@bisu.edu.ph",
    password: bcrypt.hashSync("DOE", 10),
    isAdmin: false,
    isEvaluator: true,
    isSuperAdmin: false,
  },

  {
    userType: 5,
    idNumber: "33333",
    firstname: "JERRY",
    middlename: "KENNEDY",
    lastname: "DOE",
    dateHired: dayjs().format("MMMM D, YYYY"),
    email: "jerry_doe@bisu.edu.ph",
    position: 3,
    rank: "TEACHER 1",
    campus: "CLARIN",
    college: "COLLEGE OF COMPUTER STUDIES",
    program: "SAMPLE PROGRAM",
    password: bcrypt.hashSync("DOE", 10),
    isAdmin: false,
    isEvaluator: false,
    isSuperAdmin: false,
  },
];

export default users;
