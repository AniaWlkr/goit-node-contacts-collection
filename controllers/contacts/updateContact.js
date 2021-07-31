const { contacts: service } = require("../../services")
const STATUS_CODES = require("../../utils/httpStatusCodes")
const { contactSchema } = require("../../utils/validate/schemas")

const updateContact = async (req, res) => {
  const contact = req.body
  const { contactId } = req.params
  const userId = req.user.id
  const { error } = contactSchema.validate(contact)

  if (error) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      status: "error",
      code: STATUS_CODES.BAD_REQUEST,
      error: error.message,
      message: "Missing fields or invalid data entered",
    })
  }

  try {
    const result = await service.updateContact(userId, contactId, contact)

    if (!result) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        status: "error",
        code: STATUS_CODES.NOT_FOUND,
        message: `No contact with id ${contactId} found`,
      })
    }

    res.status(STATUS_CODES.SUCCESS).json({
      status: "success",
      code: STATUS_CODES.SUCCESS,
      data: {
        result,
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

module.exports = updateContact
