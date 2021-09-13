const mongoose = require('mongoose')
const coverImageBasePath = 'uploads/bookCovers' 

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  publishDate: {
    type: Date,
    required: true
  },
  pageCount: {
    type: Number,
    required: true
  },
  
  coverImageName: {
    type: String,
    required: true
  },
  
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Author'
  }
})

module.exports = mongoose.model('Book', bookSchema)

module.exports.coverImageBasePath = coverImageBasePath