const { Contact } = require("../../models")
const STATUS_CODES = require("../../utils/httpStatusCodes")

const getContactById = async (req, res) => {
  const { contactId } = req.params

  if (!contactId) {
    return res.status(STATUS_CODES.NOT_FOUND).json({
      status: "error",
      code: STATUS_CODES.NOT_FOUND,
      message: "Incorrect id. Not found",
    })
  }

  try {
    const selectedContact = await Contact.findById(contactId)

    res.status(STATUS_CODES.SUCCESS).json({
      status: "success",
      code: STATUS_CODES.SUCCESS,
      data: {
        result: selectedContact,
      },
    })
  } catch (error) {
    res.status(STATUS_CODES.NOT_FOUND).json({
      status: "error",
      code: STATUS_CODES.NOT_FOUND,
      message: error.message,
    })
  }
}

module.exports = getContactById
