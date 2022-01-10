require("dotenv").config()
require("express-async-errors")
// const extra security packages
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')
const express = require("express")
const app = express()
// connectDB
const connectDB = require('./db/connect')
const authenticateUser = require('./MiddleWare/authentication')
// routers
const userRouter = require("./routes/user")
const bookRouter = require("./routes/books")
// error handler
const notFoundMiddleware = require("./Middleware/not-found.js")
const errorHandlerMiddleware = require("./Middleware/error-handler.js")

app.use(express.json())
// extra packages
app.set('trust proxy', 1)
app.use(rateLimiter({
	windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100
}))
app.use(helmet())
app.use(cors())
app.use(xss())
// routes
app.use("/api/v1/user", userRouter)
app.use("/api/v1/books",authenticateUser, bookRouter)
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)
const port = process.env.PORT || 5000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
		app.listen(port, () =>
			console.log(`Server is listening on port ${port}...`)
		)
	} catch (error) {
		console.log(error)
	}
}

start()
