const CustomAPIError = require('./customApi')
const UnauthenticatedError = require('./unauthenticated.js')
const NotFoundError = require('./not-found')
const BadRequestError = require('./bad-request')

module.exports = {
  CustomAPIError,
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
}
