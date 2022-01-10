const express = require("express")
const router = express.Router()
const {
	getAllBooks,
	getBooks,
	createBook,
	updateBook,
	deleteBook,
} = require("../controllers/bookController")
router.route('/').post(createBook).get(getAllBooks)
router.route('/:id').get(getBooks).delete(deleteBook).patch(updateBook)
module.exports= router