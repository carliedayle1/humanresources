import express from "express";
import path from "path";
import multer from "multer";

const router = express.Router();

const document = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/documents");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only!");
  }
}

const upload = multer({
  storage: document,
  // fileFilter: function (req, file, cb) {
  //   checkFileType(file, cb);
  // },
});

router.post("/document", upload.single("document"), (req, res) => {
  res.send(`/${req.file.path}`);
});

export default router;
