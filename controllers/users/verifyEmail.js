const { users: service, email: mailService } = require("../../services")
const STATUS_CODES = require("../../utils/httpStatusCodes")

const verifyEmail = async (req, res) => {
  const { email } = req.body

  if (!email) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      status: "error",
      code: STATUS_CODES.BAD_REQUEST,
      message: "Missing required field email",
    })
  }

  try {
    const user = await service.findUserByFilter({ email })

    if (user.isVerified) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        status: "error",
        code: STATUS_CODES.BAD_REQUEST,
        message: "Verification has already been passed",
      })
    }

    await mailService.sendEmail(user.verifyToken, email)

    res.status(STATUS_CODES.SUCCESS).json({
      status: "success",
      code: STATUS_CODES.SUCCESS,
      data: {
        message: "Verification email sent",
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

module.exports = verifyEmail
