const express = require("express");
const {
  allAuthor,
  createAuthor,
  getAuthor,
  editAuthor,
  updateAuthor,
  deleteAuthor,
  showAuthor,
} = require("../controller/author");
const { requireAuth } = require("../middleware/authMiddleware");

const router = express.Router();

//All authors Route
router.get("/", requireAuth, allAuthor);

//new Author route
router.get("/new", requireAuth, getAuthor);

//Create Author route
router.post("/", requireAuth, createAuthor);

router.get("/:id", showAuthor);
router.get("/:id/edit",requireAuth, editAuthor);

router.put("/:id", requireAuth,updateAuthor);
router.delete("/:id", requireAuth,deleteAuthor);

module.exports = router;
