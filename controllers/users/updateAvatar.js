const { users: service } = require("../../services")
const STATUS_CODES = require("../../utils/httpStatusCodes")
const { avatarResizeRename, avatarDelete } = require("../../utils/avatarResizeRename")

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
    avatar = await avatarResizeRename(req.file)
    const oldAvatar = await service.getAvatar(userId)

    if (oldAvatar.avatarCloudId) {
      await avatarDelete(oldAvatar.avatarCloudId)
    }

    const { secure_url, public_id } = avatar
    const result = await service.updateAvatar(userId, secure_url, public_id)

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
        avatarURL: secure_url,
        avatarCloudId: public_id,
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
