const mongoose = require("mongoose")
const BookSchema = new mongoose.Schema({
	publication: {
		type: String,
		required: [true, "Please provide company name"],
		maxlength: 50,
	},
	author: {
		type: String,
		required: [true, "Please provide position"],
		maxlength: 100,
	},
  status: {
    type: String,
    enum: ['published', 'written', 'underPublished'],
    default:'written',
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required:[true,'Please provide an Object']
}
}, {
  timestamps:true
})
module.exports = mongoose.model('Book',BookSchema)