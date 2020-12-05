import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("12345", 10),
    profilePicture: "/images/man.png",
    isAdmin: true,
    userType: 1,
  },
  {
    name: "John Doe",
    email: "john@example.com",
    password: bcrypt.hashSync("12345", 10),
    profilePicture: "/images/man.png",
  },
  {
    name: "Jane Doe",
    email: "jane@example.com",
    password: bcrypt.hashSync("12345", 10),
    profilePicture: "/images/man.png",
  },
];

export default users;
