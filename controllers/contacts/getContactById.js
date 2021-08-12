const { contacts: service } = require("../../services")
const STATUS_CODES = require("../../utils/httpStatusCodes")

const getContactById = async (req, res) => {
  const { contactId } = req.params
  const userId = req.user.id

  if (!contactId) {
    return res.status(STATUS_CODES.NOT_FOUND).json({
      status: "error",
      code: STATUS_CODES.NOT_FOUND,
      message: "Incorrect id. Not found",
    })
  }

  try {
    const selectedContact = await service.getContactById(userId, contactId)

    return res.status(STATUS_CODES.SUCCESS).json({
      status: "success",
      code: STATUS_CODES.SUCCESS,
      data: {
        result: selectedContact,
      },
    })
  } catch (error) {
    return res.status(STATUS_CODES.NOT_FOUND).json({
      status: "error",
      code: STATUS_CODES.NOT_FOUND,
      message: error.message,
    })
  }
}

module.exports = getContactById
