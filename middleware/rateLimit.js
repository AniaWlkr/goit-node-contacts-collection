const rateLimit = require("express-rate-limit")
const { apiLimitSet, accountLimiterSet } = require("../config/rateLimit.json")
const STATUS_CODES = require("../utils/httpStatusCodes")

const limiter = rateLimit({
  windowMs: apiLimitSet.limiterTime,
  max: apiLimitSet.requestsLimit,
  handler: (req, res, next) => {
    res.status(STATUS_CODES.BAD_REQUEST).json({
      status: "error",
      code: STATUS_CODES.BAD_REQUEST,
      message: "You have exceeded allowed number of requests in 15 minutes",
    })
  },
})

const accountLimiter = rateLimit({
  windowMs: accountLimiterSet.limiterTime,
  max: accountLimiterSet.requestsLimit,
  handler: (req, res, next) => {
    res.status(STATUS_CODES.BAD_REQUEST).json({
      status: "error",
      code: STATUS_CODES.BAD_REQUEST,
      message: "Too many accounts created from this IP, please try again after an hour",
    })
  },
})

module.exports = {
  limiter,
  accountLimiter,
}
