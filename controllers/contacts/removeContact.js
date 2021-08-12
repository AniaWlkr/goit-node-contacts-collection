const { contacts: service } = require("../../services")
const STATUS_CODES = require("../../utils/httpStatusCodes")

const removeContact = async (req, res) => {
  const { contactId } = req.params

  if (!contactId) {
    return res.status(STATUS_CODES.NOT_FOUND).json({
      status: "error",
      code: STATUS_CODES.NOT_FOUND,
      message: "Incorrect id. Not found",
    })
  }

  const userId = req.user.id
  try {
    const result = await service.deleteContact(userId, contactId)

    return res.status(STATUS_CODES.SUCCESS).json({
      status: "success",
      code: STATUS_CODES.SUCCESS,
      message: "Contact deleted",
      result,
    })
  } catch (error) {
    return res.status(STATUS_CODES.NOT_FOUND).json({
      status: "error",
      code: STATUS_CODES.NOT_FOUND,
      message: error.message,
    })
  }
}

module.exports = removeContact
