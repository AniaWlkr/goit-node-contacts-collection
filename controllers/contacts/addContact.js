const { v4 } = require("uuid")
const contacts = require("../../db/contacts.json")

const { Contact } = require("../../models")

const { contactSchema } = require("../../utils/validate/schemas")
const STATUS_CODES = require("../../utils/httpStatusCodes")

const addContact = async (req, res) => {
  const { error } = contactSchema.validate(req.body)

  if (error) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      status: "error",
      code: STATUS_CODES.BAD_REQUEST,
      message: "Missing required name field or invalid data entered",
    })
  }

  try {
    const result = await Contact.create(req.body)

    res.status(STATUS_CODES.CREATED).json({
      status: "success",
      code: STATUS_CODES.CREATED,
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

module.exports = addContact
