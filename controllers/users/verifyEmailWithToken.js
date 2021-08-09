const { users: service } = require("../../services")
const STATUS_CODES = require("../../utils/httpStatusCodes")

const verifyEmailWithToken = async (req, res) => {
  try {
    const user = await service.verifyUserByEmail(req.params)

    if (!user) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        status: "error",
        code: STATUS_CODES.NOT_FOUND,
        message: "Varification token is invalid. Contact administrator",
      })
    }

    res.status(STATUS_CODES.SUCCESS).json({
      status: "success",
      code: STATUS_CODES.SUCCESS,
      data: {
        message: "Verification completed successfully",
      },
    })
  } catch (error) {
    res.status(STATUS_CODES.BAD_REQUEST).json({
      status: "error",
      code: STATUS_CODES.BAD_REQUEST,
      message: error.message,
    })
  }
}

module.exports = verifyEmailWithToken
