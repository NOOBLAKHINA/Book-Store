const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "please provide name"],
		minLength: 3,
		maxLength: 50,
	},
	email: {
		type: String,
		required: [true, "please provide email"],
		match: [
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			"Please provide valid email",
		],
		unique: true,
	},
	password: {
		type: String,
		required: [true, "please provide password"],
		minLength: 3,
		// maxLength: 10,
	},
})
userSchema.pre("save", async function () {
	const salt = await bcrypt.genSalt(10)
	this.password = await bcrypt.hash(this.password, salt)
})
// userSchema.methods.getName = function () {
//   return this.name
// }
userSchema.methods.createJWT = function () {
	return jwt.sign(
		{ userId: this._id, name: this.name },
		process.env.JWT_SECRET,
		{ expiresIn: process.env.JWT_LIFETIME }
	)
}
userSchema.methods.comparePassword = async function (userPassword) {
	const isMatch = await bcrypt.compare(userPassword, this.password)
	console.log(this.password);
	return isMatch
}
module.exports = mongoose.model("User", userSchema)
