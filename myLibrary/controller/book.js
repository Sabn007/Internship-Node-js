const path = require("path");
const fs = require("fs");
const Author = require("../models/author");
const Book = require("../models/book");
const uploadPath = path.join("public", Book.coverImageBasePath);

exports.newBook = async (req, res) => {
  try {
    // console.log(req.params)
    //    const book =await  Book.findById(req.params.id)
    //    console.log('book', book)
    renderNewPage(res, {});
  } catch {
    res.redirect("/");
  }
};

exports.allBook = async (req, res) => {
  let query = Book.find();
  if (req.query.title != null && req.query.title != " ") {
    query = query.regex("title", new RegExp(req.query.title, "i"));
  }
  if (req.query.publishBefore != null && req.query.publishBefore != " ") {
    query = query.lte("publishDate", req.query.publishBefore);
  }
  if (req.query.publishAfter != null && req.query.publishAfter != " ") {
    query = query.gte("publishDate", req.query.publishAfter);
  }

  try {
    const books = await query.exec();
    res.render("books/index", {
      books: books,
      searchOptions: req.query,
    });
  } catch {
    res.redirect("/");
  }
};
exports.createBook = async (req, res) => {
  const fileName = req.file != null ? req.file.filename : null;
  console.log("req.file", req.file);
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    publishDate: req.body.publishDate,
    pageCount: req.body.pageCount,
    coverImageName: {
      path: req.file.mimetype,
      // originalName: req.file.originalName,
      mimetype: req.file.mimetype,
    },
    description: req.body.description,
  });
  try {
    console.log("book data", book);
    const newBook = await book.save();
    res.redirect("/books");
  } catch (err) {
    console.log(err);
    if (book.coverImageName != null) {
      removeBookCover(book.coverImage);
    }
    renderNewPage(res, book, true);
  }
};

function removeBookCover(fileName) {
  fs.unlink(path.join(uploadPath, fileName), (err) => {
    if (err) console.error(err);
  });
}
exports.editBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    renderEditPage(res, book);
  } catch {
    res.redirect("/");
  }
};

async function renderNewPage(res, book, hasError = false) {
  renderFormPage(res, book, "new", hasError);
}
async function renderEditPage(res, book, hasError = false) {
  renderFormPage(res, book, "edit", hasError);
}

exports.getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate("author").exec();
    res.render("books/show", { book: book });
  } catch {
    res.redirect("/");
  }
};

async function renderFormPage(res, book, form, hasError = false) {
  try {
    const authors = await Author.find({});
    const params = {
      authors: authors,
      book: book,
    };
    if (hasError) params.errorMessage = "Error Creating Book";
    res.render(`books/${form}`, params);
  } catch {
    res.redirect("/books");
  }
}
