const { users: service } = require("../../services")
const STATUS_CODES = require("../../utils/httpStatusCodes")
const { subscriptionSchema } = require("../../utils/validate/schemas")

const updateUserSubscription = async (req, res) => {
  const userId = req.user.id
  const { subscription } = req.body

  const { error } = subscriptionSchema.validate(req.body)

  if (error) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      status: "error",
      code: STATUS_CODES.BAD_REQUEST,
      message: "Error from Joi or other validation library. Invalid data entered",
    })
  }

  try {
    const result = await service.updateUserSubscription(userId, subscription)

    if (!result) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        status: "error",
        code: STATUS_CODES.NOT_FOUND,
        message: `No user with id ${userId} found`,
      })
    }

    res.status(STATUS_CODES.SUCCESS).json({
      status: "success",
      code: STATUS_CODES.SUCCESS,
      data: {
        userId,
        subscription,
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

module.exports = updateUserSubscription
