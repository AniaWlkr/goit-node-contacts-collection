const STATUS_CODES = require("../../utils/httpStatusCodes")

const getCurrentUser = async (req, res) => {
  const { email, subscription } = req.user
  res.status(STATUS_CODES.SUCCESS).json({
    status: "success",
    code: STATUS_CODES.SUCCESS,
    data: {
      email,
      subscription,
    },
  })
}

module.exports = getCurrentUser
