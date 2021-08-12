const jwt = require("jsonwebtoken")
require("dotenv").config()
const { userSchema } = require("../../utils/validate/schemas")
const STATUS_CODES = require("../../utils/httpStatusCodes")
const { users: service } = require("../../services")

const SECRET_KEY = process.env.JWT_SECRET_KEY

const login = async (req, res, next) => {
  const { email, password } = req.body
  const { error } = userSchema.validate({ email, password })

  if (error) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      status: "error",
      code: STATUS_CODES.BAD_REQUEST,
      message: "Error from Joi or other validation library. Invalid data entered",
      // message: error.message,
    })
  }

  try {
    const user = await service.findUserByFilter({ email })

    if (!user || !user.comparePassword(password) || !user.isVerified) {
      return res.status(STATUS_CODES.ANAUTHORIZED).json({
        status: "error",
        code: STATUS_CODES.ANAUTHORIZED,
        message: "Email or password is wrong",
      })
    }

    const id = user.id
    const payload = { id, email }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" })

    await service.updateUserToken(id, token)

    res.status(STATUS_CODES.SUCCESS).json({
      status: "success",
      code: STATUS_CODES.SUCCESS,
      data: {
        result: token,
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = login
