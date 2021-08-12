const { nanoid } = require("nanoid")
const STATUS_CODES = require("../../utils/httpStatusCodes")
const { userSchema } = require("../../utils/validate/schemas")
const { users: service, email: mailService } = require("../../services")
const { avatarResizeRename } = require("../../utils/avatarResizeRename")

const register = async (req, res) => {
  if (req.file) {
    const { secure_url: avatarURL, public_id: avatarCloudId } = await avatarResizeRename(req.file)
    req.body = { ...req.body, avatarURL, avatarCloudId }
  }

  const verifyToken = nanoid()
  req.body = { ...req.body, verifyToken }
  const { email, subscription = "starter" } = req.body

  const { error } = userSchema.validate(req.body)

  if (error) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      status: "error",
      code: STATUS_CODES.BAD_REQUEST,
      // message: "Missing required name field or invalid data entered",
      message: error.message,
    })
  }

  try {
    await mailService.sendEmail(verifyToken, email)
  } catch (error) {
    return res.status(STATUS_CODES.SERVICE_UNAVAILABLE).json({
      status: "error",
      code: STATUS_CODES.SERVICE_UNAVAILABLE,
      message: error.message,
    })
  }

  try {
    const result = await service.findUserByFilter({ email })

    if (result) {
      res.status(STATUS_CODES.CONFLICT).json({
        status: "error",
        code: STATUS_CODES.CONFLICT,
        message: "Email already in use",
      })
    }

    await service.addUser(req.body)
    res.status(STATUS_CODES.CREATED).json({
      status: "success",
      code: STATUS_CODES.CREATED,
      data: {
        user: {
          email,
          subscription,
        },
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

module.exports = register
