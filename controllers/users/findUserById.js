const { users: service } = require("../../services")
const STATUS_CODES = require("../../utils/httpStatusCodes")

const findUserById = async (req, res) => {
  const userId = req.user.id

  try {
    const user = await service.findUserById(userId)

    if (!user) {
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
        user,
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

module.exports = findUserById
