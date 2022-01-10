const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')

const auth = async(req, res, next) => {
  // check header
  const authHeader = req.headers.authorization
  console.log(req.headers)
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    console.log(authHeader)
    throw new UnauthenticatedError('Authentication invalid')
  }
  const token = authHeader.split(' ')[1]
  try {
    const payLoad = jwt.verify(token,process.env.JWT_SECRET)
    const user = User.findById(payLoad.id).select('-password')
    req.user = user
    req.user = { userId: payLoad.userId, name: payLoad.name }
  next()
  } catch (e) {
    console.error(e)
    throw new UnauthenticatedError('Authentication invalid')
    // throw new UnauthenticatedError('')
  }
}
module.exports = auth
