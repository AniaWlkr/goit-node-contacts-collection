const { contacts: service } = require("../../services")
const STATUS_CODES = require("../../utils/httpStatusCodes")

const listContacts = async (req, res, next) => {
  try {
    const userId = req.user.id
    const result = await service.getAllContacts(userId, req.query)

    return res.status(STATUS_CODES.SUCCESS).json({
      status: "success",
      code: STATUS_CODES.SUCCESS,
      data: result,
    })
  } catch (error) {
    return res.status(STATUS_CODES.NOT_FOUND).json({
      status: "error",
      code: STATUS_CODES.NOT_FOUND,
      message: error.message,
    })
  }
}

module.exports = listContacts
