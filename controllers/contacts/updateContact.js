const contacts = require("../../model/contacts.json")
const fs = require("fs/promises")

const path = require("path")

const dbPath = path.join(__dirname + "/../../model/contacts.json")

const { contactSchema } = require("../../utils/validate/schemas")

const updateContact = async (req, res) => {
  const { contactId } = req.params

  const contactIndex = contacts.findIndex((contact) => contact.id === Number(contactId))
  if (!contactIndex === -1) {
    return res.status(404).json({
      status: "error",
      code: 404,
      message: "Not found",
    })
  }

  const { error } = contactSchema.validate(req.body)
  if (error) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "Missing fields or invalid data entered",
    })
  }

  const updatedContact = {
    id: contactId,
    ...req.body,
  }

  contacts[contactIndex] = updatedContact
  fs.writeFile(dbPath, JSON.stringify(contacts))

  res.json({
    status: "success",
    code: 200,
    data: {
      result: updatedContact,
    },
  })
}

module.exports = updateContact
