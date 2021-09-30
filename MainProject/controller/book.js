const path = require("path");
const fs = require("fs");
const Author = require("../models/author");
const Book = require("../models/book");
const uploadPath = path.join("public", Book.coverImageBasePath);
const { isEmpty } = require("lodash");

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
  let newPath = req.file.path.replace(/[/\/]/g, "/");
  newPath = newPath.slice(6);

  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    publishDate: req.body.publishDate,
    pageCount: req.body.pageCount,
    coverImageName: {
      path: newPath,
      // originalName: req.file.originalName,
      mimetype: req.file.mimetype,
    },
    description: req.body.description,
  });
  try {
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

exports.updateBook = async (req, res) => {
  let newImage = req.file;
  // console.log('newImage', req)
  let book;
  try {
    book = await Book.findById(req.params.id);
    // console.log('books', book)
    book.title = req.body.title;
    book.author = req.body.author;
    book.publishDate = new Date(req.body.publishDate);
    book.pageCount = req.body.pageCount;
    book.description = req.body.description;
    if (newImage) {
      let newPath = req.file.path.replace(/[/\/]/g, "/");
      newPath = newPath.slice(6);
      book.coverImageName = {
        path: newPath,
        mimetype: req.file.mimetype,
      }
      try {
        fs.unlinkSync('./' + req.body.old_image)
      } catch (err) {
        console.log(err);
      }
    }else{
      new_image = req.body.old_image
    }
    await book.save();
    res.redirect(`/books/${book.id}`);
  } catch {
    if (book != null) {
      renderEditPage(res, book, true);
    } else {
      redirect("/");
    }
  }
};
exports.deleteBook = async (req, res) => {
  let book;
  try {
    book = await Book.findById(req.params.id);
    await book.remove();
    res.redirect("/books");
  } catch {
    if (book != null) {
      res.render("books/show", {
        book: book,
        errorMessage: "Could not remove book",
      });
    } else {
      res.redirect("/");
    }
  }
};
