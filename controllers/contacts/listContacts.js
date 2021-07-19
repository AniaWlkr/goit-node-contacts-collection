const { Contact } = require("../../models")
const STATUS_CODES = require("../../utils/httpStatusCodes")

const listContacts = async (req, res) => {
  try {
    const result = await Contact.find()

    res.status(STATUS_CODES.SUCCESS).json({
      status: "success",
      code: STATUS_CODES.SUCCESS,
      data: {
        result,
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

module.exports = listContacts
