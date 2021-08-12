const { contacts: service } = require("../../services")
const STATUS_CODES = require("../../utils/httpStatusCodes")

const updateContactStatus = async (req, res) => {
  const favorite = Boolean(req.body.favorite)
  const { contactId } = req.params
  const userId = req.user.id

  if (favorite === undefined) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      status: "error",
      code: STATUS_CODES.BAD_REQUEST,
      message: "Missing field 'favorite' or invalid data entered",
    })
  }

  try {
    const result = await service.updateContact(userId, contactId, { favorite })

    if (!result) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        status: "error",
        code: STATUS_CODES.NOT_FOUND,
        message: `No contact with id ${contactId} found`,
      })
    }

    return res.status(STATUS_CODES.SUCCESS).json({
      status: "success",
      code: STATUS_CODES.SUCCESS,
      data: {
        result,
      },
    })
  } catch (error) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      status: "error",
      code: STATUS_CODES.BAD_REQUEST,
      message: error.message,
    })
  }
}

module.exports = updateContactStatus
