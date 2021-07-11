const { Contact } = require("../../models")
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

  try {
    const result = await Contact.findByIdAndDelete(contactId)

    res.status(STATUS_CODES.SUCCESS).json({
      status: "success",
      code: STATUS_CODES.SUCCESS,
      message: "Contact deleted",
      result,
    })
  } catch (error) {
    res.status(STATUS_CODES.NOT_FOUND).json({
      status: "error",
      code: STATUS_CODES.NOT_FOUND,
      message: error.message,
    })
  }
}

module.exports = removeContact
