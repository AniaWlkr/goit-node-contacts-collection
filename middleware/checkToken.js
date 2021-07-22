const passport = require("passport")
require("../config/passport")
const STATUS_CODES = require("../utils/httpStatusCodes")

const checkToken = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (error, user) => {
    if (error || !user) {
      return next(
        res.status(STATUS_CODES.ANAUTHORIZED).json({
          status: "error",
          code: STATUS_CODES.ANAUTHORIZED,
          message: "Not authorized",
        })
      )
    }
    req.user = user
    return next()
  })(req, res, next)
}

module.exports = checkToken
