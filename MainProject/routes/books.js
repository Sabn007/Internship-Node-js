const express = require("express");
const router = express.Router();
const { requireAuth, checkUser } = require("../middleware/authMiddleware");
const multer = require("multer");
const path = require("path");
const Book = require("../models/book");
const {
  createBook,
  allBook,
  newBook,
  getBook,
  editBook,
  updateBook,
  deleteBook,
} = require("../controller/book");
const uploadPath = path.join("public", Book.coverImageBasePath);
const imageMimeTypes = ["image/jpeg", "image/png", "image/gif"];
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "--" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (imageMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });
// const upload = multer({
//   dest: uploadPath,
//   filename: function (req, file, cb) {
//       console.log('file', file)
//     cb(null, file.fieldname + Date.now() + path.extname(file.originalName))
//   },
//   fileFilter: (req, file, callback) => {
//     callback(null, imageMimeTypes.includes(file.mimetype));
//   },
// });

//All Book Route
router.get("/", requireAuth, allBook);

//new Book route
router.get("/new", requireAuth, newBook);

//Create Book route
router.post("/", upload.single("cover"), requireAuth, createBook);

router.get("/:id", getBook);

router.get("/:id/edit", requireAuth, editBook);

router.put("/:id", upload.single("cover"), requireAuth, updateBook);
router.delete("/:id", requireAuth, deleteBook);

module.exports = router;
