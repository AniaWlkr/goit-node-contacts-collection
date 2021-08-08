const { userSchema } = require("../../utils/validate/schemas")
const STATUS_CODES = require("../../utils/httpStatusCodes")
const { users: service } = require("../../services")
const avatarResizeRename = require("../../utils/avatarResizeRename")

const register = async (req, res) => {
  const { error } = userSchema.validate(req.body)

  if (error) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      status: "error",
      code: STATUS_CODES.BAD_REQUEST,
      message: "Missing required name field or invalid data entered",
    })
  }

  if (req.file) {
    req.body.avatarURL = await avatarResizeRename(req.file)
  }

  const { email, subscription = "starter" } = req.body

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
