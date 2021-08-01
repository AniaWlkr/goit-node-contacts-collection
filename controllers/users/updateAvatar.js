const { users: service } = require("../../services")
const STATUS_CODES = require("../../utils/httpStatusCodes")
const avatarResizeRename = require("../../utils/avatarResizeRename")

const updateAvatar = async (req, res) => {
  if (!req.file) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      status: "error",
      code: STATUS_CODES.BAD_REQUEST,
      message: "Invalid file format or no file uploaded",
    })
  }

  const userId = req.user.id

  try {
    avatarURL = await avatarResizeRename(req.file)
    const result = await service.updateAvatar(userId, avatarURL)

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
        avatarURL,
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

module.exports = updateAvatar
